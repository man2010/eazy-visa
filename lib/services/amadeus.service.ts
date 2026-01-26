// src/services/amadeus.service.ts

import axios from "axios";

/**
 * Lecture des variables d’environnement AU RUNTIME
 */
function getAmadeusConfig() {
  const {
    AMADEUS_API_URL,
    AMADEUS_CLIENT_ID,
    AMADEUS_CLIENT_SECRET,
  } = process.env;

  if (!AMADEUS_API_URL || !AMADEUS_CLIENT_ID || !AMADEUS_CLIENT_SECRET) {
    console.error("❌ Configuration Amadeus manquante", {
      AMADEUS_API_URL: !!AMADEUS_API_URL,
      AMADEUS_CLIENT_ID: !!AMADEUS_CLIENT_ID,
      AMADEUS_CLIENT_SECRET: !!AMADEUS_CLIENT_SECRET,
    });
    throw new Error("Configuration Amadeus invalide");
  }

  return {
    apiUrl: AMADEUS_API_URL,
    clientId: AMADEUS_CLIENT_ID,
    clientSecret: AMADEUS_CLIENT_SECRET,
    defaults: {
      currencyCode: "EUR",
      maxResults: 20,
      timeout: 15000,
    },
    endpoints: {
      oauth: "/v1/security/oauth2/token",
      flightOffers: "/v2/shopping/flight-offers",
      flightPricing: "/v1/shopping/flight-offers/pricing",
      flightBooking: "/v1/booking/flight-orders",
      seatmaps: "/v1/shopping/seatmaps",
      locations: "/v1/reference-data/locations",
      hotelsByCity: "/v1/reference-data/locations/hotels/by-city",
      hotelOffers: "/v3/shopping/hotel-offers",
    },
  };
}

class AmadeusService {
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;

  private isTokenValid(): boolean {
    return (
      this.accessToken !== null &&
      this.tokenExpiry !== null &&
      Date.now() < this.tokenExpiry
    );
  }

  async getAccessToken(): Promise<string> {
    if (this.isTokenValid()) {
      return this.accessToken!;
    }

    const config = getAmadeusConfig();

    try {
      const params = new URLSearchParams({
        grant_type: "client_credentials",
        client_id: config.clientId,
        client_secret: config.clientSecret,
      });

      const response = await axios.post(
        `${config.apiUrl}${config.endpoints.oauth}`,
        params.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + response.data.expires_in * 1000;

      console.log("✅ Token Amadeus obtenu");
      return this.accessToken!;
    } catch (error: any) {
      console.error(
        "❌ Erreur authentification Amadeus:",
        error.response?.data || error.message
      );
      throw new Error("Échec de l'authentification Amadeus");
    }
  }

  /* =========================
     VOLS
     ========================= */

  async searchFlights(searchParams: any) {
    const config = getAmadeusConfig();
    const token = await this.getAccessToken();

    const params: any = {
      originLocationCode: searchParams.origin,
      destinationLocationCode: searchParams.destination,
      departureDate: searchParams.departureDate,
      adults: searchParams.adults || 1,
      currencyCode: config.defaults.currencyCode,
      max: searchParams.max || config.defaults.maxResults,
    };

    if (searchParams.returnDate) {
      params.returnDate = searchParams.returnDate;
    }

    try {
      const response = await axios.get(
        `${config.apiUrl}${config.endpoints.flightOffers}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params,
          timeout: config.defaults.timeout,
        }
      );

      console.log(`✅ ${response.data.data.length} vols trouvés`);
      return {
        success: true,
        data: response.data.data,
        meta: response.data.meta,
      };
    } catch (error: any) {
      console.error(
        "❌ Erreur recherche vols:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.errors?.[0]?.detail ||
          "Erreur recherche vols"
      );
    }
  }

  async confirmPrice(flightOffer: any) {
    const config = getAmadeusConfig();
    const token = await this.getAccessToken();

    try {
      const response = await axios.post(
        `${config.apiUrl}${config.endpoints.flightPricing}`,
        {
          data: {
            type: "flight-offers-pricing",
            flightOffers: [flightOffer],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: config.defaults.timeout,
        }
      );

      console.log("✅ Prix confirmé");
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error(
        "❌ Erreur confirmation prix:",
        error.response?.data || error.message
      );
      throw new Error("Erreur confirmation prix");
    }
  }

  async createBooking(flightOffer: any, travelers: any, contacts: any) {
    const config = getAmadeusConfig();
    const token = await this.getAccessToken();

    try {
      const response = await axios.post(
        `${config.apiUrl}${config.endpoints.flightBooking}`,
        {
          data: {
            type: "flight-order",
            flightOffers: [flightOffer],
            travelers,
            contacts,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: config.defaults.timeout,
        }
      );

      console.log("✅ Réservation créée:", response.data.data.id);
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error(
        "❌ Erreur création réservation:",
        error.response?.data || error.message
      );
      throw new Error("Erreur création réservation");
    }
  }

  /* =========================
     AUTRES SERVICES
     ========================= */

  async getSeatmaps(flightOffers: any) {
    const config = getAmadeusConfig();
    const token = await this.getAccessToken();

    const response = await axios.post(
      `${config.apiUrl}${config.endpoints.seatmaps}`,
      { data: flightOffers },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, data: response.data.data };
  }

  async searchLocations({ keyword, subType }: any) {
    const config = getAmadeusConfig();
    const token = await this.getAccessToken();

    const response = await axios.get(
      `${config.apiUrl}${config.endpoints.locations}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { keyword, subType, page: { limit: 10 } },
      }
    );

    return { success: true, data: response.data.data || [] };
  }

  async searchHotelsByCity({ cityCode, ratings, amenities }: any) {
    const config = getAmadeusConfig();
    const token = await this.getAccessToken();

    let url = `${config.apiUrl}${config.endpoints.hotelsByCity}?cityCode=${cityCode}&radius=50&radiusUnit=KM`;
    if (ratings) url += `&ratings=${ratings.join(",")}`;
    if (amenities) url += `&amenities=${amenities.join(",")}`;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: config.defaults.timeout,
    });

    return { success: true, data: response.data.data || [] };
  }

  async getHotelOffers({
    hotelIds,
    checkInDate,
    checkOutDate,
    adults = 1,
  }: any) {
    const config = getAmadeusConfig();
    const token = await this.getAccessToken();

    const response = await axios.get(
      `${config.apiUrl}${config.endpoints.hotelOffers}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          hotelIds: hotelIds.join(","),
          checkInDate,
          checkOutDate,
          adults,
          currency: config.defaults.currencyCode,
          bestRateOnly: true,
        },
        timeout: config.defaults.timeout,
      }
    );

    return { success: true, data: response.data.data || [] };
  }
}

export default new AmadeusService();
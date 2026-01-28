// src/services/amadeus.service.ts

import axios, { AxiosInstance } from "axios";

/**
 * Lecture des variables d'environnement AU RUNTIME
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
      currencyCode: "XOF", // ✅ CHANGÉ : EUR → XOF pour l'Afrique de l'Ouest
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

/**
 * Crée une instance Axios avec baseURL pour éviter les bugs de parsing URL absolue en Node.js / Lambda
 */
function createAmadeusAxios(baseUrl: string): AxiosInstance {
  return axios.create({
    baseURL: baseUrl,
    timeout: 15000,
    headers: {
      common: {
        Accept: "application/json",
      },
    },
  });
}

class AmadeusService {
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;

  private isTokenValid(): boolean {
    // ✅ AJOUT : Marge de sécurité de 5 minutes
    const MARGIN_MS = 5 * 60 * 1000;
    return (
      this.accessToken !== null &&
      this.tokenExpiry !== null &&
      Date.now() < (this.tokenExpiry - MARGIN_MS)
    );
  }

  async getAccessToken(): Promise<string> {
    if (this.isTokenValid()) {
      console.log("🔄 Utilisation du token en cache");
      return this.accessToken!;
    }

    const config = getAmadeusConfig();
    const amadeusAxios = createAmadeusAxios(config.apiUrl);

    try {
      const params = new URLSearchParams({
        grant_type: "client_credentials",
        client_id: config.clientId,
        client_secret: config.clientSecret,
      });

      console.log("Tentative auth Amadeus sur :", config.endpoints.oauth); // Debug

      const response = await amadeusAxios.post(
        config.endpoints.oauth,  // ← RELATIF grâce à baseURL
        params.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          timeout: 10000,
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + response.data.expires_in * 1000;

      console.log("✅ Token Amadeus obtenu, expire dans", response.data.expires_in, "s");
      return this.accessToken!;
    } catch (error: any) {
      console.error(
        "❌ Erreur authentification Amadeus:",
        error.message || "Unknown error",
        error.code || "",
        error.response?.data || ""
      );
      throw new Error(
        `Échec auth Amadeus: ${error.response?.data?.error_description || error.message || "Erreur inconnue"}`
      );
    }
  }

  /* =========================
     VOLS
     ========================= */

  async searchFlights(searchParams: any) {
    try {
      const config = getAmadeusConfig();
      const token = await this.getAccessToken();
      const amadeusAxios = createAmadeusAxios(config.apiUrl);

      const params: any = {
        originLocationCode: searchParams.origin,
        destinationLocationCode: searchParams.destination,
        departureDate: searchParams.departureDate,
        adults: searchParams.adults || 1,
        currencyCode: searchParams.currencyCode || config.defaults.currencyCode,
        max: searchParams.max || config.defaults.maxResults,
      };

      if (searchParams.returnDate) {
        params.returnDate = searchParams.returnDate;
      }

      console.log("🔍 Recherche vols avec params:", params);

      const response = await amadeusAxios.get(
        config.endpoints.flightOffers,
        {
          headers: { Authorization: `Bearer ${token}` },
          params,
          timeout: config.defaults.timeout,
        }
      );

      console.log(`✅ ${response.data.data?.length || 0} vols trouvés`);
      return {
        success: true,
        data: response.data.data || [],
        meta: response.data.meta,
        dictionaries: response.data.dictionaries,
      };
    } catch (error: any) {
      console.error(
        "❌ Erreur recherche vols:",
        error.message || error.response?.data || "Erreur inconnue"
      );
      return {
        success: false,
        error: error.response?.data?.errors?.[0]?.detail || error.message || "Erreur recherche vols",
        data: [],
      };
    }
  }

  async confirmPrice(flightOffer: any) {
    try {
      const config = getAmadeusConfig();
      const token = await this.getAccessToken();
      const amadeusAxios = createAmadeusAxios(config.apiUrl);

      const response = await amadeusAxios.post(
        config.endpoints.flightPricing,
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
        error.message || error.response?.data || "Erreur inconnue"
      );
      return {
        success: false,
        error: error.response?.data?.errors?.[0]?.detail || "Erreur confirmation prix",
      };
    }
  }

  async createBooking(flightOffer: any, travelers: any, contacts: any) {
    try {
      const config = getAmadeusConfig();
      const token = await this.getAccessToken();
      const amadeusAxios = createAmadeusAxios(config.apiUrl);

      const response = await amadeusAxios.post(
        config.endpoints.flightBooking,
        {
          data: {
            type: "flight-order",
            flightOffers: [flightOffer],
            travelers,
            contacts,
            remarks: {
              general: [
                {
                  subType: "GENERAL_MISCELLANEOUS",
                  text: "ONLINE BOOKING FROM EAZY-VISA",
                },
              ],
            },
            ticketingAgreement: {
              option: "DELAY_TO_CANCEL",
              delay: "6D",
            },
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
        error.message || error.response?.data || "Erreur inconnue"
      );
      return {
        success: false,
        error: error.response?.data?.errors?.[0]?.detail || "Erreur création réservation",
      };
    }
  }

  /* =========================
     AUTRES SERVICES
     ========================= */

  async getSeatmaps(flightOffers: any) {
    try {
      const config = getAmadeusConfig();
      const token = await this.getAccessToken();
      const amadeusAxios = createAmadeusAxios(config.apiUrl);

      const response = await amadeusAxios.post(
        config.endpoints.seatmaps,
        { data: flightOffers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: config.defaults.timeout,
        }
      );

      return { success: true, data: response.data.data || [] };
    } catch (error: any) {
      console.error("❌ Erreur seatmaps:", error.message || error.response?.data || "Erreur inconnue");
      return {
        success: false,
        error: error.response?.data?.errors?.[0]?.detail || "Erreur seatmaps",
        data: [],
      };
    }
  }

  async searchLocations({ keyword, subType }: any) {
    try {
      const config = getAmadeusConfig();
      const token = await this.getAccessToken();
      const amadeusAxios = createAmadeusAxios(config.apiUrl);

      const response = await amadeusAxios.get(
        config.endpoints.locations,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { 
            keyword, 
            subType: subType || "AIRPORT,CITY",
            "page[limit]": 10,
          },
          timeout: config.defaults.timeout,
        }
      );

      return { success: true, data: response.data.data || [] };
    } catch (error: any) {
      console.error("❌ Erreur locations:", error.message || error.response?.data || "Erreur inconnue");
      return {
        success: false,
        error: error.response?.data?.errors?.[0]?.detail || "Erreur recherche locations",
        data: [],
      };
    }
  }

  async searchHotelsByCity({ cityCode, ratings, amenities }: any) {
    try {
      const config = getAmadeusConfig();
      const token = await this.getAccessToken();
      const amadeusAxios = createAmadeusAxios(config.apiUrl);

      const params: any = {
        cityCode,
        radius: 50,
        radiusUnit: "KM",
      };

      if (ratings) params.ratings = ratings.join(",");
      if (amenities) params.amenities = amenities.join(",");

      const response = await amadeusAxios.get(
        config.endpoints.hotelsByCity,
        {
          headers: { Authorization: `Bearer ${token}` },
          params,
          timeout: config.defaults.timeout,
        }
      );

      return { success: true, data: response.data.data || [] };
    } catch (error: any) {
      console.error("❌ Erreur hôtels:", error.message || error.response?.data || "Erreur inconnue");
      return {
        success: false,
        error: error.response?.data?.errors?.[0]?.detail || "Erreur recherche hôtels",
        data: [],
      };
    }
  }

  async getHotelOffers({
    hotelIds,
    checkInDate,
    checkOutDate,
    adults = 1,
  }: any) {
    try {
      const config = getAmadeusConfig();
      const token = await this.getAccessToken();
      const amadeusAxios = createAmadeusAxios(config.apiUrl);

      const response = await amadeusAxios.get(
        config.endpoints.hotelOffers,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            hotelIds: Array.isArray(hotelIds) ? hotelIds.join(",") : hotelIds,
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
    } catch (error: any) {
      console.error("❌ Erreur offres hôtels:", error.message || error.response?.data || "Erreur inconnue");
      return {
        success: false,
        error: error.response?.data?.errors?.[0]?.detail || "Erreur offres hôtels",
        data: [],
      };
    }
  }
}

export default new AmadeusService();
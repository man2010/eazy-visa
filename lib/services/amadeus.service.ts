import axios from 'axios';
import { amadeusConfig } from '../config/amadeus.config';

class AmadeusService {
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;

  async getAccessToken(): Promise<string> {
    try {
      if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
        return this.accessToken;
      }

      const params = new URLSearchParams([
        ['grant_type', 'client_credentials'],
        ['client_id', amadeusConfig.clientId || ''],
        ['client_secret', amadeusConfig.clientSecret || ''],
      ]);

      const response = await axios.post(
        `${amadeusConfig.apiUrl}${amadeusConfig.endpoints.oauth}`,
        params.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);

      console.log('✅ Token Amadeus obtenu');
      return this.accessToken as string;
    } catch (error: any) {
      console.error('❌ Erreur authentification Amadeus:', error.response?.data || error.message);
      throw new Error('Échec de l\'authentification Amadeus');
    }
  }

  async searchFlights(searchParams: any) {
    try {
      const token = await this.getAccessToken();

      const params: any = {
        originLocationCode: searchParams.origin,
        destinationLocationCode: searchParams.destination,
        departureDate: searchParams.departureDate,
        adults: searchParams.adults || 1,
        currencyCode: amadeusConfig.defaults.currencyCode,
        max: searchParams.max || amadeusConfig.defaults.maxResults,
      };

      if (searchParams.returnDate) {
        params.returnDate = searchParams.returnDate;
      }

      const response = await axios.get(
        `${amadeusConfig.apiUrl}${amadeusConfig.endpoints.flightOffers}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params,
          timeout: amadeusConfig.defaults.timeout,
        }
      );

      console.log(`✅ ${response.data.data.length} vols trouvés`);
      return {
        success: true,
        data: response.data.data,
        meta: response.data.meta,
      };
    } catch (error: any) {
      console.error('❌ Erreur recherche vols:', error.response?.data || error.message);
      throw new Error(error.response?.data?.errors?.[0]?.detail || 'Erreur recherche vols');
    }
  }

  async confirmPrice(flightOffer: any) {
    try {
      const token = await this.getAccessToken();

      const response = await axios.post(
        `${amadeusConfig.apiUrl}${amadeusConfig.endpoints.flightPricing}`,
        {
          data: {
            type: 'flight-offers-pricing',
            flightOffers: [flightOffer],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: amadeusConfig.defaults.timeout,
        }
      );

      console.log('✅ Prix confirmé');
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error: any) {
      console.error('❌ Erreur confirmation prix:', error.response?.data || error.message);
      throw new Error('Erreur confirmation prix');
    }
  }

  async createBooking(flightOffer: any, travelers: any, contacts: any) {
    try {
      const token = await this.getAccessToken();

      const response = await axios.post(
        `${amadeusConfig.apiUrl}${amadeusConfig.endpoints.flightBooking}`,
        {
          data: {
            type: 'flight-order',
            flightOffers: [flightOffer],
            travelers: travelers,
            contacts: contacts,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: amadeusConfig.defaults.timeout,
        }
      );

      console.log('✅ Réservation créée:', response.data.data.id);
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error: any) {
      console.error('❌ Erreur création réservation:', error.response?.data || error.message);
      throw new Error('Erreur création réservation');
    }
  }

  async getSeatmaps(flightOffers: any) {
    try {
      const token = await this.getAccessToken();

      const response = await axios.post(
        `${amadeusConfig.apiUrl}${amadeusConfig.endpoints.seatmaps}`,
        { data: flightOffers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        data: response.data.data,
      };
    } catch (error: any) {
      console.error('❌ Erreur seatmaps:', error.response?.data || error.message);
      throw new Error('Erreur récupération seatmaps');
    }
  }

  async searchLocations({ keyword, subType }: any) {
    try {
      const token = await this.getAccessToken();
      const response = await axios.get(
        `${amadeusConfig.apiUrl}${amadeusConfig.endpoints.locations}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { keyword, subType, page: { limit: 10 } },
        }
      );
      return { success: true, data: response.data.data || [] };
    } catch (error: any) {
      console.error('❌ Erreur recherche locations:', error.response?.data || error.message);
      return { success: false, error: 'Erreur recherche aéroports' };
    }
  }

  async searchHotelsByCity({ cityCode, ratings, amenities }: any) {
    try {
      const token = await this.getAccessToken();

      let url = `${amadeusConfig.apiUrl}${amadeusConfig.endpoints.hotelsByCity}?cityCode=${cityCode}&radius=50&radiusUnit=KM`;

      if (ratings) url += `&ratings=${ratings.join(',')}`;
      if (amenities) url += `&amenities=${amenities.join(',')}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: amadeusConfig.defaults.timeout,
      });

      return {
        success: true,
        data: response.data.data || [],
      };
    } catch (error: any) {
      console.error('❌ Erreur recherche hôtels:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.errors?.[0]?.detail || 'Erreur recherche hôtels' };
    }
  }

  async getHotelOffers({ hotelIds, checkInDate, checkOutDate, adults = 1 }: any) {
    try {
      const token = await this.getAccessToken();

      const response = await axios.get(
        `${amadeusConfig.apiUrl}${amadeusConfig.endpoints.hotelOffers}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            hotelIds: hotelIds.join(','),
            checkInDate,
            checkOutDate,
            adults,
            currency: amadeusConfig.defaults.currencyCode,
            bestRateOnly: true,
          },
          timeout: amadeusConfig.defaults.timeout,
        }
      );

      return {
        success: true,
        data: response.data.data || [],
      };
    } catch (error: any) {
      console.error('❌ Erreur offres hôtels:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.errors?.[0]?.detail || 'Aucune offre disponible' };
    }
  }
}

export default new AmadeusService();
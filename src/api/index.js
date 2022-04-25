//************************ STEP 1 */
import axios from 'axios';

/**
 * @ function getPlacesData
 * @returns the restaurants data
 * Call this function in App.js
 */
export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } =  await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY
      }
    });

    return data;
  } catch(error) {
    console.log(error);
  }
}

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: { lat, lon: lng },
        headers: {
          'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY
        },
      });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

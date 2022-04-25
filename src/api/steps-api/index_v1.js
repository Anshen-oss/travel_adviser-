//************************ STEP 1 */
import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

const options = {
  params: {
    bl_latitude: '11.847676',
    tr_latitude: '12.838442',
    bl_longitude: '109.095887',
    tr_longitude: '109.149359',
  },
  headers: {
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
    'X-RapidAPI-Key': 'd1a17673ccmshca48fc0216a87f7p196597jsn7809459b45a2'
  }
};

/**
 * @ function getPlacesData
 * @returns the restaurants data
 * Call this function in App.js
 */
export const getPlacesData = async () => {
  try {
    // request
    const { data: { data } } =  await axios.get(URL, options);

    return data;
  } catch(error) {
    console.log(error);
  }
}

// so how can we actually pass these values to our api request ?
// you can see here there are static values so i'm going to copy this entire object

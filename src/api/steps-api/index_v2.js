
// //************************ STEP 2 */
// import axios from 'axios';

// const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

// /**
//  * @ function getPlacesData
//  * @returns the restaurants data
//  * Call this function in App.js
//  *
//  * so how can we actually pass
//  * these values: sw, ne to our api request
//  */
// export const getPlacesData = async (sw, ne) => {
//   try {
//     const { data: { data } } =  await axios.get(URL, {
//       params: {
//         bl_latitude: sw.lat,
//         tr_latitude: ne.lat,
//         bl_longitude: sw.lng,
//         tr_longitude: ne.lng,
//       },
//       headers: {
//         'X-RapidAPI-Key': 'd1a17673ccmshca48fc0216a87f7p196597jsn7809459b45a2',
//         'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//       }
//     });

//     return data;
//   } catch(error) {
//     console.log(error);
//   }
// }

// // so how can we actually pass these values to our api request ?
// // you can see here there are static values so i'm going to copy this entire object

//************************ STEP 1 */
import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

/**
 * @ function getPlacesData
 * @returns the restaurants data
 * Call this function in App.js
 */
export const getPlacesData = async (sw, ne) => {
  try {
    const { data: { data } } =  await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': 'd1a17673ccmshca48fc0216a87f7p196597jsn7809459b45a2'
      }
    });

    return data;
  } catch(error) {
    console.log(error);
  }
}

// so how can we actually pass these values to our api request ?
// you can see here there are static values so i'm going to copy this entire object

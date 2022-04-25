//************ <App/> -STEP 1 */
import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

// Call this function inside the App with useEFfect
import {getPlacesData } from './api/index';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {


  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
         <Map />
        </Grid>
      </Grid>
    </>

  )
}

export default App;

{/* <cssBaseline /> this is a component from material ui that simply normalizes the styles so it's
just going to fix some paddings margins and background colors immediately for us */}

<header /> <Box></Box>
In material ui a box is basically a div but you can simply set a display of flexI


<List />
// 1. Construire le layout with two selects: Type: retaurants, hotels - attractions and Rating
// 2. Fetch retaurants, hotels - attractions

<App />
// We have useEffect inside this app - we have to have the dependency array if you leave this dependency array empty
// that means that the code inside of this function block will happen only at the start of the application and right
// now that's exactly what we want to do so:

const App = () => {
  useEffect(() => {
    getPlacesData();
  }, [])
  ...
}

// nous devons obtenir des informations réelles à partir de la position de notre carte,
// puis en fonction de cela, nous devons appeler uniquement les bons restaurants pour cette carte pour le faire,
// nous devrons transmettre des informations dans cette fonction getPlacesData()
// donc créons plus de champs de useState plus spécifiquement,
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);


// ******************************* <Map /> Step 1 **************************/
// maintenant, la question est de savoir comment allons-nous savoir quand les coordonnées ou les limites de
// la carte changent et la réponse est que <GoogleMapReact> le fera pour nous, nous devons simplement appeler
// une fonction onChange spécifique:

import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab';
import useStyles from './styles';

const Map = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:600px)');

    const coordinates = { lat: 0, lng: 0 }
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAWTKa1uSd2Itni7aHdC_vUxJfDUmnquYs' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={''}
        onChange={() => {}}
        onChildClick={() => {}}
      >
      </GoogleMapReact>
    </div>
  )
}
export default Map;


//************************************************************************************************
//***  Step 2 */
<App />

// je veux aussi faire quelque chose de plus je veux définir automatiquement les coordonnées comme étant
// les coordonnées de l'emplacement de l'utilisateur:
const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0});

// donc dès que l'utilisateur lance la page, nous devrions pouvoir obtenir sa latitude et sa longitude,
// nous pouvons le faire en utilisant une autre useEffect cet useEffect ne se produira qu'au début,
// rappelez-vous que l'effet d'utilisation est une fonction de rappel, puis nous avons le tableau de
// dépendance maintenant nous avons besoin de ce que nous avions avant un tableau de dépendance vide
// car cela ne devrait se produire qu'au début pour obtenir les coordonnées de l'utilisateur nous
// pouvons utiliser l'api de géolocalisation du navigateur intégré

 useEffect(() => {
    })
  }, [])

// nous aurons une fonction de rappel nous pouvons choisir ce que nous voulons faire avec ces données
// et ici nous obtenons bien sûr des données mais nous pouvons les déstructurer pour obtenir
// immédiatement les coordonnées, puis nous pouvons immédiatement le déstructurer une fois de
// plus pour obtenir immédiatement la latitude et la longitude:

 useEffect(() => {
    navigator.geolocation.getCurrentPosition(( { coordinates: { latitude, longitude} }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, []);

  // and finally now that we're getting the coordinates we no longer have to set these default values
  // right there:
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0});

  //we can leave this as an empty object now our browser should be getting our geolocation
  // immediately and notre navigateur devrait obtenir notre géolocalisation immédiatement
  // et notre map devrait se positionner autour de notre emplacement,
  const [coordinates, setCoordinates] = useState({ });


  // FETCH THE RESTAURANTS //
//  we already have the coordinates and the bounds:
 const [bounds, setBounds] = useState(null);

//  bounds are more important in this case we simply need to pass them over to our getPlacesData():
// as the first parameter and second parameter we can pass:
// getPlacesData(bounds.sw, bounds.ne)

  useEffect(() => {
    console.log(coordinates, bounds);
    getPlacesData(bounds.sw, bounds.ne)
    .then((data) => {
      console.log(data);
      setPlaces(data);
    })
  }, [coordinates, bounds])


  // NOW GO BACH TO THE API > api/index.js
export const getPlacesData = async () => {
  try {
    // request
    const { data: { data } } =  await axios.get(URL, options);

    return data;
  } catch(error) {
    console.log(error);
  }
}

// we can accept those bounds right there we can say sw and ne:
export const getPlacesData = async (sw, ne) => {
  try {
    // request
    const { data: { data } } =  await axios.get(URL, options);

    return data;
  } catch(error) {
    console.log(error);
  }
}

// you can see here there are static values so i'm going to copy this entire object params
// le supprimer d'ici
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

// and then simply paste it right here as the second parameter of our api call:
export const getPlacesData = async (sw, ne) => {
  try {
    // request
    const { data: { data } } =  await axios.get(URL, {
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
    });
    return data;
  } catch(error) {
    console.log(error);
  }
}

// now we can remove all of these values which are not true they're just static
// and we can simply use our southwest and northeast properties to get the real
// bounds so we can say southwest that lat:
export const getPlacesData = async (sw, ne) => {
  try {
    // request
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
    //  the data that's being returned should be inside of our map let's check
    // it out in the browser as youcan see i got 33 restaurants in this case
    return data;
  } catch(error) {
    console.log(error);
  }
}

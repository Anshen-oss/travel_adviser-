//*********** STEP 5 */
import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
// Call this function inside the App with useEFfect
import { getPlacesData } from './api/index';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';


/**
 *
 * @returns
 * we have to call only the right restaurants for that map
 * we'll have to pass some information into getPlacesData function
 * so let's create more useState
 */
const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

/**
 * je veux aussi faire quelque chose de plus je veux
 * définir automatiquement les coordonnées comme étant
 * les coordonnées de l'emplacement de l'utilisateur.
 * Je peux faire cela avec un useEffect.
 * pour obtenir les coordonnées de l'utilisateur nous
 * pouvons utiliser l'api de géolocalisation du navigateur
 *  intégré. Nous avons ici des datas, On déstructure coordinates
 * ET on le déstructure une fois de plus afin d'avoir la latitude
 * et la longitude.
 */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])


/**
 * si nous voulons que ce code soit réexécuté à chaque
 * fois que la map change, nous devons ajouter dans le tableau de
 * dépendances, coordinates et bounds.
 */
  useEffect(() => {
    console.log(coordinates, bounds);

    getPlacesData()
    .then((data) => {
      console.log(data);
      setPlaces(data);
    })
  }, [coordinates, bounds])

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
         <Map
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
         />
        </Grid>
      </Grid>
    </>

  )
}

export default App;

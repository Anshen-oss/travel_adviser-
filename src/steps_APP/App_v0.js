import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

// Call this function inside the App with useEFfect
import {getPlacesData } from './api/index';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [places, setPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  /**
   * Voir Explication in steps.js > Step 2
   */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  //if we want this code to be reran every time that the
  // map changes we have to add the coordinates in the array dependency
  useEffect(() => {
    getPlacesData(bounds.sw, bounds.ne)
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

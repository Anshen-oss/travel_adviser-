//*********** STEP 4 */
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
  const [coordinates, setCoordinates] = useState({lat:0, lng:0});
  const [bounds, setBounds] = useState(null);


  useEffect(() => {
    getPlacesData()
    .then((data) => {
      console.log(data);
      setPlaces(data);
    })
  }, [])

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

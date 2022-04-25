//*********** STEP 8 */
import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
// Call this function inside the App with useEFfect
import { getPlacesData, getWeatherData } from './api/index';

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
  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [isLoading, setIsLoading] = useState(false);
   const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

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
   * Change, only when the rating changes
   * if place.rating is larger than the current rating:
   * ! place.rating > rating
   * we want to return that specific place
   */
  useEffect(() => {
    const filteredPlaces = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filteredPlaces);
  }, [rating, places])

  /**
   * si nous voulons que ce code soit réexécuté à chaque
   * fois que la map change, nous devons ajouter dans le tableau de
   * dépendances, coordinates et bounds.
  */
  useEffect(() => {
    if(bounds.sw && bounds.ne) {
      setIsLoading(true);
      //console.log(coordinates, bounds);

      getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => setWeatherData(data));

      getPlacesData(type, bounds.sw, bounds.ne)
      .then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));// affchier que les places qui ont des num_reviews
        setFilteredPlaces([]);
        setIsLoading(false);
      })
    }
  }, [type, bounds])


  /**
   * notre prochaine partie vraiment importante consiste à prendre ces lieux depuis
   * l'application, puis à les afficher sur la carte, nous pouvons le faire en
   * allant sur App.js en prenant les mêmes endroits que nous avons passés sur
   * notre liste, puis en les envoyant sur notre Map ainsi, nous pouvons dire que
   * les emplacements sont égaux aux emplacements, comme vous pouvez le voir,
   * nous envoyons beaucoup de props d'un composant à un autre, cela reste
   * correct car nous ne l'envoyons qu'à un niveau de profondeur depuis notre application:
   *  places={places}
   * Nous ppiuvons détructurer par la suite la props places dans
   * le composant <Map />. Go!
   */
  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            rating={rating}
            setRating={setRating}
            type={type}
            setType={setType}
            />
        </Grid>
        <Grid item xs={12} md={8}>
         <Map
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={filteredPlaces.length ? filteredPlaces : places}
          setChildClicked={setChildClicked}
          weatherData={weatherData}
         />
        </Grid>
      </Grid>
    </>

  )
}

export default App;

//******* STREP - 2 */
import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';

import useStyles from './styles';

/**
 * @component
 * @returns component
 * onChange is going to give us a callback function that has the event as the
 * parameter and we can simply say :
 *  onChange={(e) => setType-e.target.value}
 * Inside targeted value is where the value of the clicked element will be so if you
 * click on hotels this thing is going to be populated with hotels and then that's
 * going to set the variable of type.
 */
  /**
   * Nous avons cette information:
   * ! console.log({childClicked});
   *  ? La question est de savoir comment faire défiler notre liste vers un élément
   * spécifique de la liste lorsque nous cliquons sur la Map. pour cela, nous
   * allons devoir utiliser des références de React avec le hook createRef()
   */
  /**
   * We want to recall useEffect every time that the places change
   * nous avons une fonction de rappel à l'intérieur de la carte cette fois
   * nous ne sommes pas intéressés par une chose spécifique au début nous avons
   * seulement besoin de l'index: .map((_, i) - The underscore that means you're
   * not going to use that first parameter but you need the second one and we want
   * to return refs ou si la référence n'existe pas encore, dans ce cas,
   * nous pouvons créer une référence:
   * ! const refs = Array(places.length).fill().map((_, i) => refs[i] || createRef() );
   *
   * La seule raison pour laquelle nous passons: type, setType, rating, setRating
   * comme props, dans App.js, nous avons accès aux props rating et type et
   * maintenant nous pouvons les utiliser pour obtenir différentes données de
   * notre api get places getPlacesData
  */
const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef() );

    setElRefs(refs);
  }, [places])

  return (
    <div className={classes.container}>
      <Typography variant="h4">Restaurants, Hotels & Attractions around you</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
         {/* nous avons dis que nous avons cliqué sur cet
           élément, nous voulons faire défiler jusqu'à cet
           restaurant dans la liste
          */}
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                  place={place}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;

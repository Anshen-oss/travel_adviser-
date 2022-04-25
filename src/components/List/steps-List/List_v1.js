//******* STREP - 1  */
import React, { useState } from 'react';
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
const List = () => {
  const classes = useStyles();
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  // Fetch retaurants, hotels - attractions
  const places = [
    { name: 'Cool place' },
    { name: 'Best Beer' },
    { name: 'Best vegan place' },
    { name: 'Cool place' },
    { name: 'Best Beer' },
    { name: 'Best vegan place' },
    { name: 'Cool place' },
    { name: 'Best Beer' },
    { name: 'Best vegan place' },
  ];

  return (
    <div className={classes.container}>
      <Typography variant="h4">Restaurants, Hotels & Attractions around you</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {/* only if you have places only then map over them map */}
        {places?.map((place, i) => (
          <Grid item key={i} xs={12}>
            <PlaceDetails place={place} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default List;

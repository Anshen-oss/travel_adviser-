//****** STEP - 2 */
import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

import mapStyles from './mapStyles';

/**
 *
 * @returns
 * const isMobile = useMediaQuery('(min-width:600px)'):
 * This means that this is mobile variable is going to be set to false if the
 * width of the device is larger than 600 pixels
 *  how are we going to know when the coordinates or bounds of the map change
 * and the answer is google map react will be doing that for us we simply have
 *  to call a specific onchange function inside of the onchange we are of
 * course getting a callback
 *
 * comment montrons-nous réellement les pins sur
 * la Map ? GoogleMapReact le rend incroyablement simple,
 * vous devez simplement les rendre ici à l'intérieur de la Map
 */
const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)')

  /**
   * Rendre les cards pins sur les maps cliquable avec:
   * onChildClick={(child) => {}}
   * Quel child est cliqué du composant Map jusqu'au composant List ?
  */
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng })
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
      {places?.map((place, i) => (
        <div
          className={classes.markerContainer}
          lat={Number(place.latitude)}
          lng={Number(place.longitude)}
          key={i}
        >

          {
            // à l'intérieur de notre div, nous voulons
            //  rendre différentes choses selon que nous
            // sommes sur un appareil mobile ou sur un ordinateur de bureau
            !isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )
          }
        </div>
      ))}
       {weatherData?.list?.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="100px" alt="" />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default Map;

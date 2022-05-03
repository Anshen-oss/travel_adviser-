//****** STEP - 1 */
import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab';

import useStyles from './styles';

/**
 *
 * @returns
 * const isMobile = useMediaQuery('(min-width:600px)'):
 * This means that this is mobile variable is going to be set to false if the
 * width of the device is larger than 600 pixels
 */
const Map = (}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:600px)');

 const coordinates = { lat: 0, lng: 0 }
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'mykey' }}
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

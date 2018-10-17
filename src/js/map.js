/**
 * @file
 * Google Map API
 * Loading and intializing a javascript google map libraries.
 *
 * Docs: https://developers.google.com/maps/documentation/javascript/tutorial
 */

import gmap from './includes/gmap';
import gmapCluster from './includes/gmap-cluster';
import loadGoogleMapsApi from 'load-google-maps-api-2';
loadGoogleMapsApi.key = 'AIzaSyDMF8bus_g_m9frZBqEWwI6cNEmfXVK4qM';

(() => {
  loadGoogleMapsApi().then(googleMaps => {

    gmap();
    gmapCluster();

  }).catch(err => console.error(err));
})();

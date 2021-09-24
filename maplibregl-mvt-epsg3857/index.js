import 'maplibre-gl/dist/maplibre-gl.css'

import { Map } from 'maplibre-gl'
import style from './public/style.json'

// eslint-disable-next-line no-unused-vars
const map = new Map({
  container: 'map', // container id
  style: style, // style URL
  center: [5.473700, 52.099804], // starting position [lng, lat]
  zoom: 7 // starting zoom
})

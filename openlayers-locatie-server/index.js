import 'ol/ol.css'
import { Map, View } from 'ol'
import WMTSSource from 'ol/source/WMTS'
import TileLayer from 'ol/layer/Tile.js'
import WMTSTileGrid from 'ol/tilegrid/WMTS.js'
import { get as getProjection, fromLonLat } from 'ol/proj'
import { getTopLeft, getWidth } from 'ol/extent.js'
import { Control } from 'ol/control'
import { transformExtent } from 'ol/proj.js'
import 'autocompleter/autocomplete.css'
import VectorLayer from 'ol/layer/Vector'
import { Vector as VectorSource } from 'ol/source'
import LocationServerControl from './locatie-server-control'

const projection = getProjection('EPSG:3857')
const projectionExtent = projection.getExtent()
const size = getWidth(projectionExtent) / 256
const resolutions = new Array(20)
const matrixIds = new Array(20)

for (var z = 0; z < 20; ++z) {
  // generate resolutions and matrixIds arrays for this WMTS
  resolutions[z] = size / Math.pow(2, z)
  matrixIds[z] = z
}

const baseMapLayer = new TileLayer({
  extent: projectionExtent,
  source: new WMTSSource({
    url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0',
    layer: 'grijs',
    matrixSet: 'EPSG:3857',
    crossOrigin: 'Anonymous',
    format: 'image/png',
    attributions: 'BRT achtergrondkaart: <a href="http://www.kadaster.nl">Kadaster</a>',
    tileGrid: new WMTSTileGrid({
      origin: getTopLeft(projectionExtent),
      resolutions: resolutions,
      matrixIds: matrixIds
    }),
    style: 'default'
  })
})

const vectorSource = new VectorSource()

const vectorLayer = new VectorLayer({
  source: vectorSource,
  declutter: true
})

const map = new Map({
  layers: [
    baseMapLayer,
    vectorLayer
  ],
  target: 'map',
  view: new View({
    center: fromLonLat([5.43, 52.18]),
    // change zoomlevel, due to the scale dependent layer in WMS service
    zoom: 8
  })
})

function locationSelectedHandler (event) {
  // let extentRd = transformExtent(event.detail.extent, 'EPSG:3857', rdProjection)
  map.getView().fit(event.detail.extent, { maxZoom: 14 })
}

function addLsInput () {
  let myControl = new Control({ element: lsCOntrol })
  map.addControl(myControl)
  lsCOntrol.addEventListener('location-selected', locationSelectedHandler, false)
}

customElements.define('locatieserver-control', LocationServerControl)
const lsCOntrol = document.createElement('locatieserver-control')

addLsInput()

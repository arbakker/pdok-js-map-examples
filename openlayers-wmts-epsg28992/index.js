import 'ol/ol.css'
import { Map, View } from 'ol'
import WMTSSource from 'ol/source/WMTS'
import TileLayer from 'ol/layer/Tile.js'
import WMTSTileGrid from 'ol/tilegrid/WMTS.js'
import { register } from 'ol/proj/proj4.js'
import { fromLonLat } from 'ol/proj'
import proj4 from 'proj4'
import Projection from 'ol/proj/Projection'
import { getTopLeft } from 'ol/extent.js'

proj4.defs('EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs')
register(proj4)
const rdProjection = new Projection({
  code: 'EPSG:28992',
  extent: [-285401.92, 22598.08, 595401.92, 903401.92]
})

const resolutions = [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210]
const matrixIds = new Array(15)
for (var i = 0; i < 15; ++i) {
  matrixIds[i] = i
}

const brtWmtsLayer = new TileLayer({
  extent: rdProjection.extent,
  source: new WMTSSource({
    url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts',
    layer: 'brtachtergrondkaartgrijs',
    matrixSet: 'EPSG:28992',
    format: 'image/png',
    projection: rdProjection,
    tileGrid: new WMTSTileGrid({
      origin: getTopLeft(rdProjection.getExtent()),
      resolutions: resolutions,
      matrixIds: matrixIds
    }),
    style: 'default'
  })
})

const map = new Map({
  layers: [
    brtWmtsLayer
  ],
  target: 'map',
  view: new View({
    center: fromLonLat([5.43, 52.18]),
    zoom: 8
  })
})

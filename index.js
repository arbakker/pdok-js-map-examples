import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.control.layers.tree'
import 'proj4leaflet'
import 'leaflet.control.layers.tree/L.Control.Layers.Tree.css'
import './index.css'

const BRTA_ATTRIBUTION = 'Kaartgegevens: © <a href="http://www.cbs.nl">CBS</a>, <a href="http://www.kadaster.nl">Kadaster</a>, <a href="http://openstreetmap.org">OpenStreetMap</a><span class="printhide">-auteurs (<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>).</span>'
const AHN3_ATTRIBUTION = ''
const TOP_ATTRIBUTION = ''
const BGT_ATTRIBUTION = ''


// see "Nederlandse richtlijn tiling" https://www.geonovum.nl/uploads/standards/downloads/nederlandse_richtlijn_tiling_-_versie_1.1.pdf 

// Resolution (in pixels per meter) for each zoomlevel
var res = [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420]

function getTMSLayer(layername, attribution){
    return  L.tileLayer(`https://geodata.nationaalgeoregister.nl/tiles/service/tms/1.0.0/${layername}/EPSG:28992/{z}/{x}/{y}.png`, {
        tms: true,
        attribution: attribution
    })
}

const brtRegular = getTMSLayer('brtachtergrondkaart',BRTA_ATTRIBUTION)
const brtGrijs = getTMSLayer('brtachtergrondkaartgrijs',BRTA_ATTRIBUTION)
const brtPastel = getTMSLayer('brtachtergrondkaartpastel',BRTA_ATTRIBUTION)
const brtWater = getTMSLayer('brtachtergrondkaartwater',BRTA_ATTRIBUTION)

const ahn5Dsm = getTMSLayer('ahn3_5m_dsm',AHN3_ATTRIBUTION)
const ahn5Dtm = getTMSLayer('ahn3_5m_dsm',AHN3_ATTRIBUTION)
const ahn05Dsm = getTMSLayer('ahn3_5m_dsm',AHN3_ATTRIBUTION)
const ahn05Dtm = getTMSLayer('ahn3_5m_dsm',AHN3_ATTRIBUTION)

const top1000 = getTMSLayer('top1000raster',TOP_ATTRIBUTION)
const top500 = getTMSLayer('top500raster',TOP_ATTRIBUTION)
const top250 = getTMSLayer('top250raster',TOP_ATTRIBUTION)
const top100 = getTMSLayer('top100raster',TOP_ATTRIBUTION)
const top50 = getTMSLayer('top50raster',TOP_ATTRIBUTION)
const top25 = getTMSLayer('top25raster',TOP_ATTRIBUTION)
const top10nlv2 = getTMSLayer('top10nlv2',TOP_ATTRIBUTION)

const bgtachtergrond = getTMSLayer('bgtachtergrond',BGT_ATTRIBUTION)
const bgtomtrekgericht = getTMSLayer('bgtomtrekgericht',BGT_ATTRIBUTION)
const bgtpastel = getTMSLayer('bgtpastel',BGT_ATTRIBUTION)
const bgtstandaardv2 = getTMSLayer('bgtstandaardv2',BGT_ATTRIBUTION)
const bgtsymbolenv2 = getTMSLayer('bgtsymbolenv2',BGT_ATTRIBUTION)
const bgtstandaard = getTMSLayer('bgtstandaard',BGT_ATTRIBUTION)


// Projection parameters for RD projection (EPSG:28992):
var map = L.map('mapid', {
    continuousWorld: true,
    crs: new L.Proj.CRS('EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs', {
        resolutions: res,
        origin: [-285401.920, 903401.920],
        transformation: L.Transformation(-1, 0, -1, 0),
        bounds: L.bounds([-285401.920, 903401.920], [595401.920, 22598.080]),
    }),
    layers: [
        brtRegular
    ],
    center: L.latLng(52.176997, 5.200000),
    zoom: 3
})

var baseLayers = {
    'BRT-Achtergrondkaart':  brtRegular,
    'BRT-Achtergrondkaart Grijs':  brtGrijs,
    'BRT-Achtergrondkaart Pastel':  brtPastel,
    'BRT-Achtergrondkaart Water':  brtWater,
    'AHN 0.5m DSM': ahn05Dsm,
    'AHN 0.5m DTM': ahn05Dtm,
    'AHN 5m DSM': ahn5Dsm,
    'AHN 5m DTM': ahn5Dtm,
    'top1000': top1000,
    'top500': top500,
    'top250': top250,
    'top100': top100,
    'top50': top50,
    'top25': top25,
    'top10nlv2': top10nlv2,
    'bgtachtergrond': bgtachtergrond,
    'bgtomtrekgericht':bgtomtrekgericht,
    'bgtpastel':bgtpastel,
    'bgtstandaardv2':bgtstandaardv2,
    'bgtsymbolenv2':bgtsymbolenv2,
    'bgtstandaard':bgtstandaard
}

L.control.layers(baseLayers).addTo(map);

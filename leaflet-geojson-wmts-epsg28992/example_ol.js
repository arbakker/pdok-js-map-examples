const resolutions = [
    3440.640, 1720.320, 860.160, 430.080, 215.040,
    107.520, 53.760, 26.880, 13.440, 6.720,
    3.360, 1.680, 0.840, 0.420, 0.210, 0.105,
    0.0525, 0.02625, 0.013125, 0.0065625,
    0.00328125, 0.001640625, 0.000820313,
    0.000410156, 0.000205078, 0.000102539
];
const matrixSizes = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048,
    4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576,
    2097152, 4194304, 8388608, 16777216, 33554432
];
const matrixIds = [];
for (let i = 0; i < resolutions.length; ++i) {
    matrixIds[i] = epgs28992 + ':' + i;
}
const extent: Extent = [-285401.92, 22598.08, 595401.92, 903401.92];
const rdNewConfig = this.crsConfigService.getRdNewCrsConfig();

const brtsource = new WMTS({
    projection: 'EPSG:28992',
    layer: 'brtachtergrondkaart',
    format: 'image/png',
    url: 'https://geodata.nationaalgeoregister.nl/wmts/brtachtergrondkaart',
    matrixSet: 'EPSG:28992',
    style: 'default',
    crossOrigin: 'anonymous',
    tileGrid: new WMTSTileGrid({
        extent: extent,
        resolutions: resolutions,
        matrixIds: matrixIds
    })
})

const brtLayer =
    new TileLayer({
        source: brtsource,
        minResolution: 0.210 // brtachtergrondkaart is not available for smaller resolutions
    });
map.addLayer(brtLayer)
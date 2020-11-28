import createCircle from '@turf/circle';
//import mapboxgl from 'mapbox-gl';
//import mapboxgl from 'mapbox-gl';

const args = location.search.replace(/^\?/, '').split('&').reduce(function (o, param) {
  var keyvalue = param.split('=');
  o[keyvalue[0]] = keyvalue[1];
  return o;
}, {});

mapboxgl.accessToken = args.access_token || localStorage.accessToken;
const mapEl = document.getElementById('map');

const map = new mapboxgl.Map({
  container: mapEl,
  style: 'mapbox://styles/mapbox/light-v8',
  center: [2.326986, 48.857775],
  zoom: 12
});

const layers = [
  [30, '#00aaFF', 0.1],
  [20, '#00aaFF', 0.2],
  [10, '#00aaFF', 0.8],
];

map.on('load', function () {
  map.addSource('grid', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  });
  map.addSource('circle', {
    'type': 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  })

  layers.forEach(function (layer, i) {
    map.addLayer({
      'id': 'grid-' + i,
      'type': 'fill',
      'source': 'grid',
      'layout': {},
      'paint': {
        'fill-color': layer[1],
        'fill-opacity': layer[2]
      },
      'filter': [
        'all',
        ['==', '$type', 'Polygon'],
        ['<=', 'time', layer[0]]
      ]
    }, 'road-path');
  });

  map.addLayer({
    'id': 'distance',
    type: 'line',
    source: 'circle',
    paint: {
      'line-color': 'red',
      'line-width': 1,
      'line-opacity': 0.25
    }
  }, 'road-path');
});

/** @type {mapboxgl.Marker} */
let marker;
map.on('click', (e) => {
  mapEl.classList.add('loading');
  const intervals = Array.from(
    document.querySelectorAll('.intervals input[type="checkbox"]:checked')
  ).map(el => el.value);

  const profile = document.querySelector('input[name="profile"]:checked').value;
  console.log(profile);

  const coords = [e.lngLat.lng, e.lngLat.lat];

  if (marker) marker.remove();
  marker = new mapboxgl.Marker()
    .setLngLat([e.lngLat.lng, e.lngLat.lat])
    .addTo(map);

  map.getSource('circle').setData({
    type: 'FeatureCollection',
    features: Array(19).fill(0).map((_, i) => createCircle(coords, i + 1))
  });

  const params = {
    lng: e.lngLat.lng,
    lat: e.lngLat.lat,
    radius: document.getElementById('radius').value,
    cellSize: document.getElementById('cellSize').value,
    concavity: document.getElementById('concavity').value,
    lengthThreshold: document.getElementById('lengthThreshold').value,
  };

  const url = new URL(`${location.origin}/api/${profile}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  (intervals.length > 0 ?
    intervals :
    [10, 20, 30]).forEach(interval => url.searchParams.append('intervals', interval));

  console.groupCollapsed(e.lngLat.lng, e.lngLat.lat);
  console.time('request');
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      console.timeEnd('request');
      console.groupEnd();
      map.getSource('grid').setData(data);
      mapEl.classList.remove('loading');
    })
    .catch((error) => {
      console.error(error);
      mapEl.classList.remove('loading');
    });
});

var popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

// map.on('mousemove', function (e) {
//   var features = map.queryRenderedFeatures(e.point, {
//     layers: ['grid-0', 'grid-1', 'grid-2', 'grid-3', 'grid-4', 'grid-5']
//   });

//   if (!features.length) {
//     popup.remove();
//     return;
//   }
//   var feature = features[0];
//   popup.setLngLat(e.lngLat)
//     .setHTML(feature.properties.time + ' minutes')
//     .addTo(map);
// });

import createCircle from '@turf/circle';
//import mapboxgl from 'mapbox-gl';
//import mapboxgl from 'mapbox-gl';

function parseQuery(query) {
  return query.split('&').reduce((o, param) => {
    const keyvalue = param.split('=');
    o[keyvalue[0]] = keyvalue[1];
    return o;
  }, {});
}

const args = parseQuery(location.search.replace(/^\?/, ''));

const hashArgs = parseQuery(location.hash.substring(1));

console.log(args, hashArgs);

mapboxgl.accessToken = 'pk.eyJ1IjoidzhyIiwiYSI6ImNraTFtaXV1dDA5YWcyd212MGdkb2NiMGgifQ.9gTiDUGipxgdnlZCv9qvoA';
const mapEl = document.getElementById('map');

const map = new mapboxgl.Map({
  container: mapEl,
  style: 'mapbox://styles/mapbox/light-v8',
  center: [2.326986, 48.857775],
  zoom: 12
});

const layers = [
  [120, '#00aaFF', 0.012],
  [90, '#00aaFF', 0.025],
  [60, '#00aaFF', 0.05],
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
  });

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


  map.addLayer({
    'id': 'distances',
    'type': 'symbol',
    'source': 'circle',
    'layout': {
      'text-field': ['get', 'distance'],
      'symbol-placement': 'line-center'
    }
  });

  if (hashArgs.lat && hashArgs.lng) {
    show(parseFloat(hashArgs.lng), parseFloat(hashArgs.lat));
  }
});

/**
 * @param {number} lng
 * @param {number} lat
 */
function show(lng, lat) {
  mapEl.classList.add('loading');

  window.location.hash = `&lat=${lat}&lng=${lng}`;
  const intervals = Array.from(
    document.querySelectorAll('.intervals input[type="checkbox"]:checked')
  ).map(el => el.value);
  const profileEl = document.querySelector('input[name="profile"]:checked');
  const profile = profileEl.value;
  const coords = [lng, lat];
  if (marker) marker.remove();
  marker = new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo(map);

  map.getSource('circle').setData({
    type: 'FeatureCollection',
    features: Array(19).fill(0)
      .map((_, i) => {
        const circle = createCircle(coords, i + 1);
        circle.properties = circle.properties || {};
        circle.properties.distance = `${i + 1}km`;
        return circle;
      })
  });

  const radius = intervals.reduce((acc, interval) => {
    if (interval > 30 && profile === 'bike') acc = 12;
    if (interval > 60) acc = 20;
    return acc;
  }, 6);

  const params = {
    lng,
    lat,
    radius,
    deintersect: false
    // cellSize: document.getElementById('cellSize').value,
    // concavity: document.getElementById('concavity').value,
    // lengthThreshold: document.getElementById('lengthThreshold').value,
  };

  const url = new URL(`${location.origin}/api/${profile}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  (intervals.length > 0 ?
    intervals :
    [10, 20, 30]).forEach(interval => url.searchParams.append('intervals', interval));

  console.log(url);

  console.groupCollapsed(lng, lat);
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
}

/** @type {mapboxgl.Marker} */
let marker;
map.on('click', (evt) => show(evt.lngLat.lng, evt.lngLat.lat));



var popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

map.on('mousemove', (evt) => {
  requestAnimationFrame(() => {
    const features = map.queryRenderedFeatures(evt.point, {
      layers: ['grid-0', 'grid-1', 'grid-2', 'grid-3', 'grid-4', 'grid-5']
    });

    const profileEl = document.querySelector('input[name="profile"]:checked');
    const profile = profileEl.value === 'foot' ? 'walk' : 'bike';

    if (!features.length) {
      popup.remove();
      return;
    }
    const feature = features[0];
    popup.setLngLat(evt.lngLat)
      .setHTML(`<span class="icon ${profile}"></span> ${feature.properties.time} minutes`)
      .addTo(map);
  });
});

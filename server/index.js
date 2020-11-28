const express = require('express');
const argv = require('minimist')(process.argv.slice(2));
const galton = require('galton/src/');
const galtonDefaults = require('galton/src/defaults');
const port = argv.port || 5000;
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

const fileName = 'ile-de-france-latest.osrm';

const galtonBike = galton({
  ...galtonDefaults,
  algorightm: 'CH',
  osrmPath: `./data/bike/${fileName}`,
  cors: true
});

const galtonFoot = galton({
  ...galtonDefaults,
  algorightm: 'CH',
  osrmPath: `./data/foot/${fileName}`,
  cors: true
});

app.get('/api/bike/', (req, res) => galtonBike(req, res));
app.get('/api/foot/', (req, res) => galtonFoot(req, res));

app.use(express.static('dist'));

app.listen(port, () => {
  console.log('strated on port', port);
});

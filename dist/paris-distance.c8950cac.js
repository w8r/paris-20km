parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"il2D":[function(require,module,exports) {
"use strict";function e(e,r,t){void 0===t&&(t={});var o={type:"Feature"};return(0===t.id||t.id)&&(o.id=t.id),t.bbox&&(o.bbox=t.bbox),o.properties=r||{},o.geometry=e,o}function r(e,r,o){switch(void 0===o&&(o={}),e){case"Point":return t(r).geometry;case"LineString":return s(r).geometry;case"Polygon":return n(r).geometry;case"MultiPoint":return m(r).geometry;case"MultiLineString":return d(r).geometry;case"MultiPolygon":return c(r).geometry;default:throw new Error(e+" is invalid")}}function t(r,t,o){return void 0===o&&(o={}),e({type:"Point",coordinates:r},t,o)}function o(e,r,o){return void 0===o&&(o={}),u(e.map(function(e){return t(e,r)}),o)}function n(r,t,o){void 0===o&&(o={});for(var n=0,i=r;n<i.length;n++){var s=i[n];if(s.length<4)throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");for(var a=0;a<s[s.length-1].length;a++)if(s[s.length-1][a]!==s[0][a])throw new Error("First and last Position are not equivalent.")}return e({type:"Polygon",coordinates:r},t,o)}function i(e,r,t){return void 0===t&&(t={}),u(e.map(function(e){return n(e,r)}),t)}function s(r,t,o){if(void 0===o&&(o={}),r.length<2)throw new Error("coordinates must be an array of two or more positions");return e({type:"LineString",coordinates:r},t,o)}function a(e,r,t){return void 0===t&&(t={}),u(e.map(function(e){return s(e,r)}),t)}function u(e,r){void 0===r&&(r={});var t={type:"FeatureCollection"};return r.id&&(t.id=r.id),r.bbox&&(t.bbox=r.bbox),t.features=e,t}function d(r,t,o){return void 0===o&&(o={}),e({type:"MultiLineString",coordinates:r},t,o)}function m(r,t,o){return void 0===o&&(o={}),e({type:"MultiPoint",coordinates:r},t,o)}function c(r,t,o){return void 0===o&&(o={}),e({type:"MultiPolygon",coordinates:r},t,o)}function l(r,t,o){return void 0===o&&(o={}),e({type:"GeometryCollection",geometries:r},t,o)}function h(e,r){if(void 0===r&&(r=0),r&&!(r>=0))throw new Error("precision must be a positive number");var t=Math.pow(10,r||0);return Math.round(e*t)/t}function p(e,r){void 0===r&&(r="kilometers");var t=exports.factors[r];if(!t)throw new Error(r+" units is invalid");return e*t}function f(e,r){void 0===r&&(r="kilometers");var t=exports.factors[r];if(!t)throw new Error(r+" units is invalid");return e/t}function x(e,r){return w(f(e,r))}function g(e){var r=e%360;return r<0&&(r+=360),r}function w(e){return 180*(e%(2*Math.PI))/Math.PI}function b(e){return e%360*Math.PI/180}function v(e,r,t){if(void 0===r&&(r="kilometers"),void 0===t&&(t="kilometers"),!(e>=0))throw new Error("length must be a positive number");return p(f(e,r),t)}function y(e,r,t){if(void 0===r&&(r="meters"),void 0===t&&(t="kilometers"),!(e>=0))throw new Error("area must be a positive number");var o=exports.areaFactors[r];if(!o)throw new Error("invalid original units");var n=exports.areaFactors[t];if(!n)throw new Error("invalid final units");return e/o*n}function E(e){return!isNaN(e)&&null!==e&&!Array.isArray(e)&&!/^\s*$/.test(e)}function R(e){return!!e&&e.constructor===Object}function P(e){if(!e)throw new Error("bbox is required");if(!Array.isArray(e))throw new Error("bbox must be an Array");if(4!==e.length&&6!==e.length)throw new Error("bbox must be an Array of 4 or 6 numbers");e.forEach(function(e){if(!E(e))throw new Error("bbox must only contain numbers")})}function T(e){if(!e)throw new Error("id is required");if(-1===["string","number"].indexOf(typeof e))throw new Error("id must be a number or a string")}function M(){throw new Error("method has been renamed to `radiansToDegrees`")}function k(){throw new Error("method has been renamed to `degreesToRadians`")}function A(){throw new Error("method has been renamed to `lengthToDegrees`")}function L(){throw new Error("method has been renamed to `lengthToRadians`")}function D(){throw new Error("method has been renamed to `radiansToLength`")}function F(){throw new Error("method has been renamed to `bearingToAzimuth`")}function S(){throw new Error("method has been renamed to `convertLength`")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.earthRadius=6371008.8,exports.factors={centimeters:100*exports.earthRadius,centimetres:100*exports.earthRadius,degrees:exports.earthRadius/111325,feet:3.28084*exports.earthRadius,inches:39.37*exports.earthRadius,kilometers:exports.earthRadius/1e3,kilometres:exports.earthRadius/1e3,meters:exports.earthRadius,metres:exports.earthRadius,miles:exports.earthRadius/1609.344,millimeters:1e3*exports.earthRadius,millimetres:1e3*exports.earthRadius,nauticalmiles:exports.earthRadius/1852,radians:1,yards:exports.earthRadius/1.0936},exports.unitsFactors={centimeters:100,centimetres:100,degrees:1/111325,feet:3.28084,inches:39.37,kilometers:.001,kilometres:.001,meters:1,metres:1,miles:1/1609.344,millimeters:1e3,millimetres:1e3,nauticalmiles:1/1852,radians:1/exports.earthRadius,yards:1/1.0936},exports.areaFactors={acres:247105e-9,centimeters:1e4,centimetres:1e4,feet:10.763910417,inches:1550.003100006,kilometers:1e-6,kilometres:1e-6,meters:1,metres:1,miles:3.86e-7,millimeters:1e6,millimetres:1e6,yards:1.195990046},exports.feature=e,exports.geometry=r,exports.point=t,exports.points=o,exports.polygon=n,exports.polygons=i,exports.lineString=s,exports.lineStrings=a,exports.featureCollection=u,exports.multiLineString=d,exports.multiPoint=m,exports.multiPolygon=c,exports.geometryCollection=l,exports.round=h,exports.radiansToLength=p,exports.lengthToRadians=f,exports.lengthToDegrees=x,exports.bearingToAzimuth=g,exports.radiansToDegrees=w,exports.degreesToRadians=b,exports.convertLength=v,exports.convertArea=y,exports.isNumber=E,exports.isObject=R,exports.validateBBox=P,exports.validateId=T,exports.radians2degrees=M,exports.degrees2radians=k,exports.distanceToDegrees=A,exports.distanceToRadians=L,exports.radiansToDistance=D,exports.bearingToAngle=F,exports.convertDistance=S;
},{}],"ZA2Y":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@turf/helpers");function r(e){if(!e)throw new Error("coord is required");if(!Array.isArray(e)){if("Feature"===e.type&&null!==e.geometry&&"Point"===e.geometry.type)return e.geometry.coordinates;if("Point"===e.type)return e.coordinates}if(Array.isArray(e)&&e.length>=2&&!Array.isArray(e[0])&&!Array.isArray(e[1]))return e;throw new Error("coord must be GeoJSON Point or an Array of numbers")}function t(e){if(Array.isArray(e))return e;if("Feature"===e.type){if(null!==e.geometry)return e.geometry.coordinates}else if(e.coordinates)return e.coordinates;throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array")}function o(r){if(r.length>1&&e.isNumber(r[0])&&e.isNumber(r[1]))return!0;if(Array.isArray(r[0])&&r[0].length)return o(r[0]);throw new Error("coordinates must only contain numbers")}function n(e,r,t){if(!r||!t)throw new Error("type and name required");if(!e||e.type!==r)throw new Error("Invalid input to "+t+": must be a "+r+", given "+e.type)}function i(e,r,t){if(!e)throw new Error("No feature passed");if(!t)throw new Error(".featureOf() requires a name");if(!e||"Feature"!==e.type||!e.geometry)throw new Error("Invalid input to "+t+", Feature with geometry required");if(!e.geometry||e.geometry.type!==r)throw new Error("Invalid input to "+t+": must be a "+r+", given "+e.geometry.type)}function u(e,r,t){if(!e)throw new Error("No featureCollection passed");if(!t)throw new Error(".collectionOf() requires a name");if(!e||"FeatureCollection"!==e.type)throw new Error("Invalid input to "+t+", FeatureCollection required");for(var o=0,n=e.features;o<n.length;o++){var i=n[o];if(!i||"Feature"!==i.type||!i.geometry)throw new Error("Invalid input to "+t+", Feature with geometry required");if(!i.geometry||i.geometry.type!==r)throw new Error("Invalid input to "+t+": must be a "+r+", given "+i.geometry.type)}}function a(e){return"Feature"===e.type?e.geometry:e}function y(e,r){return"FeatureCollection"===e.type?"FeatureCollection":"GeometryCollection"===e.type?"GeometryCollection":"Feature"===e.type&&null!==e.geometry?e.geometry.type:e.type}exports.getCoord=r,exports.getCoords=t,exports.containsNumber=o,exports.geojsonType=n,exports.featureOf=i,exports.collectionOf=u,exports.getGeom=a,exports.getType=y;
},{"@turf/helpers":"il2D"}],"ThDM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@turf/helpers"),a=require("@turf/invariant");function s(s,t,r,i){void 0===i&&(i={});var n=a.getCoord(s),o=e.degreesToRadians(n[0]),h=e.degreesToRadians(n[1]),d=e.degreesToRadians(r),M=e.lengthToRadians(t,i.units),u=Math.asin(Math.sin(h)*Math.cos(M)+Math.cos(h)*Math.sin(M)*Math.cos(d)),c=o+Math.atan2(Math.sin(d)*Math.sin(M)*Math.cos(h),Math.cos(M)-Math.sin(h)*Math.sin(u)),g=e.radiansToDegrees(c),p=e.radiansToDegrees(u);return e.point([g,p],i.properties)}exports.default=s;
},{"@turf/helpers":"il2D","@turf/invariant":"ZA2Y"}],"okRu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@turf/destination"),r=require("@turf/helpers");function t(t,o,p){void 0===p&&(p={});for(var s=p.steps||64,i=p.properties?p.properties:!Array.isArray(t)&&"Feature"===t.type&&t.properties?t.properties:{},u=[],a=0;a<s;a++)u.push(e.default(t,o,-360*a/s,p).geometry.coordinates);return u.push(u[0]),r.polygon([u],i)}exports.default=t;
},{"@turf/destination":"ThDM","@turf/helpers":"il2D"}],"Focm":[function(require,module,exports) {
"use strict";var e=t(require("@turf/circle"));function t(e){return e&&e.__esModule?e:{default:e}}const a=location.search.replace(/^\?/,"").split("&").reduce(function(e,t){var a=t.split("=");return e[a[0]]=a[1],e},{});mapboxgl.accessToken="pk.eyJ1IjoidzhyIiwiYSI6ImNraTFtaXV1dDA5YWcyd212MGdkb2NiMGgifQ.9gTiDUGipxgdnlZCv9qvoA";const o=document.getElementById("map"),l=new mapboxgl.Map({container:o,style:"mapbox://styles/mapbox/light-v8",center:[2.326986,48.857775],zoom:12}),n=[[30,"#00aaFF",.1],[20,"#00aaFF",.2],[10,"#00aaFF",.8]];let r;l.on("load",function(){l.addSource("grid",{type:"geojson",data:{type:"FeatureCollection",features:[]}}),l.addSource("circle",{type:"geojson",data:{type:"FeatureCollection",features:[]}}),n.forEach(function(e,t){l.addLayer({id:"grid-"+t,type:"fill",source:"grid",layout:{},paint:{"fill-color":e[1],"fill-opacity":e[2]},filter:["all",["==","$type","Polygon"],["<=","time",e[0]]]},"road-path")}),l.addLayer({id:"distance",type:"line",source:"circle",paint:{"line-color":"red","line-width":1,"line-opacity":.25}},"road-path"),l.addLayer({id:"distances",type:"symbol",source:"circle",layout:{"text-field":["get","distance"],"text-variable-anchor":["top","bottom","left","right"],"text-radial-offset":.5,"text-justify":"auto"}})}),l.on("click",t=>{o.classList.add("loading");const a=Array.from(document.querySelectorAll('.intervals input[type="checkbox"]:checked')).map(e=>e.value),n=document.querySelector('input[name="profile"]:checked').value;console.log(n);const c=[t.lngLat.lng,t.lngLat.lat];r&&r.remove(),r=(new mapboxgl.Marker).setLngLat([t.lngLat.lng,t.lngLat.lat]).addTo(l),l.getSource("circle").setData({type:"FeatureCollection",features:Array(19).fill(0).map((t,a)=>{const o=(0,e.default)(c,a+1);return o.properties=o.properties||{},o.properties.distance=`${a}km`,o})});const i={lng:t.lngLat.lng,lat:t.lngLat.lat,radius:document.getElementById("radius").value,cellSize:document.getElementById("cellSize").value,concavity:document.getElementById("concavity").value,lengthThreshold:document.getElementById("lengthThreshold").value},s=new URL(`${location.origin}/api/${n}`);Object.keys(i).forEach(e=>s.searchParams.append(e,i[e])),(a.length>0?a:[10,20,30]).forEach(e=>s.searchParams.append("intervals",e)),console.groupCollapsed(t.lngLat.lng,t.lngLat.lat),console.time("request"),fetch(s).then(e=>e.json()).then(e=>{console.log(e),console.timeEnd("request"),console.groupEnd(),l.getSource("grid").setData(e),o.classList.remove("loading")}).catch(e=>{console.error(e),o.classList.remove("loading")})});var c=new mapboxgl.Popup({closeButton:!1,closeOnClick:!1});
},{"@turf/circle":"okRu"}]},{},["Focm"], null)
//# sourceMappingURL=/paris-distance.c8950cac.js.map
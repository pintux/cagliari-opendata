Cagliari Open Data SDK for node.js
==================================

[![NPM](https://nodei.co/npm/cagliari-opendata.png)](https://nodei.co/npm/cagliari-opendata/)

About
-----


Basic Node.js libraries to use Cagliari Open Data API endpoints.

**WARNING**: current version has been updated to use [ECMAscript 6 Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and it's not backward compatible with previous versions.
If you prefer continuing to use callbacks, please use **[version 0.2.5](https://github.com/pintux/cagliari-opendata/releases/tag/v0.2.5)**


Requirements
------------
Node.js  **> v6.3.x**


Supported Datasets and API Endpoints
------------------------------------

- Traffic

Installation
------------

`npm install cagliari-opendata`

Basic Example
-------------

Getting all installed traffic monitoring stations:

```js
const opendata = require('cagliari-opendata');
const traffic = opendata.traffic;

traffic.getStations()
.then(stations => { 
       console.log(stations);        
});
```

API
---

All functions are asynchronous and they **return a Promise**.


* <a href="#getStations"><code>traffic.<b>getStations()</b></code></a>
* <a href="#getStation"><code>traffic.<b>getStation()</b></code></a>
* <a href="#getStationData"><code>traffic.<b>getStationData()</b></code></a>
* <a href="#getSensorData"><code>traffic.<b>getSensorData()</b></code></a>




Data Description
----------------
JSON representations returned by API calls contain the following data items. JSON is the only supported format. See descriptions for details.

JSON field | Descrizione (Italian) | Description (English) |
------------ | ------------- | ------------- |
tipoApparato | 2 == Postazione con un sensore per ogni senso di marcia; 4 == Postazione con due spire | 2 == Station with a sensor per direction; 4 == Station with two loops |
classe: "Totali" | Totale di tutte le classi | Overall value of all classes |
classe: "X - Y m" | Lunghezza del veicolo da X metri a Y metri | Vehicle length from X to Y meters |
classe: "Oltre m" | Lunghezza del veivolo superiore a 22 metri | Vehicle length exceeding 22 meters |
tipoClassificazione | 0 == Flusso e velocità; 1 == Solo Flusso| 0 == Flow and Speed; 1 == Flow, only  |
efficienza | 100 == Dati flusso e velocità; 0 == Dati di solo flusso | 100 == Flow and Speed data; 0 == Flow, only |
velocita | Velocità in Km/h | Speed in Km/h |
flusso | Veicoli per ora | Vehicles per hour |
tasso | Percentuale (%) | Percentage (%) |


 




----------------------------------------------------------
<a name="getStations"></a>
### getStations()

Gets all available traffic stations installed in the city.

A JSON is returned.



-----------------------------------------------------------
<a name="getStation"></a>
### getStation(id)
Gets info about a particular station given its `id`.

A JSON is returned.

- `id` is the numeric or String id of the station


-----------------------------------------------------------
<a name="getStationData"></a>
### getStationData(id, startDate, endDate)
Gets measurement data from all the sensors in a station, given its `id`.

A JSON is returned.

- `id` is the numeric or string id of the station
- `startDate` a Date object representing the start date/time for required measurements (mandatory)
- `endDate` a Date object representing the end date/time for required measurements (optional, use `null` to skip)


------------------------------------------------------------
<a name="getSensorData"></a>
### getSensorData(id, startDate, endDate)
Gets measurement data from for a specific sensor, given its `id`.

A JSON is returned.

- `id` is the numeric or string id of the sensor
- `startDate` a Date object representing the start date/time for required measurements (mandatory)
- `endDate` a Date object representing the end date/time for required measurements (optional, use `null` to skip)



Links
-----

- [Cagliari Open Data Portal](http://opendata.comune.cagliari.it/portale)

Contributors
------------

<table><tbody>
<tr><th align="left">Antonio Pintus</th><td><a href="https://github.com/pintux">GitHub/pintux</a></td><td><a href="https://twitter.com/apintux">Twitter/@apintux</a></td></tr>
<tr><th align="left">Cristian Lai</th><td><a href="https://github.com/cristianlai">GitHub/cristianlai</a></td><td><a href="https://twitter.com/crlai">Twitter/@crlai</a></td></tr>
</tbody></table>


License - "MIT License"
-----------------------
Copyright (c) 2016 Antonio Pintus (http://www.pintux.it), Cristian Lai

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

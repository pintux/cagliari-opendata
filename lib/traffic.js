/*
 The MIT License (MIT)

 Copyright (c) 2016 Antonio Pintus

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:
 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
 */

"use strict";


const conf = require('./conf');
const debug = require('debug')('lib:traffic');
const util = require('util');
const request = require('request');
const _ = require('lodash');
const dateFormat = require('dateformat');


debug("Configuration is: " + util.inspect(conf));


//get all available stations
exports.getStations = () => {
    return new Promise((resolve, reject) => {
        request(conf.endpoints.traffic.stations, (error, response, body) => {
            try {
                let data = JSON.parse(body).response;
                if (!error && response.statusCode === 200) {
                    resolve({stations: data.result.items.item});
                } else {
                    reject(data.errors);
                }
            } catch (exception) {
                reject(new Error(conf.errors.generic));
            }
        });
    });
};

exports.getStation = (id) => {
    return new Promise((resolve, reject) => {
        if(!id || id ===''){
            return reject(new Error(conf.errors.missingId));
        } else {
            let queryString = {id: id};
            let options = {
                url: conf.endpoints.traffic.station,
                qs: queryString
            };
            request(options, (error, response, body) => {
                try {
                    let data = JSON.parse(body).response;
                    if (!error && response.statusCode === 200) {
                        resolve(data.result.postazione);
                    } else {
                        reject(new Error(data.errors.error));
                    }
                } catch (exception) {
                    reject(new Error(conf.errors.generic));
                }
            });
        }
    });
};



//get data from a station by id and data range
exports.getStationData = function (stationId, startDate = new Date(), endDate = new Date()) {

    return new Promise((resolve, reject) => {
        if(!stationId || stationId === ''){
            reject(new Error(conf.errors.missingId));
        } else {
            let queryString = {};
            try {
                let start = dateFormat(startDate, 'yyyymmddHHMM');
                let end = dateFormat(endDate, 'yyyymmddHHMM');
                queryString = {id: stationId, start: start, end: end};
            } catch (exception) {
                reject(new Error(conf.errors.dates));
            }

            let options = {
                url: conf.endpoints.traffic.stationData,
                qs: queryString
            };
            request(options, function (error, response, body) {
                try {
                    let data = JSON.parse(body).response;
                    if (!error && response.statusCode === 200 && data.result !== 'FAILURE') {
                        resolve(data.result.misurePostazione);
                    } else {
                        reject(data.errors);
                    }
                } catch (exception) {
                    reject(new Error(conf.errors.generic));
                }
            });
        }
    });

};


//get data from a sensor by id and data range
exports.getSensorData = function (sensorId, startDate = new Date(), endDate = new Date()) {

    return new Promise((resolve, reject) => {

        if(!sensorId || sensorId === ''){
            reject(new Error(conf.errors.missingId));
        } else {
            let queryString = {};
            try {
                let start = dateFormat(startDate, 'yyyymmddHHMM');
                let end = dateFormat(endDate, 'yyyymmddHHMM');
                queryString = {id: sensorId, start: start, end: end};

            } catch (exception) {
                reject(new Error(conf.errors.dates));
            }

            let options = {
                url: conf.endpoints.traffic.sensorData,
                qs: queryString
            };
            request(options, function (error, response, body) {
                try {
                    let data = JSON.parse(body).response;
                    if (!error && response.statusCode === 200 && data.result !== 'FAILURE') {
                        resolve(data.result.misureSensore);
                    } else {
                        reject(data.errors);
                    }
                } catch (exception) {
                    reject(new Error(conf.errors.generic));
                }

            });
        };
    });
};
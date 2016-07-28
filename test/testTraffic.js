"use strict"
const test = require('unit.js');
const should = test.should;
const debug = require('debug');

const opendata = require('../index');
const traffic = opendata.traffic;

describe('Traffic Client', function () {


    describe('getStations', function () {
        it('must return a not empty and valid JSON with stations key', function (done) {
            traffic.getStations()
                .then(function (stations) {
                    should(stations).be.ok;
                    should(stations).have.property('stations');
                    done();
                })
                .catch(function (error) {
                    debug(error);
                    done();
                });
        });
    });


    describe('getStations', function () {
        it('a station must have id and description fields', function (done) {
            traffic.getStations()
                .then(function (stations) {
                    var s = stations.stations[0];
                    should(s).be.ok;
                    should(s).have.property('id');
                    should(s).have.property('descrizione');
                    done();
                })
                .catch(function (error) {
                    debug(error);
                    done();
                });
        });
    });


    describe('getStation', function () {
        it('a station must have id, name and description fields', function (done) {
            traffic.getStation('2')
                .then(function (station) {
                    should(station).be.ok;
                    should(station).have.property('id');
                    should(station).have.property('nome');
                    should(station).have.property('descrizione');
                    done();
                })
                .catch(function (error) {
                    should(error).be.ok;
                    done();
                });
        });
    });


    describe('getStation with a wrong id', function () {
        it('should return an error object', function (done) {
            traffic.getStation('12345')
                .then(function (station) {
                    should(station).not.be.ok;
                    done();
                })
                .catch(function (error) {
                    done();
                });

        })
    });

    describe('getStation with missing id', function () {
        it('should return an error object', function (done) {
            traffic.getStation('')
                .then(function (station) {
                    should(station).not.be.ok;
                    done();
                })
                .catch(function (error) {
                    error.should.be.ok;
                    done();
                });
        });

    });


    describe('getStationData for a valid id', function () {
        it('data must be not null', function (done) {
            var s = new Date();
            var end = new Date();
            var start = s.setMinutes(s.getMinutes() - 60);

            traffic.getStationData(1, start, end)
                .then(function (data) {
                    data.should.be.ok;
                    data.should.have.property('misurazioni');
                    if (data.misurazioni.numeroMisurazioni > 0 && data.misurazioni.misurazione.length) {
                        data.misurazioni.misurazione[0].should.have.property('flusso');
                        data.misurazioni.misurazione[0].should.have.property('velocita');
                    }
                    done();
                })
                .catch(function (error) {
                    error.should.be.ok;
                    done();
                });
        });
    });


    describe('getStationData with wrong id', function () {
        it('should return an error', function (done) {
            var s = new Date();
            var end = new Date();
            var start = s.setMinutes(s.getMinutes() - 60);

            traffic.getStationData(9999)
                .catch(function (error) {
                    error.should.be.ok;
                    error.error.should.be.ok;
                    done();
                });

        });

    });

    describe('getStationData with no end date', function () {
        it('should be OK', function (done) {
            var s = new Date();
            var start = s.setMinutes(s.getMinutes() - 60);

            traffic.getStationData(2, start)
                .then(function (data) {
                    should(data).be.ok;
                    done();
                })
                .catch(function (error) {
                    should(error).be.not.ok;
                    done();
                });
        });
    });


    describe('getSensorData for a valid id', function () {
        it('data must be not null', function (done) {
            var s = new Date();
            var end = new Date();
            var start = s.setMinutes(s.getMinutes() - 60);

            traffic.getSensorData(2, start, end)
                .then(function (data) {
                    data.should.be.ok;
                    data.should.have.property('misurazioni');
                    data.should.have.property('postazione');
                    data.should.have.property('sensore');
                    if (data.misurazioni.numeroMisurazioni > 0 && data.misurazioni.misurazione.length) {
                        data.misurazioni.misurazione[0].should.have.property('flusso');
                        data.misurazioni.misurazione[0].should.have.property('velocita');
                    }
                    done();
                });

        });
    });


    describe('getSensorData with no endDate', function () {
        it('data must be not null', function (done) {
            var s = new Date();
            var start = s.setMinutes(s.getMinutes() - 60);

            traffic.getSensorData(2, start)
                .then(function (data) {
                    data.should.be.ok;
                    data.should.have.property('misurazioni');
                    data.should.have.property('postazione');
                    data.should.have.property('sensore');
                    if (data.misurazioni.numeroMisurazioni > 0 && data.misurazioni.misurazione.length) {
                        data.misurazioni.misurazione[0].should.have.property('flusso');
                        data.misurazioni.misurazione[0].should.have.property('velocita');
                    }
                    done();
                });
        });
    });


    describe('getSensorData with wrong id', function () {
        it('should return an error', function (done) {
            var s = new Date();
            var end = new Date();
            var start = s.setMinutes(s.getMinutes() - 60);

            traffic.getSensorData(9999, start, end)
                .catch(function (error) {
                    error.should.be.ok;
                    error.error.should.be.ok;
                    done();
                });
        });
    });

    describe('getSensorData with not valid date start date and no end date', function () {
        it('data must be null and an Error must be raised', function (done) {
            var start = '2016-13-01';

            traffic.getSensorData(2, start)
                .catch(function (error) {
                    error.should.be.ok;
                    done();
                });
        });
    });

    describe('getSensorData with a valid date start date and no valid end date', function () {
        it('data must be null and an Error must be raised', function (done) {
            var start = new Date();
            var end = '2016-13-01';

            traffic.getSensorData(2, start, end)
                .catch(function (error) {
                    error.should.be.ok;
                    done();
                });
        });
    });

    describe('getSensorData  with an interval > 24h', function () {
        it('data must be null and an Error must be raised', function (done) {
            var start = new Date('October 13, 2015 11:13:00');

            traffic.getSensorData(2, start)
                .catch(function (error) {
                    error.should.be.ok;
                    done();
                });
        });
    });


    describe('getStationData with not valid start date and no end date', function () {
        it('data must be null and an Error must be raised', function (done) {
            var start = '2016-13-01';

            traffic.getStationData(2, start)
                .catch(function (error) {
                    error.should.be.ok;
                    done();
                });
        });
    });

    describe('getStationData with a valid date start date and no valid end date', function () {
        it('data must be null and an Error must be raised', function (done) {
            var start = new Date();
            var end = '2016-13-01';

            traffic.getStationData(2, start, end)
                .catch(function (error) {
                    error.should.be.ok;
                    done();
                });
        });
    });

    describe('getStationData with an interval > 24h', function () {
        it('data must be null and an Error must be raised', function (done) {
            var start = new Date('October 13, 2015 11:13:00');
            traffic.getStationData(2, start)
                .catch(function (error) {
                    error.should.be.ok;
                    done();
                });
        });
    });
});

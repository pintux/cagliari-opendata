
module.exports = {
    endpoints: {
        traffic: {
            stations: 'http://www.comune.cagliari.it/portale/api/rs/en/traffico/postazioni.json',
            station: 'http://www.comune.cagliari.it/portale/api/rs/en/traffico/postazione.json',
            stationData: 'http://www.comune.cagliari.it/portale/api/rs/en/traffico/misurepostazione.json',
            sensorData: 'http://www.comune.cagliari.it/portale/api/rs/en/traffico/misuresensore.json'
        }
    },
    errors:{
        generic: 'An Error happened calling the Stations API endpoint, maybe due to a temporary server issue. Please, retry later',
        dates: 'Error processing dates, please check them',
        missingId: 'id field is mandatory, please check it'
    }
};



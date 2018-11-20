module.exports = function (type) {
    switch (type) {
        // Snowish
        case 'snow':
        case 'snowflake':
        case 'sleet':
            return 'Cloud-Snow.svg';
        // Hail
        case 'hail':
            return 'Cloud-Hail.svg';
        // Rain
        case 'rain':
            return 'Cloud-Rain.svg';
        // Partly cloudy night
        case 'partly-cloudy-night':
            return 'Cloud-Moon.svg';
        // Cloudy
        case 'cloudy':
            return 'Cloud.svg';
        // Clear day
        case 'clear-day':
            return 'Sun.svg';

        // partly cloudy day
        case 'partly-cloudy-day':
            return 'Cloud-Sun.svg';
        // Wind
        case 'wind':
            return 'Cloud-Wind.svg';
        // Fog
        case 'fog':
            return 'Cloud-Fog.svg';
        // Tornado
        case 'tornado':
            return 'Tornado.svg';
        // thunderstorm
        case 'thunderstorm':
            return 'Cloud-Lighting.svg';
        default:
            return 'Umbrella.svg';
    }
};
<template>
    <card class="flex flex-col items-center justify-center h-full">
        <div v-if="loadingGeo" class="text-center p-4">
            Loading your geolocation...
            <i class="fa fa-refresh fa-spin"></i>
        </div>
        <div class="px-3 py-3 flex-1 w-full" v-else-if="shouldPromptForApiKey">
            <h2 class="pb-4">We need your Api Key!</h2>
            <input v-model="api_key" type="text" class="w-full form-control form-input form-input-bordered">
            <div class="flex flex-wrap w-full mt-4">
                <div class="flex-grow pt-2 text-small" style="color:#8795A1;">
                    Weather from <a href="https://darksky.net" style="color:#8795A1;">darksky.net</a>
                </div>
                <button class="ml-auto btn btn-default btn-primary" @click.prevent="saveKey">
                    Save
                </button>
            </div>
        </div>
        <div v-else-if="!currently">
            <div class="wg-full h-full">
                We could not find your location.
            </div>
        </div>
        <div v-else class="px-3 py-3 flex-1 h-full">
            <h3 class="text-center" v-if="card.name">{{ card.name }}</h3>
            <div class="flex w-full relative">
                <div class="flex-1" :data-dash="currently.icon" v-html="image"></div>
                <div class="flex-1 flex items-center">
                    <div class="mx-auto">
                        <h2>{{ currently.temperature }}&deg;<span v-if="unit === 'us'">F</span><span v-else>C</span></h2>
                        <div>{{ currently.summary }}</div>
                    </div>
                </div>
                <div class="absolute pin-b pin-r">
                    <a class="pr-1 text-primary no-underline" href="#" @click.prevent="changeToF">
                        &deg;F
                    </a>
                    |
                    <a class="pl-1 text-primary no-underline" href="#" @click.prevent="changeToC">
                        &deg;C
                    </a>
                </div>
            </div>
        </div>
    </card>
</template>

<script>
export default {
    props: ['card'],
    data() {
        return {
            shouldPromptForApiKey: false,
            api_key: '',
            loadingGeo: true,
            weather: {},
            image: '',
            unit: localStorage.getItem('weather_unit') || 'auto' ,
        }
    },
    computed: {
        currently() {
            let weather = this.weather
            if (Array.isArray(weather)) {
                weather = weather[0]
            }
            return weather.currently
        },
        language() {
            return navigator.language.split('-')[0]
        }
    },
    watch: {
        unit() {
            this.$toasted.clear()
            this.getWeather()
        }
    },
    methods: {
        url(latitude, longitude) {
            return '/nova-vendor/nova-weather-cards/weather-proxy/' + latitude + '/' + longitude + '?unit=' + this.unit + '&lang=' + this.language
        },
        weatherIcon() {
            return require('./WeatherIcons')(this.currently.icon);
        },
        saveKey() {
            axios.post('/nova-vendor/nova-weather-cards/weather-proxy/set-api-key', {
                api_key: this.api_key
            })
            .then(r => (this.getWeather()))
        },
        getWeather() {
            this.loadingGeo = true;
            const weatherResults = (res) => {
                res.data[0].alerts.forEach(bit => {
                    this.$toasted.show(bit.description, {
                        type: bit.severity === 'warning' ? 'error':'info',
                        fullWidth: true,
                        duration: 20 * 1000
                    })
                })
                this.weather = res.data;
                this.disablePrompts()
                axios.get('/nova-vendor/nova-weather-cards/weather-icons/' + this.weatherIcon())
                    .then(res => (this.image = res.data))
                    .catch(err => (console.log('Failed to load the icon')));

            }

            if (!(this.card.coords) && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    axios.get(this.url(position.coords.latitude, position.coords.longitude))
                        .then(weatherResults)
                        .catch(err => () => {this.promptForAKey()});
                }, () => (console.log('Failed to get locations')));
            } else if (this.card.coords) {
                axios.get(this.url(this.card.coords[0], this.card.coords[1]))
                    .then(weatherResults)
                    .catch(err => () => {this.promptForAKey()});

            } else {
                this.loadingGeo = false;
            }
        },
        promptForAKey() {
            this.loadingGeo = false;
            this.shouldPromptForApiKey = true;
        },
        disablePrompts() {
            this.loadingGeo = false;
            this.shouldPromptForApiKey = false
        },
        changeToF() {
            this.unit = 'us';
            localStorage.setItem('weather_unit', this.unit)
            Nova.$emit('kregel-weather-card:update-units', this.unit)
        },
        changeToC() {
            this.unit = 'si';
            localStorage.setItem('weather_unit', this.unit)
            Nova.$emit('kregel-weather-card:update-units', this.unit)
        }
    },
    mounted() {
        // Nova.$off('kregel-weather-card:update-units')
        Nova.$on('kregel-weather-card:update-units', (unit) => {
            this.unit = unit;
        })

        this.getWeather();
    },
}
</script>

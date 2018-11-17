<template>
    <card class="flex flex-col items-center justify-center">
        <div class="px-3 py-3 flex-1 w-full">
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
    </card>
</template>

<script>
export default {
    props: ['card',],
    data() {
        return {
            shouldPromptForApiKey: false,
            api_key: ''
        }
    },
    methods: {
        saveKey() {
            axios.post('/weather-proxy/set-api-key')
        }
    },
    mounted() {
        if (localStorage.getItem('api_key') === null) {
            this.shouldPromptForApiKey = true;
        } else {
            this.getWeather();
        }
    },
}
</script>

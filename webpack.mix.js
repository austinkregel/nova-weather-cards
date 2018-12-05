let mix = require('laravel-mix')

mix.setPublicPath('dist')
   .js('resources/js/weather-card.js', 'js')
   .sass('resources/sass/card.scss', 'css')

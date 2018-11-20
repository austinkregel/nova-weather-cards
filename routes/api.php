<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Card API Routes
|--------------------------------------------------------------------------
|
| Here is where you may register API routes for your card. These routes
| are loaded by the ServiceProvider of your card. You're free to add
| as many additional routes to this file as your card may require.
|
*/

// Route::get('/endpoint', function (Request $request) {
//     //
// });
Route::group([
    'namespace' => 'Kregel\\NovaWeatherCards\\Http\\Controllers',
    'middleware' => 'auth'
], function() {
    Route::get('/weather-proxy/{xcoord}/{ycoord}', 'WeatherProxyController@index');
    Route::post('/weather-proxy/set-api-key', 'WeatherProxyController@saveKey');

    Route::get('/weather-icons/{type}', function (Request $request, $type) {
        $file = __DIR__ . '/../dist/img/'. $type;

        if (!file_exists($file)) {
            return 'Your file doesnt exist';
        }

        header('Content-type: image/svg+xml');
        return file_get_contents($file);
    });
});

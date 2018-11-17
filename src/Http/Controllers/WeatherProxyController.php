<?php

declare(strict_types=1);

namespace Kregel\NovaWeatherCards\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Kregel\NovaWeatherCards\Contracts\WeatherStoreContract;

/**
 * Class WeatherProxyController
 * @package Kregel\NovaWeatherCards\Http\Controllers
 */
class WeatherProxyController
{
    /**
     * @var WeatherStoreContract
     */
    protected $dataStore;

    public function __construct(WeatherStoreContract $dataStore)
    {
        $this->dataStore = $dataStore;
        $this->middleware = 'auth';
    }

    public function index($lat, $lang)
    {
        if (!$this->dataStore->exists('api_key')) {
            throw ValidationException::withMessages([
                'weather.api_key' => ['Your weather api key has not been set.']
            ]);
        }

        if ($this->dataStore->model('weather')->exists('location:'.$lat.$lang)) {
            return $this->dataStore->get('location:'.$lat.$lang);
        }
        return $this->dataStore->save('location:'.$lat.$lang, function () use ($lat, $lang) {
            $weatherJson = (new Client)
                ->get('https://api.darksky.net/forecast/' . decrypt($this->dataStore->get('api_key')) . '/'.$lat.','.$lang)
                ->getBody()
                ->getContents();

            return response()->json(json_decode($weatherJson));

        });
    }

    public function saveKey(Request $request)
    {
        if ($this->dataStore->exists('api_key')) {
            $this->dataStore->destroy('api_key');
        }

        $this->dataStore->save('api_key', function () use ($request) {
            return encrypt($request->get('api_key'));
        });

        return response()->json([
            'message' => 'Key saved!'
        ]);
    }
}

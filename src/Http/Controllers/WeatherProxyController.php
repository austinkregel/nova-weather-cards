<?php

declare(strict_types=1);

namespace Kregel\NovaWeatherCards\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Contracts\Redis\Factory;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Validation\ValidationException;
use Kregel\NovaWeatherCards\Contracts\WeatherStoreContract;
use Kregel\NovaWeatherCards\WeatherStore;

/**
 * Class WeatherProxyController
 * @package Kregel\NovaWeatherCards\Http\Controllers
 */
class WeatherProxyController extends Controller
{
    /**
     * @var WeatherStoreContract
     */
    protected $dataStore;

    protected const CACHE_API_KEY = 'api_key';
    protected const CACHE_MODEL = 'weather';

    protected $weatherStore;

    public function __construct()
    {
        $this->weatherStore = WeatherStore::forModel(static::CACHE_MODEL);
    }

    public function index($lat, $lang, Request $request)
    {
        if (!$this->weatherStore->exists(static::CACHE_API_KEY)) {
            throw ValidationException::withMessages([
                'weather.' . static::CACHE_API_KEY => ['Your weather api key has not been set.']
            ]);
        }

        $unit = $request->get('unit', 'auto');

        if ($this->weatherStore->exists('location:'.$unit.$lat.$lang)) {
            return $this->weatherStore->get('location:'.$unit.$lat.$lang);
        }

        $this->weatherStore->save('location:'.$unit.$lat.$lang, function () use ($lat, $lang, $unit) {
            $weatherJson = (new Client)
                ->get('https://api.darksky.net/forecast/' . $this->weatherStore->first(static::CACHE_API_KEY) . '/'.$lat.','.$lang . '?units=' . $unit . '&exclude=hourly,daily,minutely,flags')
                ->getBody()
                ->getContents();

            $decoded = json_decode($weatherJson);

            return $decoded;
        });

        return collect($this->weatherStore->first('location:'.$unit.$lat.$lang));
    }

    public function saveKey(Request $request)
    {
        if (!$request->has(static::CACHE_API_KEY)) {
            throw ValidationException::withMessages([
                static::CACHE_API_KEY => ['The ' . static::CACHE_API_KEY . ' is a required value.'],
                'all' => $request->all(),
            ]);
        }

        if ($this->weatherStore->exists(static::CACHE_API_KEY)) {
            $this->weatherStore->destroy(static::CACHE_API_KEY);
        }

        $this->weatherStore->save(static::CACHE_API_KEY, function () use ($request) {
            return $request->get(static::CACHE_API_KEY);
        });

        return response()->json([
            'message' => 'Key saved!'
        ]);
    }
}

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

    public function index($lat, $lang)
    {
        if (!$this->weatherStore->exists(static::CACHE_API_KEY)) {
            throw ValidationException::withMessages([
                'weather.' . static::CACHE_API_KEY => ['Your weather api key has not been set.']
            ]);
        }

        if ($this->weatherStore->exists('location:'.$lat.$lang)) {
            return $this->weatherStore->get('location:'.$lat.$lang);
        }

        $this->weatherStore->save('location:'.$lat.$lang, function () use ($lat, $lang) {
            $weatherJson = (new Client)
                ->get('https://api.darksky.net/forecast/' . $this->weatherStore->first(static::CACHE_API_KEY) . '/'.$lat.','.$lang)
                ->getBody()
                ->getContents();

            $decoded = json_decode($weatherJson);

            return $decoded;
        });

        return collect($this->weatherStore->first('location:'.$lat.$lang));
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

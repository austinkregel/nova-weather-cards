<?php

declare(strict_types=1);

namespace Kregel\NovaWeatherCards;

use Kregel\DataStore\DataStore;
use Kregel\NovaWeatherCards\Contracts\WeatherStoreContract;

/**
 * Class WeatherStore
 * @package Kregel\NovaWeatherCards
 */
class WeatherStore extends DataStore implements WeatherStoreContract
{
    /**
     * @const string
     */
    public const PACKAGE_TAG = 'kregel.weather-cache';
}

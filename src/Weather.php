<?php

namespace Kregel\NovaWeatherCards;

use Laravel\Nova\Card;

class Weather extends Card
{
    /**
     * The width of the card (1/3, 1/2, or full).
     *
     * @var string
     */
    public $width = '1/4';

    /**
     * Get the component name for the element.
     *
     * @return string
     */
    public function component()
    {
        return 'nova-weather-cards';
    }
}

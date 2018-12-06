/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(7);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Nova.booting(function (Vue, router) {
    Vue.component('nova-weather-cards', __webpack_require__(2));
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(3)
/* script */
var __vue_script__ = __webpack_require__(4)
/* template */
var __vue_template__ = __webpack_require__(6)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Card.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b9bc2c0a", Component.options)
  } else {
    hotAPI.reload("data-v-b9bc2c0a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['card'],
    data: function data() {
        return {
            shouldPromptForApiKey: false,
            api_key: '',
            loadingGeo: true,
            weather: {},
            image: '',
            unit: localStorage.getItem('weather_unit') || 'auto'
        };
    },

    computed: {
        currently: function currently() {
            var weather = this.weather;
            if (Array.isArray(weather)) {
                weather = weather[0];
            }
            return weather.currently;
        },
        language: function language() {
            return navigator.language.split('-')[0];
        }
    },
    watch: {
        unit: function unit() {
            this.$toasted.clear();
            this.getWeather();
        }
    },
    methods: {
        url: function url(latitude, longitude) {
            return '/nova-vendor/nova-weather-cards/weather-proxy/' + latitude + '/' + longitude + '?unit=' + this.unit + '&lang=' + this.language;
        },
        weatherIcon: function weatherIcon() {
            return __webpack_require__(5)(this.currently.icon);
        },
        saveKey: function saveKey() {
            var _this = this;

            axios.post('/nova-vendor/nova-weather-cards/weather-proxy/set-api-key', {
                api_key: this.api_key
            }).then(function (r) {
                return _this.getWeather();
            });
        },
        getWeather: function getWeather() {
            var _this2 = this;

            this.loadingGeo = true;
            var weatherResults = function weatherResults(res) {
                res.data[0].alerts.forEach(function (bit) {
                    _this2.$toasted.show(bit.description, {
                        type: bit.severity === 'warning' ? 'error' : 'info',
                        fullWidth: true,
                        duration: 20 * 1000
                    });
                });
                _this2.weather = res.data;
                _this2.disablePrompts();
                axios.get('/nova-vendor/nova-weather-cards/weather-icons/' + _this2.weatherIcon()).then(function (res) {
                    return _this2.image = res.data;
                }).catch(function (err) {
                    return console.log('Failed to load the icon');
                });
            };

            if (!this.card.coords && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    axios.get(_this2.url(position.coords.latitude, position.coords.longitude)).then(weatherResults).catch(function (err) {
                        return function () {
                            _this2.promptForAKey();
                        };
                    });
                }, function () {
                    return console.log('Failed to get locations');
                });
            } else if (this.card.coords) {
                axios.get(this.url(this.card.coords[0], this.card.coords[1])).then(weatherResults).catch(function (err) {
                    return function () {
                        _this2.promptForAKey();
                    };
                });
            } else {
                this.loadingGeo = false;
            }
        },
        promptForAKey: function promptForAKey() {
            this.loadingGeo = false;
            this.shouldPromptForApiKey = true;
        },
        disablePrompts: function disablePrompts() {
            this.loadingGeo = false;
            this.shouldPromptForApiKey = false;
        },
        changeToF: function changeToF() {
            this.unit = 'us';
            localStorage.setItem('weather_unit', this.unit);
            Nova.$emit('kregel-weather-card:update-units', this.unit);
        },
        changeToC: function changeToC() {
            this.unit = 'si';
            localStorage.setItem('weather_unit', this.unit);
            Nova.$emit('kregel-weather-card:update-units', this.unit);
        }
    },
    mounted: function mounted() {
        var _this3 = this;

        // Nova.$off('kregel-weather-card:update-units')
        Nova.$on('kregel-weather-card:update-units', function (unit) {
            _this3.unit = unit;
        });

        this.getWeather();
    }
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "card",
    { staticClass: "flex flex-col items-center justify-center h-full" },
    [
      _vm.loadingGeo
        ? _c("div", { staticClass: "text-center p-4" }, [
            _vm._v("\n        Loading your geolocation...\n        "),
            _c("i", { staticClass: "fa fa-refresh fa-spin" })
          ])
        : _vm.shouldPromptForApiKey
        ? _c("div", { staticClass: "px-3 py-3 flex-1 w-full" }, [
            _c("h2", { staticClass: "pb-4" }, [
              _vm._v("We need your Api Key!")
            ]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.api_key,
                  expression: "api_key"
                }
              ],
              staticClass: "w-full form-control form-input form-input-bordered",
              attrs: { type: "text" },
              domProps: { value: _vm.api_key },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.api_key = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            _c("div", { staticClass: "flex flex-wrap w-full mt-4" }, [
              _c(
                "div",
                {
                  staticClass: "flex-grow pt-2 text-small",
                  staticStyle: { color: "#8795A1" }
                },
                [
                  _vm._v("\n                Weather from "),
                  _c(
                    "a",
                    {
                      staticStyle: { color: "#8795A1" },
                      attrs: { href: "https://darksky.net" }
                    },
                    [_vm._v("darksky.net")]
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "ml-auto btn btn-default btn-primary",
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      return _vm.saveKey($event)
                    }
                  }
                },
                [_vm._v("\n                Save\n            ")]
              )
            ])
          ])
        : !_vm.currently
        ? _c("div", [
            _c("div", { staticClass: "wg-full h-full" }, [
              _vm._v("\n            We could not find your location.\n        ")
            ])
          ])
        : _c("div", { staticClass: "px-3 py-3 flex-1 h-full" }, [
            _vm.card.name
              ? _c("h3", { staticClass: "text-center" }, [
                  _vm._v(_vm._s(_vm.card.name))
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "flex w-full relative" }, [
              _c("div", {
                staticClass: "flex-1",
                attrs: { "data-dash": _vm.currently.icon },
                domProps: { innerHTML: _vm._s(_vm.image) }
              }),
              _vm._v(" "),
              _c("div", { staticClass: "flex-1 flex items-center" }, [
                _c("div", { staticClass: "mx-auto" }, [
                  _c("h2", [
                    _vm._v(_vm._s(_vm.currently.temperature) + "°"),
                    _vm.unit === "us"
                      ? _c("span", [_vm._v("F")])
                      : _c("span", [_vm._v("C")])
                  ]),
                  _vm._v(" "),
                  _c("div", [_vm._v(_vm._s(_vm.currently.summary))])
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "absolute pin-b pin-r" }, [
                _c(
                  "a",
                  {
                    staticClass: "pr-1 text-primary no-underline",
                    attrs: { href: "#" },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.changeToF($event)
                      }
                    }
                  },
                  [_vm._v("\n                    °F\n                ")]
                ),
                _vm._v("\n                |\n                "),
                _c(
                  "a",
                  {
                    staticClass: "pl-1 text-primary no-underline",
                    attrs: { href: "#" },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.changeToC($event)
                      }
                    }
                  },
                  [_vm._v("\n                    °C\n                ")]
                )
              ])
            ])
          ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b9bc2c0a", module.exports)
  }
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){n(1),t.exports=n(7)},function(t,e,n){Nova.booting(function(t,e){t.component("nova-weather-cards",n(2))})},function(t,e,n){var r=n(3)(n(4),n(6),!1,null,null,null);t.exports=r.exports},function(t,e){t.exports=function(t,e,n,r,o,a){var i,s=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(i=t,s=t.default);var u,l="function"==typeof s?s.options:s;if(e&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0),n&&(l.functional=!0),o&&(l._scopeId=o),a?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},l._ssrRegister=u):r&&(u=r),u){var d=l.functional,h=d?l.render:l.beforeCreate;d?(l._injectStyles=u,l.render=function(t,e){return u.call(e),h(t,e)}):l.beforeCreate=h?[].concat(h,u):[u]}return{esModule:i,exports:s,options:l}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["card"],data:function(){return{shouldPromptForApiKey:!1,api_key:"",loadingGeo:!0,weather:{},image:"",unit:localStorage.getItem("weather_unit")||"auto"}},computed:{currently:function(){var t=this.weather;return Array.isArray(t)&&(t=t[0]),t.currently}},methods:{url:function(t,e){return"/nova-vendor/nova-weather-cards/weather-proxy/"+t+"/"+e+"?unit="+this.unit},weatherIcon:function(){return n(5)(this.currently.icon)},saveKey:function(){var t=this;axios.post("/nova-vendor/nova-weather-cards/weather-proxy/set-api-key",{api_key:this.api_key}).then(function(e){return t.getWeather()})},getWeather:function(){var t=this;this.loadingGeo=!0,this.card.coords&&2==this.card.coords.length||!navigator.geolocation?this.card.coords&&2==this.card.coords.length?axios.get(this.url(this.card.coords[0],this.card.coords[1])).then(function(e){console.log("Weather is:",e.data),t.weather=e.data,t.disablePrompts(),axios.get("/nova-vendor/nova-weather-cards/weather-icons/"+t.weatherIcon()).then(function(e){return t.image=e.data}).catch(function(t){return console.log("Failed to load the icon")})}).catch(function(e){return t.promptForAKey()}):this.loadingGeo=!1:navigator.geolocation.getCurrentPosition(function(e){axios.get(t.url(e.coords.latitude,e.coords.longitude)).then(function(e){t.weather=e.data,t.disablePrompts(),axios.get("/nova-vendor/nova-weather-cards/weather-icons/"+t.weatherIcon()).then(function(e){return t.image=e.data}).catch(function(t){return console.log("Failed to load the icon")})}).catch(function(e){return t.promptForAKey()})},function(){return console.log("Failed to get locations")})},promptForAKey:function(){this.loadingGeo=!1,this.shouldPromptForApiKey=!0},disablePrompts:function(){this.loadingGeo=!1,this.shouldPromptForApiKey=!1},changeToF:function(){this.unit="us",this.getWeather(),localStorage.setItem("weather_unit",this.unit),Nova.$emit("kregel-weather-card:update-units",this.unit)},changeToC:function(){this.unit="si",this.getWeather(),localStorage.setItem("weather_unit",this.unit),Nova.$emit("kregel-weather-card:update-units",this.unit)}},mounted:function(){var t=this;Nova.$on("kregel-weather-card:update-units",function(e){t.unit=e,Nova.$emit("kregel-weather-card:update-weather")}),Nova.$on("kregel-weather-card:update-weather",function(){return t.getWeather()}),this.getWeather()}}},function(t,e){t.exports=function(t){switch(t){case"snow":case"snowflake":case"sleet":return"Cloud-Snow.svg";case"hail":return"Cloud-Hail.svg";case"rain":return"Cloud-Rain.svg";case"partly-cloudy-night":return"Cloud-Moon.svg";case"cloudy":return"Cloud.svg";case"clear-day":return"Sun.svg";case"partly-cloudy-day":return"Cloud-Sun.svg";case"wind":return"Cloud-Wind.svg";case"fog":return"Cloud-Fog.svg";case"tornado":return"Tornado.svg";case"thunderstorm":return"Cloud-Lighting.svg";default:return"Umbrella.svg"}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("card",{staticClass:"flex flex-col items-center justify-center h-full"},[t.loadingGeo?n("div",{staticClass:"text-center"},[t._v("\n        Loading your geolocation...\n        "),n("i",{staticClass:"fa fa-refresh fa-spin"})]):t.shouldPromptForApiKey?n("div",{staticClass:"px-3 py-3 flex-1 w-full"},[n("h2",{staticClass:"pb-4"},[t._v("We need your Api Key!")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.api_key,expression:"api_key"}],staticClass:"w-full form-control form-input form-input-bordered",attrs:{type:"text"},domProps:{value:t.api_key},on:{input:function(e){e.target.composing||(t.api_key=e.target.value)}}}),t._v(" "),n("div",{staticClass:"flex flex-wrap w-full mt-4"},[n("div",{staticClass:"flex-grow pt-2 text-small",staticStyle:{color:"#8795A1"}},[t._v("\n                Weather from "),n("a",{staticStyle:{color:"#8795A1"},attrs:{href:"https://darksky.net"}},[t._v("darksky.net")])]),t._v(" "),n("button",{staticClass:"ml-auto btn btn-default btn-primary",on:{click:function(e){return e.preventDefault(),t.saveKey(e)}}},[t._v("\n                Save\n            ")])])]):t.currently?n("div",{staticClass:"px-3 py-3 flex-1 h-full"},[t.card.name?n("h3",{staticClass:"text-center"},[t._v(t._s(t.card.name))]):t._e(),t._v(" "),n("div",{staticClass:"flex w-full relative"},[n("div",{staticClass:"flex-1",attrs:{"data-dash":t.currently.icon},domProps:{innerHTML:t._s(t.image)}}),t._v(" "),n("div",{staticClass:"flex-1 flex items-center"},[n("div",{staticClass:"mx-auto"},[n("h2",[t._v(t._s(t.currently.temperature)+"°"),"us"===t.unit?n("span",[t._v("F")]):n("span",[t._v("C")])]),t._v(" "),n("div",[t._v(t._s(t.currently.summary))])])]),t._v(" "),n("div",{staticClass:"absolute pin-b pin-r m-2"},[n("a",{staticClass:"pr-1",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.changeToF(e)}}},[t._v("\n                    °F\n                ")]),t._v("\n                |\n                "),n("a",{staticClass:"pl-1",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.changeToC(e)}}},[t._v("\n                    °C\n                ")])])])]):n("div",[n("div",{staticClass:"wg-full h-full"},[t._v("\n            We could not find your location.\n        ")])])])},staticRenderFns:[]}},function(t,e){}]);
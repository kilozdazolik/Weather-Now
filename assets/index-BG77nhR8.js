(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();const O={0:"sunny",1:"partly-cloudy",2:"partly-cloudy",3:"cloudy",45:"fog",48:"fog",51:"drizzle",53:"drizzle",55:"drizzle",56:"drizzle",57:"drizzle",61:"rain",63:"rain",65:"rain",66:"rain",67:"rain",71:"snow",73:"snow",75:"snow",77:"snow",95:"storm",96:"storm",99:"storm"};function _(e){return O[e]||"sunny"}function H(e,n,t,s){if(!e)return;let r=_(t.code);const o=s==="metric"?"C":"F",d=new Date().toLocaleDateString("en-US",{weekday:"long",day:"numeric",month:"short",year:"numeric"}),u=window.innerWidth>=768?"large":"small";e.style.backgroundImage=`url(./public/images/bg-today-${u}.svg)`,e.innerHTML=`
    <div class="left">
      <p class="text-preset text-preset-4 weather-card_location">
        ${n.name}, ${n.country}
      </p>
      <p class="text-preset text-preset-6 weather-card_date">
        ${d}
      </p>
    </div>
    
    <div class="right">
      <img 
        class="weather-card_icon" 
        src="./src/assets/images/icon-${r}.webp" 
        alt="${t.description}" 
      />
      <p class="text-preset text-preset-1 weather-card_temperature">
        ${t.temp}°${o}
      </p>
    </div>
  `}function k(e,n,t){if(!e)return;const s=t==="metric"?"C":"F",r=t==="metric"?"km/h":"mph",o=t==="metric"?"mm":"in";e.innerHTML=`
    <div class="card">
      <p class="text-preset text-preset-6 card-info">Feels like</p>
      <p class="text-preset text-preset-3 card-value">
        ${n.feelsLike}°${s}
      </p>
    </div>
    
    <div class="card">
      <p class="text-preset text-preset-6 card-info">Humidity</p>
      <p class="text-preset text-preset-3 card-value">
        ${n.humidity}%
      </p>
    </div>
    
    <div class="card">
      <p class="text-preset text-preset-6 card-info">Wind</p>
      <p class="text-preset text-preset-3 card-value">
        ${n.wind} ${r}
      </p>
    </div>
    
    <div class="card">
      <p class="text-preset text-preset-6 card-info">Precipitation</p>
      <p class="text-preset text-preset-3 card-value">
        ${n.precip} ${o}
      </p>
    </div>
  `}function C(e,n,t){if(!e||!n)return;e.innerHTML="";const s=n.map(r=>{const d=new Date(r.date).toLocaleDateString("en-US",{weekday:"short"}),u=_(r.code);return`
      <div class="day-card">
        <p class="text-preset text-preset-6 day-card_day">${d}</p>
        <img
          src="./images/icon-${u}.webp"
          alt="weather icon"
          class="day-card_icon"
        />
        <div class="day-card_temperatures">
          <p class="text-preset text-preset-7 day-card_temp-max">
            ${r.maxTemp}°
          </p>
          <p class="text-preset text-preset-7 day-card_temp-min">
            ${r.minTemp}°
          </p>
        </div>
      </div>
    `}).join("");e.innerHTML=s}function q(e,n,t,s=null){if(!e||!n)return;e.innerHTML="",s||(s=new Date().toLocaleDateString("en-US",{weekday:"long"}));const d=n.filter(u=>new Date(u.time).toLocaleDateString("en-US",{weekday:"long"})===s).slice(0,8).map(u=>{const a=new Date(u.time).toLocaleTimeString("en-US",{hour:"numeric",hour12:!0});return`
      <li class="sidebar-list-item">
        <div class="sidebar-list-item_left">
          <img
            class="sidebar-list-item_icon"
            src="./images/icon-${_(u.code)}.webp"
            alt="weather icon"
          />
          <p class="text-preset text-preset-5-medium">${a}</p>
        </div>
        <p class="text-preset text-preset-6">${u.temp}°</p>
      </li>
    `}).join("");d===""?e.innerHTML=`<p class="text-preset text-preset-7" style="text-align:center; padding: 20px;">No data for ${s}</p>`:e.innerHTML=d}let y=null;function b(e,n,t="metric"){const s=document.querySelector(".current-weather-card");H(s,{name:n,country:""},e.current,t);const r=document.querySelector(".highlights-grid");r&&k(r,e.current,t);const o=document.querySelector(".daily-grid");o&&C(o,e.daily);const d=document.querySelector(".sidebar-list"),u=document.querySelector(".sidebar-button");if(y===null&&(y=new Date().toLocaleDateString("en-US",{weekday:"long"})),u){const p=u.querySelector("img")?u.querySelector("img").outerHTML:"";u.innerHTML=`${y} ${p}`}d&&q(d,e.hourly,t,y)}function U(e,n,t){y=e;const s=document.querySelector(".sidebar-list"),r=document.querySelector(".sidebar-button");if(r){const o=r.querySelector("img")?r.querySelector("img").outerHTML:"";r.innerHTML=`${e} ${o}`}q(s,n.hourly,t,y)}class x{constructor(n,t){this.dropdown=document.querySelector(n),this.button=t?document.querySelector(t):null}toggle(){this.dropdown?.classList.toggle("show"),this.button?.classList.toggle("show")}open(){this.dropdown?.classList.add("show"),this.button?.classList.add("show")}close(){this.dropdown?.classList.remove("show"),this.button?.classList.remove("show")}isOpen(){return this.dropdown?.classList.contains("show")??!1}}const $=new x(".dropdown-unit",".unit"),D=new x(".dropdown-sidebar",".sidebar-button"),L=new x(".dropdown-search");function z(e){const n=document.querySelector(".dropdown-search-list");n&&(n.innerHTML="",e.forEach(t=>{const s=document.createElement("li");s.className="dropdown-search-list-item text-preset text-preset-7",s.textContent=`${t.name}, ${t.country}`,s.dataset.lat=t.lat,s.dataset.lon=t.lon,s.dataset.name=t.name,n.appendChild(s)}))}function I(){const e=document.querySelector(".dropdown-search-list");e&&(e.innerHTML=`
    <div class="loader-container">
      <span class="loader"></span>
      <p class="text-preset text-preset-7">Search in progress...</p>
    </div>
  `)}const N=()=>$.toggle(),T=()=>$.close(),P=()=>$.isOpen(),A=()=>D.toggle(),M=()=>D.close(),j=()=>D.isOpen(),F=()=>L.toggle(),W=()=>L.open(),S=()=>L.close(),B=()=>L.isOpen(),R="https://geocoding-api.open-meteo.com/v1/search",V="https://api.open-meteo.com/v1/forecast?",G={0:"Clear sky",1:"Mainly clear",2:"Partly cloudy",3:"Overcast",45:"Fog",48:"Depositing rime fog",51:"Light drizzle",53:"Moderate drizzle",55:"Dense drizzle",61:"Slight rain",63:"Moderate rain",65:"Heavy rain",71:"Slight snow fall",73:"Moderate snow fall",75:"Heavy snow fall",95:"Thunderstorm",96:"Thunderstorm with hail",99:"Thunderstorm with heavy hail"};async function K(e){const n=`${R}?name=${e}&count=5`;try{const t=await fetch(n);if(!t.ok)throw new Error(t.status,t.statusText);const s=await t.json();return s.results?s.results.map(r=>({name:r.name,country:r.country,lat:r.latitude,lon:r.longitude})):[]}catch(t){console.error(t)}}async function v(e,n,t="metric"){const s=t==="metric"?"celsius":"fahrenheit",r=t==="metric"?"kmh":"mph",o=t==="metric"?"mm":"inch",d=new URLSearchParams({latitude:e,longitude:n,timezone:"auto",temperature_unit:s,windspeed_unit:r,precipitation_unit:o,forecast_days:7,daily:"weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",current:"temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m",hourly:"temperature_2m,weather_code"}),u=`${V}${d.toString()}`;try{const p=await fetch(u);if(!p.ok)throw new Error("Weather API Error");const a=await p.json();return{current:{temp:Math.round(a.current.temperature_2m),feelsLike:Math.round(a.current.apparent_temperature),humidity:a.current.relative_humidity_2m,wind:a.current.wind_speed_10m,precip:a.current.precipitation,isDay:a.current.is_day===1,code:a.current.weather_code,description:G[a.current.weather_code]||"Unknown"},daily:a.daily.time.map((m,h)=>({date:m,maxTemp:Math.round(a.daily.temperature_2m_max[h]),minTemp:Math.round(a.daily.temperature_2m_min[h]),code:a.daily.weather_code[h]})),hourly:a.hourly.time.map((m,h)=>({time:m,temp:Math.round(a.hourly.temperature_2m[h]),code:a.hourly.weather_code[h]}))}}catch(p){return console.error(p),null}}addEventListener("DOMContentLoaded",()=>{let e="metric",n=null,t=null;function s(i){e=i;const c=document.querySelector(".button-switch");c&&(c.textContent=e==="metric"?"Switch to Imperial":"Switch to Metric");const l=document.querySelectorAll(".unit-list-item"),g=["celsius","kmh","mm"],E=["fahrenheit","mph","in","inch"];if(l.forEach(w=>{w.classList.remove("active");const f=w.dataset.value;(e==="metric"&&g.includes(f)||e==="imperial"&&E.includes(f))&&w.classList.add("active")}),n&&t){const w=document.querySelector(".input-search");v(n,t,e).then(f=>{f&&b(f,w.value,e)})}}s("metric");const r=document.querySelector(".button-switch");r&&r.addEventListener("click",()=>{s(e==="metric"?"imperial":"metric")}),document.querySelectorAll(".unit-list-item").forEach(i=>{i.addEventListener("click",()=>{const c=i.dataset.value;let l="metric";["fahrenheit","mph","in","inch"].includes(c)&&(l="imperial"),s(l),T()})});const d=[{trigger:".unit",container:".dropdown-container",toggle:N,close:T,isOpen:P},{trigger:".sidebar-button",container:".sidebar-dropdown-container",toggle:A,close:M,isOpen:j},{trigger:".input-search",container:".section-search",toggle:F,close:S,isOpen:B}],u=i=>{d.forEach((c,l)=>{l!==i&&c.isOpen()&&c.close()})};d.forEach((i,c)=>{const l=document.querySelector(i.trigger);l&&l.addEventListener("click",()=>{u(c),i.toggle()})}),window.addEventListener("click",i=>{d.forEach(c=>{!i.target.closest(c.container)&&c.isOpen()&&c.close()})});const p=document.querySelector(".input-search");if(p){let i;p.addEventListener("input",c=>{I(),clearTimeout(i),i=setTimeout(async()=>{const l=c.target.value;if(l.length>=3){const g=await K(l);z(g),g.length>0?W():S()}else S()},300)})}const a=document.querySelector(".dropdown-search-list");a&&a.addEventListener("click",i=>{const c=i.target.closest(".dropdown-search-list-item");if(c){n=c.dataset.lat,t=c.dataset.lon;const l=c.dataset.name||c.textContent.split(",")[0].trim();p.value=l,S(),console.log(`Lekérés indítása: ${l} (${n}, ${t})`),v(n,t,e).then(g=>{g&&b(g,l,e)})}});const m=document.querySelector(".button-search");m&&m.addEventListener("click",()=>{n&&t&&v(n,t,e).then(i=>{i&&b(i,p.value,e)})}),document.querySelectorAll(".dropdown-sidebar-list-item").forEach(i=>{i.addEventListener("click",()=>{document.querySelector(".dropdown-sidebar-list-item.active")?.classList.remove("active"),i.classList.add("active");const c=i.textContent.trim();n&&t&&v(n,t,e).then(l=>{l&&U(c,l,e)}),M()})})});

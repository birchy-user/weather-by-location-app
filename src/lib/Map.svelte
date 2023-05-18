<script>
    import { onMount } from 'svelte';
    import L from 'leaflet';
    // import 'leaflet-openweathermap';  // Uncomment to see weather layers:

    const center = [56.9677, 24.1056];

    // Uncomment to see weather layers:
    // const connectOpenWeatherMapToLeaflet = (map) => {
    //     const API_KEY = import.meta.env.VITE_API_KEY;
    //     let clouds = L.OWM.clouds({showLegend: false, opacity: 0.7, appId: API_KEY});
    //     let city = L.OWM.current({intervall: 15, appId: API_KEY});
    //     const baseMaps = { "OSM Standard": osm };
    //     const overlayMaps = { "Clouds": clouds, "Cities": city };
    //     const layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
    // };

    onMount(async () => {
        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        });
    

        // Initialize the map
        const map = L.map('map', {
            center: center,
            showLegend: true,
            zoom: 10,
            layers: [osm]
        });

        // Uncomment to see weather layers:
        // connectOpenWeatherMapToLeaflet(map);
    });
</script>

<div id="map"></div>

<style>
    @import 'leaflet/dist/leaflet.css';

    #map {
        height: 700px;
        width: 100%;
    }
</style>
  
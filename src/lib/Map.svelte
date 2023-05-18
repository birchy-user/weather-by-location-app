<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import L from 'leaflet';

    const center = [56.9677, 24.1056];
    const dispatch = createEventDispatcher();

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

        map.on('click', (e) => {
            const { lat, lng } = e.latlng;
            const location = { lat, lon: lng };

            L.marker(location).addTo(map);

            dispatch('locationSelected', location);
        });
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
  
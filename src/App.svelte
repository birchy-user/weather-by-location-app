<script>
  import { onMount } from 'svelte';

  import Map from './lib/Map.svelte';
  import { fetchWeatherData } from './api';

  const PAGE_TITLE = import.meta.env.VITE_PROJECT_TITLE ?? 'Weather By Location App asdas';
  const LOCATION = { lat: 56.95, lon: 24.10 };

  let weatherData = null;
  let loading = true;

  onMount(async () => {
      loading = false;

      try {
        weatherData = await fetchWeatherData(LOCATION);
      } catch (error) {
        console.error(error);
      }
  })

  $: console.dir("Weather data: ", weatherData);
</script>


{#if !loading}
  <main>
    <h1>{PAGE_TITLE}</h1>

    <!-- {#if weatherData} -->
      <!-- <p>Temperature: {weatherData.hourly.temperature_2m}°C</p> -->
      <!-- Display other weather data as needed -->
    <!-- {:else} -->
      <!-- <p>Loading weather data...</p> -->
    <!-- {/if} -->

    <Map />
  </main>
{/if}

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>

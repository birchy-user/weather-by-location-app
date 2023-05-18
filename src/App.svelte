<script>
  import { onMount } from 'svelte';

  import Map from './lib/Map.svelte';
  import LocationsList from './lib/LocationsList.svelte';
  import { fetchWeatherData, getSelectedLocationData } from './api';

  const PAGE_TITLE = import.meta.env.VITE_PROJECT_TITLE ?? 'Weather By Location App';
  const LOCATION = { lat: 56.95, lon: 24.10 };

  let selectedLocation = null;
  let weatherData = null;
  let loading = true;

  let addedLocations = [];

  const clearLocations = () => addedLocations = [];

  const getFullCategory = (classOfLocation, category, type) => 
    type === "yes" ? (category !== undefined ? category : classOfLocation) : type;

  const getFullAddress = (address, display_name) => {
    let fullAddress = display_name;
    if (address) {
      fullAddress = `${address.road ?? ''} ${address.house_number ?? ''}, ${address.suburb ?? ''}, ${address.state ?? ''}, ${address.city ?? ''}, ${address.state ?? ''}, ${address.postcode ?? ''}, ${address.country ?? ''}`;
    }

    // Correctly parses and removes any trailing commas for incomplete addresses:
    fullAddress = fullAddress.split(', ')
      .filter(s => s !== "" && s !== " ")
      .map(s => s.trim())
      .join(', ');

    return fullAddress;
  }

  const onMapClick = async (event) => {
    selectedLocation = event.detail;

    const locationData = await getSelectedLocationData(selectedLocation);
    const { address, category, display_name, lat, lon, type } = locationData;

    // Workaround for accessing field named "class"
    const classOfLocation = location.class;

    const fullAddress = getFullAddress(address, display_name);

    const locationInfo = {
      lat,
      lon,
      full_address: fullAddress === address.country ? `Not found (code: ${address.country_code})` : fullAddress,
      name: display_name,
      type: getFullCategory(classOfLocation, category, type)
    };

    // update list of added locations:
    addedLocations = [...addedLocations, locationInfo];

    try {
      weatherData = await fetchWeatherData(selectedLocation);
    } catch (error) {
      console.error(error);
    }
  }

  onMount(async () => {
      loading = false;
  })

  $: console.dir("Weather data: ", weatherData);
</script>


{#if !loading}
  <main>
    <h1>{PAGE_TITLE}</h1>

    {#if addedLocations.length > 0}
      <button on:click={clearLocations} 
        class="remove-locations-btn"
        disabled={addedLocations.length === 0}
      >
        Remove All Locations
      </button>
    {/if}

    <LocationsList bind:locations={addedLocations} />

    <Map on:locationSelected={onMapClick} />
  </main>
{/if}

<style>
.remove-locations-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

.remove-locations-btn:hover {
  background-color: #d32f2f;
}

.remove-locations-btn:active {
  background-color: #b71c1c;
}

.remove-locations-btn:focus {
  outline: none;
}

.remove-locations-btn:disabled {
  background-color: #e0e0e0;
  color: rgba(0, 0, 0, 0.26);
  cursor: not-allowed;
}

.remove-locations-btn:disabled:hover {
  background-color: #e0e0e0;
}
</style>

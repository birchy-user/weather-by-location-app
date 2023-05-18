<script>
    export let locations = [];

    $: console.dir("Added locations: ", locations);
</script>

<div class="locations-list">
    {#each locations as location}
      <div class="location-card">
          <span>Latitude: {location.lat}</span>
          <span>Longitude: {location.lon}</span>
          <span>Type: {location.type}</span>
          <span>Address: {location.full_address}</span>
      </div>
    {/each}
  </div>
  
  <style>
    .locations-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      margin-bottom: 20px;
      overflow-y: scroll;
      max-height: 400px;
    }
  
    .location-card {
      padding: 1rem;
      background-color: #f1f1f1;
      border: 1px solid #ddd;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: start;
    }

    .location-card span {
        color: black;
    }
</style>
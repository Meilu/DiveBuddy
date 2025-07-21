<template>
  <v-container fluid style="height: 100vh; width: 100vw">
    <!-- Top row: map and sidebar -->
    <v-row style="height: 60%">
      <v-col cols="12" md="9">
        <LMap ref="map" :zoom="6" :max-zoom="18" :center="[47.21322, -1.559482]" :use-global-leaflet="true" style="height: 100%; width: 100%" @ready="onMapReady">
          <LTileLayer :url="openTopoMapUrl" :attribution="openTopoAttribution" layer-type="base" name="Topography" />
        </LMap>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="fill-height">
          <v-card-title>Dive Filters</v-card-title>
          <v-card-text>
            <!-- Add your filters here -->
            <v-select label="Country" dense clearable variant="outlined" />
            <v-select :items="['beginner', 'advanced', 'expert']" label="Level" dense clearable hide-details="auto" variant="outlined" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row style="height: 40%">
      <v-col cols="12">
        <v-card>
          <v-card-title>Dive Site Results</v-card-title>
          <template v-slot:text>
            <v-btn :disabled="isLoading" append-icon="mdi-refresh" text="Refresh" class="mb-5" variant="outlined"></v-btn>
            <v-text-field v-model="diveSitesSearchQuery" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details single-line></v-text-field>
          </template>
          
          <v-data-table :items="diveSites" :headers="headers" :search="diveSitesSearchQuery" v-model:page="diveSitesTablePage" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDiveSitesComposable } from "@/composables/useDiveSites.composable";

const { getDiveSites, diveSites, diveSitesSearchQuery, diveSitesTablePage } = useDiveSitesComposable();
const map = ref<any>(null);


const openTopoMapUrl = "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
const openTopoAttribution = "Map data © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)";

const isLoading = ref(true);
const headers = [
  { title: "Name", value: "name", sortable: true },
  { title: "Average Max Dept", value: "averageMaxDepth", sortable: true },
  { title: "Actions", value: "actions", sortable: false },
];

const onMapReady = async () => {
  await getDiveSites();
  await import("leaflet.markercluster");

  const locations = diveSites.value.map((site) => ({
    lat: site.lat,
    lng: site.lng,
    popup: `<b>${site.name}</b><br/>${site.country_iso3}`,
  }));

  useLMarkerCluster({
    leafletObject: map.value.leafletObject,
    markers: locations,
  });
};
</script>

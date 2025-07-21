
import { defineStore } from "pinia";
import _ from 'lodash';
import { ref } from "vue";
import type { IDiveSite } from "@shared/dist";

const STORAGE_KEY = 'diveSites';

export const useDiveSitesStore = defineStore(STORAGE_KEY, () => {
    const diveSites = ref<IDiveSite[]>([]);
    
    const diveSitesSearchQuery = ref<string>("");
    const diveSitesTablePage = ref<number>(0);

    const setDiveSites = (sites: IDiveSite[]) => {
        diveSites.value = _.sortBy(sites, 'name');
    };

    return {
        diveSites,
        diveSitesSearchQuery,
        diveSitesTablePage,
        setDiveSites
    };
}, {
    persist: {
        key: STORAGE_KEY
    },
})

import _ from 'lodash'
import { diveSitesService } from '~/services/diveSites.service'

export const useDiveSitesComposable = () => {
  const service = diveSitesService();
    const store = useDiveSitesStore();

  const { setDiveSites } = store;
  const { diveSites, diveSitesSearchQuery, diveSitesTablePage } = storeToRefs(store);
  
  const getDiveSites = async () => {
    try {
      const result = await service.getDiveSites()
      setDiveSites(result)
    } catch (error) {}
  }

  return {
    getDiveSites,
    diveSites,
    diveSitesSearchQuery,
    diveSitesTablePage
  }
}

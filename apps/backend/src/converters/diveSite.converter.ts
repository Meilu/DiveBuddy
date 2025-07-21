import type { DiveLevel, IDiveSite } from '@shared/dist';
import type { DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore';

const DIVE_LEVELS: DiveLevel[] = ['beginner', 'advanced', 'expert'];

export function firestoreDocToDiveSite(doc: QueryDocumentSnapshot<DocumentData>): IDiveSite {
  const data = doc.data();

  return {
    id: doc.id,
    name: data.name ?? '',
    lat: typeof data.lat === 'string' ? parseFloat(data.lat) : data.lat,
    lng: typeof data.lng === 'string' ? parseFloat(data.lng) : data.lng,
    averageMaxDepth: typeof data.averageMaxDepth === 'string' ? parseFloat(data.averageMaxDepth) : data.averageMaxDepth,
    averageDivetime: typeof data.averageDivetime === 'string' ? parseFloat(data.averageDivetime) : data.averageDivetime,
    averageVis: typeof data.averageVis === 'string' ? parseFloat(data.averageVis) : data.averageVis,
    level: Array.isArray(data.level)
      ? data.level
          .map((lvl: any) => String(lvl))
          .filter((lvl): lvl is DiveLevel => DIVE_LEVELS.includes(lvl as DiveLevel))
      : [],
    wildlife: Array.isArray(data.wildlife) ? data.wildlife.map((id: any) => Number(id)) : [],
    country_iso3: data.country_iso3 ?? '',
  };
}

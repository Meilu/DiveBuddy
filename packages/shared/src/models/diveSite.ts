export type DiveLevel = 'beginner' | 'advanced' | 'expert';

export interface IDiveSite {
  id: string;
  name: string;
  lat: number;
  lng: number;
  averageMaxDepth: number;
  averageDivetime: number;
  averageVis: number;
  level: DiveLevel[];
  wildlife: number[];
  country_iso3: string;
}

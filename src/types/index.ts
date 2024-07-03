export interface Prefecture {
  prefCode: number;
  prefName: string;
}

export interface PopulationComposition {
  boundaryYear: number;
  data: PopulationTrend[];
}

export interface PopulationTrend {
  label: string;
  data: PopulationData[];
}

export interface PopulationData {
  year: number;
  value: number;
  rate?: number;
}

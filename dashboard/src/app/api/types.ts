export type FeatureStatus = "high" | "low" | "newly" | "limited" | "unknown";

export interface FeatureData {
  status: {
    baseline?: FeatureStatus;
  };
}

export interface Report {
  summary: {
    widely: number;
    newly: number;
    limited: number;
    unknown: number;
    high: number;
    low: number;
    total: number;
  };
  properties: Record<string, { status: FeatureStatus }>;
}

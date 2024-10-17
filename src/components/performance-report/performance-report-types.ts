
type TPerformanceMetric = [string, IPerformanceMetricInfo];


interface IPerformanceMetricInfo {
 description: string;
 id: string;
 numericUnit: string;
 score: number;
 scoreDisplayMode: string;
 title: string;
 displayValue: string | number;
}


export type { IPerformanceMetricInfo, TPerformanceMetric };


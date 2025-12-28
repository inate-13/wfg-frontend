export interface CallDurationPoint {
  time: string;
  duration: number;
}

export interface SadPathItem {
  label: string;
  value: number;
}
export interface StoredCallData {
  email: string;
  data: CallDurationPoint[];
}

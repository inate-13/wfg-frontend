export interface CallDurationPoint {
  time: string;
  duration: number;
}

export interface SadPathItem {
  label: string;
  value: number;
  [key: string]: any;
}
export interface StoredCallData {
  email: string;
  data: CallDurationPoint[];
}


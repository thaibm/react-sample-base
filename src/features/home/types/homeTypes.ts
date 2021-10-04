export interface IEvent {
  bunting: boolean;
  date: string;
  notes: string;
  title: string;
  id: string | number;
}

export interface IBankHoliday {
  division: string;
  events: IEvent[];
}

export enum ERequestStatus {
  loading = 'loading',
  failed = 'failed',
  success = 'success',
}
export interface IHomeState {
  fetchHolidays: {
    bankHolidays: IBankHoliday[];
    status: ERequestStatus;
    errorMessage?: string;
  };
  submitHolidays: {
    status: ERequestStatus;
    errorMessage?: string;
  };
}

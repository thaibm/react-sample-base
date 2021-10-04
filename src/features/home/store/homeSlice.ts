import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from 'store/store';
import { fetchBankHolidays, submitBankHolidays } from '../api/homeApi';
import { IBankHoliday, IHomeState, ERequestStatus } from '../types/homeTypes';

const initialState: IHomeState = {
  fetchHolidays: {
    bankHolidays: [],
    status: ERequestStatus.loading,
    errorMessage: '',
  },
  submitHolidays: {
    status: ERequestStatus.success,
    errorMessage: '',
  },
};

export const fetchBankHolidaysAsync = createAsyncThunk('home/fetchBankHolidays', async () => {
  const res = await fetchBankHolidays();
  const bankHolidays: IBankHoliday[] = [];
  Object.keys(res.data).forEach((key) => {
    bankHolidays.push(res.data[key]);
  });
  bankHolidays.forEach((bankHoliday) => {
    bankHoliday.events.forEach((event) => {
      event.id = `${bankHoliday.division}-${event.date}`;
    });
  });
  return bankHolidays;
});

export const submitBankHolidaysAsync = createAsyncThunk(
  'home/submitBankHolidays',
  async (holidays: (string | number)[]) => {
    const res = await submitBankHolidays(holidays);
    return res.data;
  },
);

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBankHolidaysAsync.pending, (state) => {
        state.fetchHolidays.status = ERequestStatus.loading;
      })
      .addCase(fetchBankHolidaysAsync.fulfilled, (state, action) => {
        state.fetchHolidays.status = ERequestStatus.success;
        state.fetchHolidays.bankHolidays = action.payload;
      })
      .addCase(fetchBankHolidaysAsync.rejected, (state) => {
        state.fetchHolidays.status = ERequestStatus.failed;
        state.fetchHolidays.errorMessage = 'Failed to load Bank Holidays';
      })

      .addCase(submitBankHolidaysAsync.pending, (state) => {
        state.submitHolidays = {
          status: ERequestStatus.loading,
        };
      })
      .addCase(submitBankHolidaysAsync.fulfilled, (state) => {
        state.submitHolidays = {
          status: ERequestStatus.success,
        };
      })
      .addCase(submitBankHolidaysAsync.rejected, (state) => {
        state.submitHolidays = {
          status: ERequestStatus.failed,
          errorMessage: 'Failed to submit selected Bank Holidays',
        };
      });
  },
});

export const {} = homeSlice.actions;

export const selectFetchHolidays = (state: RootState) => state.home.fetchHolidays;
export const selectSubmitHolidays = (state: RootState) => state.home.submitHolidays;

export default homeSlice.reducer;

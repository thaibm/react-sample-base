import API from 'api/api';

export function fetchBankHolidays() {
  return API.get('/bank-holidays.json');
}

export function submitBankHolidays(holidays: (string | number)[]) {
  return API.post('/submit-bank-holidays', { holidays });
}

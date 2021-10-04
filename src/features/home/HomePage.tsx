import React, { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import HolidayTable from './components/HolidayTable/HolidayTable';
import {
  fetchBankHolidaysAsync,
  selectFetchHolidays,
  selectSubmitHolidays,
  submitBankHolidaysAsync,
} from './store/homeSlice';
import { Alert, CircularProgress, Container, Snackbar, Typography } from '@mui/material';
import { ERequestStatus, IEvent } from './types/homeTypes';
import { compact, head } from 'lodash';
import { GridCallbackDetails, GridRowId, GridSelectionModel } from '@mui/x-data-grid';
import { useStyles } from './Homepage.style';
import HolidayForm from './components/HolidayForm/HolidayForm';
import HolidayAction from './components/HolidayAction/HolidayAction';

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const fetchHolidays = useAppSelector(selectFetchHolidays);
  const submitHolidays = useAppSelector(selectSubmitHolidays);

  const [openToastNotification, setOpenToastNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [divisions, setDivisions] = useState<string[]>([]);
  const [selectedDivision, setSelectedDivision] = useState('');

  const [selectedHolidays, setSelectedHolidays] = useState<GridRowId[]>([]);

  useEffect(() => {
    dispatch(fetchBankHolidaysAsync());
  }, [dispatch]);

  useEffect(() => {
    const listYears: number[] = [];
    const listDivisions: string[] = [];
    fetchHolidays.bankHolidays.forEach((bankHoliday) => {
      bankHoliday.events.forEach((event) => {
        const year = new Date(event.date).getFullYear();
        if (!listYears.includes(year)) {
          listYears.push(year);
        }
      });

      if (!listDivisions.includes(bankHoliday.division)) {
        listDivisions.push(bankHoliday.division);
      }
    });

    setYears(listYears);
    setDivisions(listDivisions);
    setSelectedDivision(head(listDivisions) || '');
  }, [fetchHolidays.bankHolidays]);

  useEffect(() => {
    if (submitHolidays.status === ERequestStatus.failed && submitHolidays.errorMessage) {
      setOpenToastNotification(true);
      setErrorMessage(submitHolidays.errorMessage);
    }
  }, [submitHolidays.status, submitHolidays.errorMessage]);

  useEffect(() => {
    if (fetchHolidays.status === ERequestStatus.failed && fetchHolidays.errorMessage) {
      setOpenToastNotification(true);
      setErrorMessage(fetchHolidays.errorMessage);
    }
  }, [fetchHolidays.status, fetchHolidays.errorMessage]);

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleDivisionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDivision(event.target.value);
  };

  const onSelectionModelChange = (
    selectionModel: GridSelectionModel,
    details: GridCallbackDetails,
  ) => {
    setSelectedHolidays(selectionModel);
  };

  const onSubmitHolidays = () => {
    if (selectedHolidays.length) {
      dispatch(submitBankHolidaysAsync(selectedHolidays));
    }
  };

  const tableRows: IEvent[] = useMemo(() => {
    const events: IEvent[] =
      fetchHolidays.bankHolidays.find((bh) => bh.division === selectedDivision)?.events ||
      ([] as IEvent[]);
    const rows = compact(
      events?.map((event) => {
        const eventYear = new Date(event.date).getFullYear();
        if (eventYear === selectedYear) {
          return event;
        }
      }),
    );
    return rows;
  }, [fetchHolidays.bankHolidays, selectedDivision, selectedYear]);

  if (fetchHolidays.status === ERequestStatus.loading) {
    return (
      <Container className={classes.container}>
        <CircularProgress></CircularProgress>
      </Container>
    );
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h1" align="left" marginBottom="2rem">
        Bank Holiday
      </Typography>

      <Snackbar
        open={openToastNotification}
        autoHideDuration={5000}
        onClose={() => {
          setOpenToastNotification(false);
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>

      <HolidayForm
        years={years}
        selectedYear={selectedYear}
        handleYearChange={handleYearChange}
        divisions={divisions}
        selectedDivision={selectedDivision}
        handleDivisionChange={handleDivisionChange}
      />

      <HolidayTable rows={tableRows} onSelectionModelChange={onSelectionModelChange} />

      <HolidayAction
        bankHolidays={fetchHolidays.bankHolidays}
        selectedDivision={selectedDivision}
        submitHolidayStatus={submitHolidays.status}
        selectedHolidays={selectedHolidays}
        onSubmitHolidays={onSubmitHolidays}
      />
    </Container>
  );
};

export default HomePage;

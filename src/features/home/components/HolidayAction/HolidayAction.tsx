import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Box } from '@mui/system';

import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ERequestStatus, IBankHoliday } from 'features/home/types/homeTypes';

const useStyles = makeStyles((theme: Theme) => ({
  actionWrapper: {
    marginTop: '1.5rem',
  },
}));

interface IProps {
  selectedHolidays: (string | number)[];
  submitHolidayStatus: ERequestStatus;
  bankHolidays: IBankHoliday[];
  selectedDivision: string;
  onSubmitHolidays: () => void;
}

export default function HolidayAction({
  selectedHolidays,
  submitHolidayStatus,
  bankHolidays,
  selectedDivision,
  onSubmitHolidays,
}: IProps) {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="flex-end" className={classes.actionWrapper}>
      <Button
        variant="outlined"
        onClick={() => {
          setOpenConfirmDialog(true);
        }}
        disabled={!selectedHolidays.length}
      >
        {submitHolidayStatus === ERequestStatus.loading ? (
          <CircularProgress size={24}></CircularProgress>
        ) : (
          'Submit'
        )}
      </Button>

      <Dialog
        open={openConfirmDialog}
        onClose={() => {
          setOpenConfirmDialog(false);
        }}
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          {bankHolidays
            .find((bh) => bh.division === selectedDivision)
            ?.events.filter((event) => selectedHolidays.includes(event.id))
            .map((event) => (
              <DialogContentText key={event.id}>
                {event.title} - {event.date}
              </DialogContentText>
            ))}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenConfirmDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSubmitHolidays();
              setOpenConfirmDialog(false);
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

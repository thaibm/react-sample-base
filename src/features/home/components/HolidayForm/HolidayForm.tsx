import React from 'react';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  selectionWrapper: {
    marginBottom: '1rem',
  },
});

interface IProps {
  selectedYear: number;
  handleYearChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  years: number[];
  selectedDivision: string;
  handleDivisionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  divisions: string[];
}

export default function HolidayForm({
  years,
  selectedYear,
  handleYearChange,
  selectedDivision,
  handleDivisionChange,
  divisions,
}: IProps) {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.selectionWrapper}>
      <Grid item xs={6}>
        <TextField
          fullWidth
          select
          label="Select Year"
          value={selectedYear}
          onChange={handleYearChange}
          size="small"
          variant="standard"
        >
          {years.map((year: number) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          select
          label="Select Division"
          value={selectedDivision}
          onChange={handleDivisionChange}
          size="small"
          variant="standard"
        >
          {divisions.map((division: string) => (
            <MenuItem key={division} value={division}>
              {division}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
}

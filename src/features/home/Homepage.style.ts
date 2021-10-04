import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
}));

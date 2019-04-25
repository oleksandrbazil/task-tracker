import { createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import indigo from '@material-ui/core/colors/indigo';

const white = '#FFFFFF';
const milWhite = '#fdfdfd';
const lightblue = '#eaf6ff';

export default createMuiTheme({
  palette: {
    primary: indigo,
  },
  overrides: {
    MuiInput: {
      underline: {
        color: indigo['900'],
      },
    },
    MuiButton: {
      text: {
        backgroundColor: white,
        borderRadius: 5,
        boxShadow:
          '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
        color: indigo['900'],

        '&:hover': {
          backgroundColor: indigo['900'],
          color: white,
        },
      },
    },
    MuiAppBar: {
      root: {
        backgroundColor: cyan['600'],
      },
    },
    MuiTableHead: {
      root: {
        backgroundColor: milWhite,
      },
    },
    MuiTableBody: {
      root: {
        backgroundColor: lightblue,
      },
    },
    MuiTableCell: {
      root: {
        color: indigo['900'],
      },
    },
  },
  typography: {
    useNextVariants: true,
  },
});

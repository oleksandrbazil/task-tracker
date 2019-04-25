import React from 'react';
import AppRoutes from './routes';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import './App.css';

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Grid container spacing={24} justify={'center'}>
          <Grid item xs={10}>
            <AppRoutes />
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}

export default App;

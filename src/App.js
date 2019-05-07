import React from 'react';
import AppRoutes from './pages/AppRoutes';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import ModalMessage from './components/ModalMessage';
import './App.css';

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Grid container justify={'center'}>
          <Grid item xs={10}>
            <ModalMessage />
            <AppRoutes />
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}

export default App;

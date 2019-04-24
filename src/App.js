import React from 'react';
import AppRoutes from './routes';
import Grid from '@material-ui/core/Grid';
import './App.css';

function App() {
  return (
    <div className="App">
      <Grid container spacing={24} justify={'center'}>
        <Grid item xs={10}>
          <AppRoutes />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

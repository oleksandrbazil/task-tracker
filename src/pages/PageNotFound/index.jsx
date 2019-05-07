import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h1">404</Typography>
      <Button component={Link} to="/" color="secondary">
        to Homepage
      </Button>
      <Typography variant="h6">Page not found</Typography>
    </div>
  );
};

export default Index;

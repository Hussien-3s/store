import React from 'react';
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';

const FullPageLoading = () => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, flexDirection: 'column', gap: 2 }}
      open={true}
    >
      <CircularProgress color="inherit" size={60} thickness={4} />
      <Typography variant="h6" component="div">
        loading...
      </Typography>
    </Backdrop>
  );
};

export default FullPageLoading;
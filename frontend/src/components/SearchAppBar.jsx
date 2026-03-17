import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SelectedListItem from './SelectedListItem'
import { useState } from 'react';
import "../css/App.css";

export default function SearchAppBar() {
  const [ nav, setNav ] = useState(false)

  const openNav = () => {
    if (nav == false) {
      setNav(true)
    }else {
      setNav(false)
    }
  }

  return (
  <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: '#7F5539', zIndex: 1400, position:"fixed" }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={openNav}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Store
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    {nav && (
      <SelectedListItem sx={{
      width: '300px',
      position: 'fixed',
      top: '64px',
      left: 0,
      height: 'calc(100vh - 64px)',
      zIndex: 1300,
      backgroundColor: '#7F5539',
      color:"white",
      float: 'none',
    }}/>
    )}
  </>
  );
}
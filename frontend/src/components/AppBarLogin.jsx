import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import "../css/App.css";

export default function AppBarLogin() {
  return (
  <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: '#7F5539', zIndex: 1400 }} position="static">
        <Toolbar>
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
  </>
  );
}
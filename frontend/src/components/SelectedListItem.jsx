import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

export default function SelectedListItem({ sx }) {

  const navigate = useNavigate();

  return (
    <Box sx={{ 
      maxWidth: 400,
      ...sx
    }}>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton  onClick={() => {navigate('/store')}}>
          <ListItemText primary="Store" />
        </ListItemButton>
          <Divider />
        <ListItemButton  onClick={() => {navigate('/cart')}}>
          <ListItemText primary="Cart" />
        </ListItemButton>
          <Divider />
        <ListItemButton  onClick={() => {navigate('/account')}}>
          <ListItemText primary="account" />
        </ListItemButton>
        <ListItemButton  onClick={() => {navigate('/')}}>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton  onClick={() => {navigate('/logout')}}>
          <ListItemText primary="logout" />
        </ListItemButton>
      </List>
    </Box>
  );
}
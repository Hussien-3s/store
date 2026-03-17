import {
  Box,
  Grid,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  Container,
} from '@mui/material';
import SearchAppBar from './components/SearchAppBar'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PublicIcon from '@mui/icons-material/Public';
import TranslateIcon from '@mui/icons-material/Translate';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const accentColor = '#7F5539';

const InfoCard = ({ title, value, icon }) => (
  
  <Card
    sx={{
      borderRadius: '16px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
      border: '1px solid #eee',
      height: '100%',
      flex: '1 1 0',
      minWidth: { xs: '100%', sm: '250px' },
    }}
  >
    <CardContent
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        p: '24px !important',
      }}
    >
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#555', mt: 0.5 }}>
          {value}
        </Typography>
      </Box>
      <Box sx={{ color: accentColor }}>{icon}</Box>
    </CardContent>
  </Card>
);

export default function Account() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([])

  useEffect(() => {
  if (!window.localStorage.getItem('token')) {
      navigate('/login');
    }

  const res = async () => {
    const token = window.localStorage.getItem("token");

    const cleanToken = JSON.parse(token)

    const res = await axios.get('http://localhost:8080/store', {
      headers: { 'Authorization': `Bearer ${cleanToken}` }
    });

    setProducts(res.data.user)
  } 

  res()

  }, [navigate]);

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '90vh', pb: 10 }}>
      <SearchAppBar/>
      <Container
        maxWidth="lg"
        sx={{
          py: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a1a1a' }}>
          Store Account
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: accentColor,
            borderRadius: '12px',
            textTransform: 'none',
            px: 3,
            fontWeight: 600,
            '&:hover': { bgcolor: '#d95a1e' },
          }}
        >
          Sign out
        </Button>
      </Container>

      <Container maxWidth={false} sx={{ mt: 5, width:1500 }}>
        <Grid container spacing={6} sx={{ alignItems: 'flex-start' }}>
          <Grid item xs={12} sm={4} md={3}>
            <Box sx={{ mb: 4 }}>
              <Avatar
                sx={{
                  width: 96,
                  height: 96,
                  mb: 2,
                  bgcolor: '#E0E0E0',
                  flexShrink: 0,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                {products.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#757575' }}>
                {products.email}
              </Typography>
            </Box>

            <List component="nav" disablePadding>
              <ListItem sx={{ p: 0, mb: 2 }}>
                <Typography
                  sx={{
                    color: accentColor,
                    fontWeight: 700,
                    fontSize: '1rem',
                  }}
                >
                  Personal Information
                </Typography>
              </ListItem>
              {['Billing & Payments', 'Order History', 'Gift Cards'].map((text) => (
                <ListItem key={text} sx={{ p: 0, mb: 2 }}>
                  <Typography
                    sx={{
                      color: '#1a1a1a',
                      cursor: 'pointer',
                      '&:hover': { color: accentColor },
                    }}
                  >
                    {text}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} sm={8} md={9}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, mb: 1, color: '#1a1a1a' }}
            >
              Personal information
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                p: 2,
                mb: 5,
                maxWidth: '560px',
                bgcolor: '#f8f9fa',
                borderRadius: '12px',
                borderLeft: '4px solid ' + accentColor,
              }}
            >
              <Typography variant="body1" sx={{ color: '#555' }}>
                Manage your personal information, including phone numbers and
                email address where you can be contacted
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
              }}
            >
              <InfoCard
                title="Name"
                value={products.name}
                icon={<PersonOutlineIcon fontSize="medium" />}
              />
              <InfoCard
                title="Date of Birth"
                value="07 July 1993"
                icon={<CalendarTodayIcon fontSize="medium" />}
              />
              <InfoCard
                title="Phone"
                value={products.phone}
                icon={<PublicIcon fontSize="medium" />}
              />
              <InfoCard
                title="Contactable at"
                value={products.email}
                icon={<EmailOutlinedIcon fontSize="medium" />}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

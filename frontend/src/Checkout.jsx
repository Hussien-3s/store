import SearchAppBar from './components/SearchAppBar'
import CheckoutCard from './components/CheckoutCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import './css/Store.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import customTheme from './theme/input-theme'

export default function Checkout() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([])
  const [email, setEmail] = useState([])
  const [info, setInfo] = useState([])
  const outerTheme = useTheme();

  useEffect(() => {
  if (!window.localStorage.getItem('token')) {
      navigate('/login');
    }

  const res = async () => {
    const token = window.localStorage.getItem("token");

    const cleanToken = JSON.parse(token)

    const res = await axios.get('http://localhost:8080/showCart', {
      headers: { 'Authorization': `Bearer ${cleanToken}` }
    });

    const email = await axios.get('http://localhost:8080/store', {
      headers: { 'Authorization': `Bearer ${cleanToken}` }
    });

    const reqInfo = await axios.get('http://localhost:8080/checkout-info', {headers: { 'Authorization': `Bearer ${cleanToken}` }});

    setProducts(res.data)
    setEmail(email.data)
    setInfo(reqInfo.data.data)
  } 

  res()

  }, [navigate]);

  const cards = products.map((e) => {
    return <CheckoutCard productId={e.productId} key={e.productId} images={e.image} name={e.name} price={e.price} />
  })

  const checkout = async () => {
    await axios.post('http://localhost:8080/checkout', {
      email:email.user.email,
      code:"123"
    })

    navigate("/cart")
  }

  return (
    <>
    <SearchAppBar/>
      <Container sx={{width:2000}}>
        <div className='checkout'>
          <div className='cart'>
            {cards}
          </div>
          <div className='checkout-box'>
            <Box>
              <h4>SUMMARY</h4>
              <div className='info'>
                <div><p>Offer Code</p><p>0$</p></div>
                <div><p>Delivery</p><p>{`${info.delivery}$`}</p></div>
                <div><p>Total</p><p>{`${info.price}$`}</p></div>
              </div>
              <div className='checkout-button'>
                <ThemeProvider theme={customTheme(outerTheme)}>
                  <TextField sx={{marginTop:1.5, borderColor:"#7F5539"}} id="outlined-basic" label="Code" variant="outlined" />
                </ThemeProvider>
                <Button onClick={checkout} sx={{width:328, height:70, marginTop:1.5, backgroundColor:"#7F5539"}} variant="contained">Checkout</Button>
              </div>
            </Box>
          </div>
        </div>
      </Container>
    </>
  )
}
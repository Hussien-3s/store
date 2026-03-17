import SearchAppBar from './components/SearchAppBar'
import CartCard from './components/CartCard'
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import './css/Store.css'


export default function Cart() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([])
  const [showAlert, setshowAlert] = useState(false)

  const removeFromState = (id) => {
    setProducts((prev) => prev.filter(item => item.productId !== id));
  };

  const toCheckOut = async () => {
  try {
      const token = window.localStorage.getItem("token");
      const cleanToken = JSON.parse(token)
      const res = await axios.get('http://localhost:8080/cart-is-empty', {
        headers: { 'Authorization': `Bearer ${cleanToken}` }
      });

      if (res.status === 200) {
        navigate('/cart/checkout')
      }
    } catch {
      setshowAlert(true);
      
      setTimeout(() => {
        setshowAlert(false);
      }, 6000);
    }
  }

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

    setProducts(res.data)
  } 

  res()

  }, [navigate]);

  const cards = products.map((e) => {
    return <CartCard onRemove={removeFromState} productId={e.productId} key={e.productId} images={e.image} name={e.name} price={e.price} />
  })

  return (
    <>
      <SearchAppBar/>
      <Container maxWidth={false} style={{width:'1850px', paddingTop:'30px'}}>
        <h1 style={{paddingTop:55}}>Your Daily Dose</h1>
        <div style={{padding:"20px", display:'flex', flexWrap:"wrap"}}>
          {cards}
        </div>
      </Container>
      <Button onClick={toCheckOut} style={{position:"relative", top:"160px", left:"60px",width: "200px", height:"50px", borderRadius:"30px", backgroundColor: '#7F5539'}} variant="contained">Checkout</Button>
      {showAlert && <Alert sx={{width:400, position: "fixed", bottom: "-1px", left: "-2px"}} variant="filled" severity="error">The cart is empty</Alert>}
    </>
  );
}
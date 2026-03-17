import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import customTheme from './theme/input-theme'
import './css/Registar.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axios from 'axios';

export default function Registar() {
const outerTheme = useTheme();
const [registarData, setRegistarData] = useState({})
const [showAlert, setshowAlert] = useState(false)
const navigate = useNavigate();

const registar = async () => {
  if (isNaN(registarData.phone)) {
    setshowAlert(true)
      setTimeout(() => {
        setshowAlert(false)
      }, 6000)
  }else {
    try {
      await axios.post('http://localhost:8080/regstir', registarData)
      navigate('/')
    }catch (err) {
      console.log(err)
    }
  }
}

const phone = (e) => {
  const value = Number(e.target.value)
  setRegistarData({...registarData, phone:value})
}

const youHaveAccount = () => {
  navigate("/login")
}

  return (
    <>
      <div className='containers'>
        <div className='image'>
        </div>
        <div className='inputs'>
          <Container sx={{display:"flex", justifyContent:"center", height:"100vh", flexDirection:"column"}} maxWidth="sm">
            <h1 className="store-name">Store</h1>
            <Box className='box'>
              <ThemeProvider theme={customTheme(outerTheme)}>
                <div className="login">
                  <h6>Sign up</h6>
                  <Button onClick={youHaveAccount} variant="text">Login</Button>
                </div>
                <div class="div-input">
                  <TextField onChange={(e) => {setRegistarData({...registarData, name:e.target.value})}} id="outlined-basic" label="Username" variant="outlined" />
                  <TextField onChange={(e) => {setRegistarData({...registarData, password:e.target.value})}} id="outlined-basic" label="Password" variant="outlined" />
                  <div class="info">
                    <TextField onChange={phone} id="outlined-basic" label="Phone" variant="outlined" />
                    <TextField onChange={(e) => {setRegistarData({...registarData, email:e.target.value})}} id="outlined-basic" label="Email" variant="outlined" />
                  </div>
                </div>
                <div class="div-button">
                  <Button onClick={registar} class="button" variant="contained">Sign up</Button>
                </div>
              </ThemeProvider>
            </Box>
          </Container>
        </div>
      </div>
      {showAlert && <Alert sx={{width:400, position: "fixed", bottom: "-1px", left: "-2px"}} variant="filled" severity="warning">Phone must be correct</Alert>}
    </>
  );
}
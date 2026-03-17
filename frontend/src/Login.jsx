import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import customTheme from './theme/input-theme'
import './css/App.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';
import { Container } from '@mui/material';


export default function Login() {
const outerTheme = useTheme();
const [loginData, setLoginData] = useState({})
const [showAlert, setshowAlert] = useState(false)
const navigate = useNavigate();

  const loginEmail = (e) => {
    setLoginData({...loginData, email:e.target.value})
  }

  const loginPass = (e) => {
    setLoginData({...loginData, password:e.target.value})
  }

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      navigate('/store');
    }
  }, [navigate])

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:8080/login', loginData)

      if (res) {
        window.localStorage.setItem("token", JSON.stringify(res.data.token))
        navigate('/store');
      }
    } catch {
      setshowAlert(true)

        setTimeout(() => {
          setshowAlert(false)
        }, 6000)
    }
  }

  const youHaveAccount = () => {
    navigate("/registar")
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
                  <h6>log in</h6>
                  <Button onClick={youHaveAccount} variant="text">Sign up</Button>
                </div>
                <div className="div-input">
                  <TextField onChange={loginEmail} id="outlined-basic" label="Email" variant="outlined" />
                  <TextField onChange={loginPass} id="outlined-basic" label="Password" variant="outlined" />
                </div>
                <div className="div-button">
                  <Button onClick={login} class="button" variant="contained">Login</Button>
                </div>
              </ThemeProvider>
            </Box>
          </Container>
        </div>
      </div>
      {showAlert && <Alert sx={{width:400, position: "fixed", bottom: "-1px", left: "-2px"}} variant="filled" severity="error">Email or Password is incorrect</Alert>}
    </>
  );
}
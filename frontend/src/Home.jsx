import './css/Home.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const [islogin, setIsLogin] = useState(true)

  useEffect(() => {
    function islogincheck() {
      if (window.localStorage.getItem('token')) {
        setIsLogin(false)
      }
    }

    islogincheck()
  }, [navigate])


  return (
    <div className='home-page-wrapper'>
      <div className='flex'>
          <div className='app-bar'>
        <div className='social'>
          <FacebookIcon className='icon'/>
          <TwitterIcon className='icon'/>
          <InstagramIcon className='icon'/>
        </div>
        <div className='bar'>
          <h3>About</h3>
          <h3>Store</h3>
          <h3>Welcome</h3>
        </div>
        <div className='login'>
          {islogin && <Button onClick={() => {navigate('/login')}} style={{color:"white", borderColor:"white"}} variant="outlined">login</Button>}
        </div>
      </div>
      <div className='about'>
        <div className='welcome'>
          <span className='line-left'></span>
          <p>WELCOME TO HOME PAGE</p>
          <span className='line-right'></span>
        </div>
        <div className='welcome-word'>
          <p>A Cup of Insepiration</p>
          <p>to Make Your Day</p>
        </div>
        <div className='store-button'>
          <Button onClick={() => {navigate('/store')}} style={{color:"white", borderColor:"white", backgroundColor:"#ffffff00"}} variant="outlined">Store</Button>
        </div>
      </div>
      </div>
    </div>
  );
}
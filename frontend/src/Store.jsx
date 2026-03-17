import SearchAppBar from './components/SearchAppBar'
import ImgMediaCard from './components/ImgMediaCard'
import FullPageLoading from './components/FullPageLoading'
import Container from '@mui/material/Container';
import './css/Store.css'
// import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';



export default function Store() {

const fetchStore = async () => {
  const res = await axios.get("http://localhost:8080/showStore");
  return res.data;
};

const { data, isLoading, error, isError } = useQuery({
    queryKey: ['storeData'], 
    queryFn: fetchStore,
    staleTime: 1000 * 60 * 5, 
  });

  if (isLoading) return <FullPageLoading/>;
  if (isError) return <div>{error.message}</div>;

  const cards = data.map((e) => {
    return <ImgMediaCard key={e.productId} productId={e.productId} images={e.image} name={e.name} price={e.price} />
  })

  return (
    <>
      <SearchAppBar/>
      <div className='store-page'>
          <div className='title'>
            <div className='welcome-space'>
              <span className='line-left'></span>
              <p>WELCOME TO STORE PAGE</p>
              <span className='line-right'></span>
            </div>
            <div className='welcome-word'>
              <p>A Cup of Insepiration</p>
              <p>to Make Your Day</p>
            </div>
        </div>
      </div>
      <Container maxWidth={false} style={{width:'1850px', paddingTop:'30px'}}>
        <h1>Store</h1>
        <div style={{padding:"20px", display:'flex', flexWrap:"wrap"}}>
          {cards}
        </div>
      </Container>
    </>
  );
}
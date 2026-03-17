import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';


export default function ImgMediaCard({images, name, price, productId}) {
  const addToCart = async () => {
    const token = JSON.parse(window.localStorage.getItem('token')) 
    await axios.patch('http://localhost:8080/addToCart', {token:token, productId:productId}).catch((err) => {console.log(err)})
  }

  return (
    <Card sx={{ maxWidth: 402, color:"black", margin:2.4 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="500"
        image={images}
      />
      <CardContent >
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography component="div" variant="body2" sx={{ width:400 }}>
          <div>
            <div>
              {`$ ${price}`}
            </div>
            <div>
              <IconButton onClick={addToCart} sx={{color:"black", padding:0, paddingTop:1}} aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>
            </div>
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
}

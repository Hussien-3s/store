import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';


export default function CartCard({images, name, price, productId, onRemove}) {
const deleteFromCart = async () => {
    try {
      const token = JSON.parse(window.localStorage.getItem('token'));
      
      await axios.patch('http://localhost:8080/deleteFromCart', { 
        token: token, 
        productId: productId 
      });

      onRemove(productId);
      
    } catch (err) {
      console.log("Error deleting item:", err);
    }
  };

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
              <IconButton onClick={deleteFromCart} sx={{color:"black", padding:0, paddingTop:1}} aria-label="delete">
                <RemoveShoppingCartIcon />
              </IconButton>
            </div>
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
}

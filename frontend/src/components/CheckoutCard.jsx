import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



export default function CheckoutCard({images, name, price}) {

  return (
    <Card sx={{ display: 'flex', flexDirection: 'row-reverse', margin:2, justifyContent:'space-between' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', width:1500 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            {`$ ${price}`}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 250 }}
        image={images}
        alt="Live from space album cover"
      />
    </Card>
  );
}

import { HashRouter as Router, Routes, Route } from 'react-router-dom'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './Login';
import Registar from './Registar';
import Store from './Store';
import Account from './Account'
import Cart from './Cart';
import Logout from './Logout';
import Home from './Home';
import Checkout from './Checkout';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registar" element={<Registar/>} />
        <Route path="/store" element={<Store />} />
        <Route path="/account" element={<Account />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<Checkout />} />
      </Routes>
    </QueryClientProvider>
  );
}
export default App;
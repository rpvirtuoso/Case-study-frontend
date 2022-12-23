import { Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Login from './pages/login';
import Signup1 from './pages/Signup1';
import Products from './pages/Products';
import OrderHistory from './pages/OrderHistory';
import Cart from './pages/Cart';
import ProfilePage2 from './pages/ProfilePage2';
import UpdateProfile from './pages/UpdateProfile';
import Box from '@mui/material/Box/Box';
import Admin from './pages/Admin';
import ModifyProduct from './pages/ModifyProduct';
import Addproduct from './pages/Addproduct';
function App() {
  return (
    <Box>
      {/* <MuiTypography/> */}
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup1/>}/>
          <Route path='/products/:productId' element={<Products/>}/>
          <Route path='/profile' element ={<ProfilePage2/>}/>
          <Route path='/updateProfile' element ={<UpdateProfile/>}/>

          <Route path='/orderhistory' element ={<OrderHistory/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/modifyproduct" element={<ModifyProduct/>}/>
          <Route path="/addproduct" element={<Addproduct/>}/>



      </Routes>
    </Box>
  );
}

export default App;

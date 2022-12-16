import { Route, Routes } from 'react-router-dom';
import Muinavbar from './components/Muinavbar';
import Home  from './pages/Home';
import Login from './pages/login';
import Signup from './pages/Signup';
import Signup1 from './pages/Signup1';
import Signup2 from './pages/Signup2';
import Products from './pages/Products';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import Cart from './pages/Cart';
import ProfilePage from './pages/ProfilePage';
import ProfilePage2 from './pages/ProfilePage2';
import UpdateProfile from './pages/UpdateProfile';
function App() {
  return (
    <div >
      {/* <MuiTypography/> */}
      <Routes>
          <Route path="/" element={<Muinavbar/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signup1' element={<Signup1/>}/>
          <Route path='/signup2' element={<Signup2/>}/>
          <Route path='/products/:productId' element={<Products/>}/>
          <Route path='/update-profile' element ={<Profile/>}/>
          <Route path='/profile2' element ={<ProfilePage/>}/>
          <Route path='/profile' element ={<ProfilePage2/>}/>
          <Route path='/updateProfile' element ={<UpdateProfile/>}/>

          <Route path='/orderhistory' element ={<OrderHistory/>}/>
          <Route path='/cart' element={<Cart/>}/>

      </Routes>
    </div>
  );
}

export default App;

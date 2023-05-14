import { SingleProduct } from './pages/SingleProduct';
import { Cart } from './pages/Cart';
import {Home} from './pages/Home';
import { ProductList } from './pages/ProductList';
import {Route, Routes} from "react-router-dom";
import Success from './components/Payment/Success';
import Profile from './pages/Profile';
import WishList from './pages/WishList';
import NotFound from './pages/NotFound';
export default function PageRouter() {
  return (
    <Routes >
        <Route path='/' element={<Home/>}/>
        <Route path='/products/:category' element={<ProductList/>}/>
        <Route path='/product/:id' element={<SingleProduct/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/userprofile' element={<Profile/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/wishlist' element={<WishList/>}/>
        <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

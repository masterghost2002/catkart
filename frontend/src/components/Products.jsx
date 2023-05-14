import styled from 'styled-components';
import { Product } from './Product';
import { mobile } from '../responsive';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../requestMethods';
import CatLoader from './CatLoader';
import { userRequest } from '../requestMethods';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addItemToWishList,removeFromWishList } from '../store/userSlice';
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    ${mobile({ padding: "0px" })}
`
export const Products = ({ categorie, filters, sort }) => {
  const [products, setProducts] = useState();
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const user = useSelector(state=>state.user.currentUser);
  const dispatch = useDispatch();

  /* ################ work flow
    work flow for add to wishlist and remove from wishlit
    1. when user logged in
      -> the /api/auth will send the whole userInfo including populate wishlist which will going to be stored in
        user slice which we have used here to render your wishlist data

    why used useEffect then?
      supposed the user have two devices where he logged in his id.
        now he added a product to wishlist from mobile,and the aftersome time went to pc to check the wishlist, in this case
        we have to fetch the whole wishlist from the db, now after fetching we updated it,if there is some changes from current wishlist
        of pc then react will rerender the component else not
        hence overall inc the userexperience and speed

    now what the funda of dispatch(add) then api call then if error remove from slice
    as we now api request took some time and our crousoius user want updates in milli sec
      to we first add the product in slice then made a api call, suppose the api request failed
      then in catch block we removed the porduct from the slice

  */
  const addToWishList = async (product)=>{ 
    dispatch(addItemToWishList(product));
    try {
      await userRequest.post(`/user/wishlist/${product._id}`);
    } catch (error) {
        console.log(error);
        dispatch(removeFromWishList({_id:product._id}));
    }
  }
  const removeItemFromWishList = async (product)=>{
    dispatch(removeFromWishList({_id:product._id}));
    try {
        await userRequest.delete(`/user/wishlist/${product._id}`);
    } catch (error) {
        console.log(error);
        dispatch(addItemToWishList(product));
    }
}
  // use effect for fetch
  useEffect(() => {
    /* why using local storage?
      // performance inc steps first add the products to localstorage
      // if again the user come to prouct section it will not show loader
      //  then it make a api call and fetch the products from db if there 
      // are some new data products in the res.data then it will get updated in state
      //  and react rerender the component as there is change in the state
    */
    

    const productFromStorage = JSON.parse(localStorage.getItem("products") || '[]');
    if(productFromStorage.length>0)
      setProducts(productFromStorage);

    const getProducts = async () => {
      setSpinner(productFromStorage.length === 0);
      const url = (categorie && categorie !== 'all') ? `${BASE_URL}/products?category=${categorie}` : `${BASE_URL}/products`;
      try {
        const res = await axios.get(url);
        setProducts(res.data);
        localStorage.setItem('products', JSON.stringify(res.data));
        setSpinner(false);
      } catch (error) {
        setMessage(error.message);
        setError(true);
        console.log(error);
      }
      
    }
    getProducts();
  }, [categorie]);
  // use effect for filtered products
  useEffect(() => {
    products && categorie && setfilteredProducts(
      products.filter(item => Object.entries(filters).every(
        ([key, value]) => item[key].includes(value)
      ))
    )
  }, [products, filters, categorie]);

  // use effect for sort
  useEffect(() => {
    if (setfilteredProducts !== undefined) {
      if (sort === "newest") {
        setfilteredProducts((prevState) =>
          [...prevState].sort((a, b) => a.createdAt - b.createdAt)
        );
      }
      else if (sort === "asc") {
        setfilteredProducts((prevState) =>
          [...prevState].sort((a, b) => a.price - b.price)
        );
      }
      else {
        setfilteredProducts((prevState) =>
          [...prevState].sort((a, b) => b.price - a.price)
        );
      }
    }
  }, [sort]);


  return (
    <Container>
      {
        spinner?
        <CatLoader 
          styling={{width:'100vw'}}
          text={message}
          error = {error}
        />
        :(categorie ? filteredProducts.map((item) =>
        <Product key={item._id} item={item}addToWishList={addToWishList} 
          removeItemFromWishList={removeItemFromWishList}
          inWishList = {(user && user.wishlist && user.wishlist.some(ele=>ele._id === item._id))}  
        />)
        : products &&  products.slice(0,8).map((item) =>
          <Product 
            key={item._id} 
            item={item} 
            addToWishList={addToWishList} 
            removeItemFromWishList={removeItemFromWishList}
            inWishList = {(user && user.wishlist && user.wishlist.some(ele=>ele._id === item._id))} 
          />
        ))
      }
    </Container>
  )
}

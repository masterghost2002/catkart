import React from 'react';
import {Slider} from '../components/Slider';
import { Categories } from '../components/Categories';
import { Products } from '../components/Products';
export const Home = () => {
  return (
    <>
        <Slider/>
        <Categories/>
        <Products/>
    </>
  )
}

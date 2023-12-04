import React from 'react'
import pinguino1 from '../../assets/images/pinguino1.jpg';
import pinguino2 from '../../assets/images/pinguino2.jpeg';
import perro1 from '../../assets/images/perro1.jpg';
import SliderComponent from '../SliderComponent/SliderComponent';
import './Products.scss';

export const Products = () => {
  const images = [pinguino1, perro1, pinguino2];

  return (
    <div className='products-box'>
      <SliderComponent images={images}/>
    </div>
  )
}

export default Products
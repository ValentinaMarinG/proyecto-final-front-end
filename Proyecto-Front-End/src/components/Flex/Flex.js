import React from 'react'
import perro1 from '../../assets/images/perro1.jpg';
import perro2 from '../../assets/images/perro2.jpg';
import SliderComponent from '../SliderComponent/SliderComponent';
import './Flex.scss';

export const Flex = () => {
  const images = [perro1, perro2]
  return (
    <div className='flexx-box'>
       <SliderComponent images={images}/>
    </div>
  )
}

export default Flex
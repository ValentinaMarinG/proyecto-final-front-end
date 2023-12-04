import React from 'react'
import SliderComponent from '../SliderComponent/SliderComponent';
import './Contact.scss';
import gato1 from '../../assets/images/gato1.png';
import gato2 from '../../assets/images/gato2.jpg';
import gato3 from '../../assets/images/gato3.jpg';
import gato4 from '../../assets/images/gato4.jpg';


export const Contact = () => {
  const images = [gato1, gato2, gato3, gato4];

  return (
    <div className='contact-box'>
        <SliderComponent images={images}/>
    </div>
  )
}

export default Contact

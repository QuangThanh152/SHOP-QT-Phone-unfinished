import React from 'react';
import Slider from '../../components/slider/Slider';
import "./Home.scss";
import HomeInfoBox from './HomeInfoBox';
import { productData } from '../../components/carousel/data';
import CarouselItem from '../../components/carousel/CarouselItem';
import ProductCarousel from '../../components/carousel/Carousel';
import ProductCategory from './ProductCategory';
import FooterLink from '../../components/footer/FooterLink';

const PageHeading = ({heading, btnText}) => {
  return (
    <>
      <div className="--flex-between">
        {/* <h2 className="--fw-thin">{heading}</h2> */}
        <h2>{heading}</h2>
        <button className="--btn">
          {btnText}
        </button>
      </div>
      <div className="--hr"></div>
    </>
  )
}

const Home = () => {

  const productss = productData.map((item) => (
      <div key={item.id}>
        <CarouselItem 
          name={item.name}
          imageurl={item.imageurl}
          price={item.price}
          description={item.description}
        />
      </div>
  ))



  return (
    <>
      <Slider />
      {/* 1 */}
      <section>
        <div className='container'>

          <HomeInfoBox />

          <PageHeading heading={"Sản Phẩm Mới"} btnText={"Shop Now>>>"} />

          <ProductCarousel products={productss} />
        </div>
      </section>
      {/* 2 */}
      <section className="--bt-grey">

        <div className='container'>

          <h3>Sản Phẩm</h3>
          <ProductCategory />
          
        </div>
      </section>
      {/* 3 */}
      <section>
        <div className='container'>

          <PageHeading heading={"Điện Thoại"} btnText={"Shop Now>>>"} />

          <ProductCarousel products={productss} />
        </div>
      </section>
      {/* Footer */}
      <FooterLink />
    </>
  )
}

export default Home
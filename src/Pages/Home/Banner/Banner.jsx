import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import banner1 from '../../../assets/banner/banner1.png';
import banner2 from '../../../assets/banner/banner2.png';
import banner3 from '../../../assets/banner/banner3.png';

const Banner = () => {
  return (
    <Carousel className="my-16" autoPlay={true} infiniteLoop={true} stopOnHover={false} showThumbs={false} showStatus={false}>
      <div>
        <img src={banner1} />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src={banner2} />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src={banner3} />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default Banner;

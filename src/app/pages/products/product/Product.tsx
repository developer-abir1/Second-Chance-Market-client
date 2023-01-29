import React from 'react';
import images from '../../../utils/image';

const Product = () => {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl cursor-pointer">
      <figure>
        <div className=" relative      p-2 mt-2 rounded">
          <img src={images.bikHeader} alt="Shoes" className="w-[300px]   " />
          <h2 className=" absolute z-1 bottom-10 text-gray-400  right-0 font-bold text-xs">
            SecondChanceMarket.com
          </h2>
        </div>
      </figure>
      <div className="card-body">
        <div className="flex justify-evenly">
          <h2 className="card-title    text-2xl  font-serif  ">
            Shoedfsgfddasfs!
          </h2>
          <h2 className="card-title  "> $ 522</h2>
        </div>
        <p>
          Barnd : <span className=" font-bold">Hero Hunda</span>
        </p>
      </div>
    </div>
  );
};

export default Product;

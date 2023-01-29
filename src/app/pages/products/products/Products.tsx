import React from 'react';
import Product from '../product/Product';

const Products = () => {
  return (
    <div>
      <div className=" container m-auto">
        <h2></h2>
        <div className=" md:grid-cols-3   grid-cols-1 gap-4 grid  justify-items-center py-4">
          {[1, 2, 3, 4, 2, 4, 5, 48, 4, 4, 5, 8].map((item, index) => (
            <Product key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

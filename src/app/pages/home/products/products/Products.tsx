import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../shared/Loading/Loading';
import Product from '../product/Product';

const Products = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/products');
      const data = await res.json();
      return data;
    },
  });
  const newProducts = products
    ?.slice()
    .sort((a: any, b: any) => b.date.localeCompare(a.date));

  if (isLoading) {
    return <Loading />;
  }

  return (
    // <div className="  bg-[#bebebe56] ">
    //
    // </div>

    <div>
      <div className=" container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 py-8 justify-items-center gap-4">
          {newProducts?.map((product: any) => (
            <Link to={'/productDetails/' + product._id}>
              {' '}
              <Product key={product._id} product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

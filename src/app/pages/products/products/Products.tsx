import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../shared/Loading/Loading';
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
    <div>
      <div className=" container m-auto">
        <h2></h2>
        <div className="grid md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-8 grid-cols-2 gap-2">
          <div className=" xl:bg-indigo-400 bg-none   ">
            <div>
              <div className="dropdown xl:hidden">
                <label tabIndex={0} className="  btn  btn-sm m-1">
                  filtter Products
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </div>

              <div className=" px-4 mt-4  hidden   xl:block       ">
                <h2 className="text-center mt-4 text-2xl"> filter product</h2>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Remember me</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Remember me</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Remember me</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                  </label>
                </div>
                {/* price sort */}
                <div className="dropdown">
                  <label tabIndex={0} className="   w-[180px]   m-1">
                    Price
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow   rounded-box w-52"
                  >
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="  md:col-span-6 lg:col-span-8 xl:col-span-6  col-span-3  ">
            <div className="  px-4 lg:grid-cols-3  md:grid-cols-2 xl:grid-cols-3    grid-cols-1 gap-4 grid  justify-items-center py-4">
              {newProducts?.map((product: any, index: any) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

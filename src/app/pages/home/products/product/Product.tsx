import { useLocation } from 'react-router-dom';
import TimeAgo from '../../../../shared/TimeAgo/TimeAgo';

const Product = ({ product }: any) => {
  const pathname = useLocation();

  console.log(product);
  return (
    <div className="  h-[28rem]  card card-compact relative  bg-white   shadow-xl cursor-pointer">
      <figure>
        <div className=" relative       p-2 mt-2 rounded">
          <img
            src={product?.image}
            alt={product.title}
            className="    object-cover    w-full     rounded-md "
          />
          <h2 className=" absolute z-1 bottom-10 text-gray-400  right-0 font-bold text-xs">
            SecondChanceMarket.com
          </h2>
        </div>
      </figure>
      <div className="card-body">
        <div className=" ">
          <h2 className="card-title text-3xl  font-serif">
            {' '}
            ${product.newPrice}
          </h2>

          <h2 className=" text-lg font-thin">
            {product?.model}- {product?.mileage} KM
          </h2>
        </div>
        <h2 className="card-title  font-semibold   text-2xl   ">
          {product.title}
        </h2>
        <div className="flex justify-between w-full">
          <p>{product.address}</p>
          {pathname.pathname === '/' && (
            <p>
              {' '}
              <TimeAgo timestap={product.date} />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;

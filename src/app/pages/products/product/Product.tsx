import moment from 'moment';
import TimeAgo from '../../../shared/TimeAgo/TimeAgo';

const Product = ({ product }: any) => {
  return (
    <div className="card card-compact   bg-base-100 shadow-xl cursor-pointer">
      <figure>
        <div className=" relative      p-2 mt-2 rounded">
          <img src={product.image} alt="Shoes" className="w-[300px]   " />
          <h2 className=" absolute z-1 bottom-10 text-gray-400  right-0 font-bold text-xs">
            SecondChanceMarket.com
          </h2>
        </div>
      </figure>
      <div className="card-body">
        <div className=" ">
          <h2 className="card-title    text-2xl font-serif ">
            {product.title}
          </h2>
          <h2 className="card-title  "> Sell Price: ${product.newPrice}</h2>
        </div>
        <p>
          Barnd : <span className=" font-bold">{product.categories}</span>
        </p>
        <div className="flex justify-between w-full">
          <p>
            {' '}
            <TimeAgo timestap={product.date} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;

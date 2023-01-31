import { sub } from 'date-fns';
import React from 'react';
import images from '../../../utils/image';

const Header = () => {
  const bgBanner = {
    backgroundImage: `url(${images.banner})`,
    height: '700px',
    backgroundSize: 'cover',

    backgroundRepeat: 'no-repeat',
  };

  const date = sub(new Date(), { minutes: 10 }).toISOString();
  console.log(date);
  return (
    <div style={bgBanner} className="hero    ">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={images.bikHeader}
          className=" relative  md:max-w-md sm:max-w-0 rounded-lg  "
        />

        <div className="lg:ml-16   ml-0">
          <h1 className="text-5xl font-bold  font-serif text-white">
            Ride in Style with Retrofitted Bikes{' '}
          </h1>
          <p className="py-6 text-sm text-gray-400">
            Welcome to our website, where you'll find a wide selection of
            revitalized bikes at unbeatable prices. Our bikes are carefully
            inspected and serviced, so you can ride with confidence. Our mission
            is to provide affordable, eco-friendly transportation options for
            everyone. Shop now and join the cycling revolution!
          </p>
          <button className="btn btn-primary text-white">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Header;

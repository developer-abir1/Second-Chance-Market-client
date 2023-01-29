import React from 'react';
import images from '../../../utils/image';

const Header = () => {
  const bgBanner = {
    backgroundImage: `url(${images.banner})`,
    height: '700px',
    backgroundSize: 'cover',

    backgroundRepeat: 'no-repeat',
  };
  return (
    <div style={bgBanner} className="hero  md:-mb-32 -mb-12   ">
      <div className="hero-content flex-col lg:flex-row">
        <img src={images.bikHeader} className="max-w-md rounded-lg  " />
        <div className="md:ml-16  ml-0">
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

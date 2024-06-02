import React from "react";

const Header = ({ backgroundImage, title, instruction }) => {

  const headerStyling = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: '90%'
  };

  return (
    <>
      <div className='relative flex items-center justify-center xs:h-[20vh]
                      shadow-md shadow-gray-500 mb-4' style={headerStyling}>
        <div className='max-w-[1240px] mx-auto absolute xs:px-10 text-center'>
          <h1 className='md:text-4xl sm:text-2xl text-xl font-bold text-white title-outline'>{title}</h1>
          <p className='md:pt-2 md:text-xl xs:text-base font-medium text-white instruction-outline'>{instruction}</p>
        </div>
      </div>
    </>
  );
};


export default Header;

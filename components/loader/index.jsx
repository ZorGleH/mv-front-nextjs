import React from "react";
import Image from 'next/image'

const Loader = () => {
  return (
    <div className="loader bg-primary">
      <Image src="loader-pulse-2.gif" alt="Loading..." />
    </div>
  );
};

export default Loader;

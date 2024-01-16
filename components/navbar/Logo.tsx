"use client";

import Image from "next/image";

const Logo = () => {
   return <Image src="/images/logo.png" priority width="100" height="30" alt="Airbnb Logo" className="hidden md:block cursor-pointer w-auto h-auto" />;
};

export default Logo;

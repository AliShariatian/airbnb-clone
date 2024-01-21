import Image from "next/image";
import Link from "next/link";

const Logo = () => {
   return (
      <Link href="/">
         <Image src="/images/logo.png" priority width="100" height="30" alt="Airbnb Logo" className="hidden md:block cursor-pointer w-auto h-auto" />
      </Link>
   );
};

export default Logo;

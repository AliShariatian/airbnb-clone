"use client";

import Image from "next/image";

interface AvatarProps {
   src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
   return <Image src={src || "/images/placeholder.jpg"} height={50} width={50} alt="Avatar" className={`rounded-full size-[30px]`} />;
};

export default Avatar;

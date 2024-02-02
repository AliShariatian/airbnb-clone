"use client";

import Link from "next/link";

interface MenuItemProps {
   label: string;
   onClick?: () => void;
   href?: string | undefined;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, href }) => {
   const liContent = (
      <li onClick={onClick} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
         {label}
      </li>
   );

   return href ? <Link href={href}>{liContent}</Link> : liContent;
};

export default MenuItem;

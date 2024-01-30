"use client";

import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

interface MenuItemProps {
   label: string;
   onClick?: () => void;
   href?: string | undefined;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, href }) => {
   return href ? (
      <Link href={href} onClick={onClick}>
         <li className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">{label}</li>
      </Link>
   ) : (
      <li onClick={onClick} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
         {label}
      </li>
   );
};

export default MenuItem;

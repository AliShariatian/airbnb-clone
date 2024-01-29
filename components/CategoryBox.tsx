import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
   icon: IconType;
   label: string;
   selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {
   const router = useRouter();
   const params = useSearchParams();

   const clickHandler = useCallback(() => {
      let currentQuery = {};

      if (params) {
         currentQuery = qs.parse(params.toString());
      }

      const updatedQuery: any = {
         ...currentQuery,
         // in url => ?category=[label]
         category: label,
      };

      // if user click again on a category, all category un-select
      if (params?.get("category") === label) {
         delete updatedQuery.category;
      }

      const url = qs.stringifyUrl(
         {
            url: "/",
            query: updatedQuery,
         },
         { skipNull: true }
      );

      router.push(url);
   }, [label, params, router]);

   return (
      <div
         onClick={clickHandler}
         className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer select-none
                  ${selected ? "border-b-neutral-800 text-neutral-800" : "border-transparent text-neutral-500"}`}
      >
         <Icon size={26} />
         <span className="font-medium text-sm">{label}</span>
      </div>
   );
};

export default CategoryBox;

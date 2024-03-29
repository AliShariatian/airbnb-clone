import { IconType } from "react-icons";

interface CategoryInputProps {
   label: string;
   icon: IconType;
   onClick: (value: string) => void;
   selected?: boolean;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ icon: Icon, label, onClick, selected }) => {
   return (
      <div
         onClick={() => onClick(label)}
         className={`
            rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer 
            ${selected ? "border-black" : "border-neutral-200"}
            `}
      >
         <Icon size={30} />
         <span className="font-semibold">{label}</span>
      </div>
   );
};

export default CategoryInput;

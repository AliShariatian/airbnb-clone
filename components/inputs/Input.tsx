"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
   id: string;
   label: string;
   register: UseFormRegister<FieldValues>;
   errors: FieldErrors;
   type?: string;
   disabled?: boolean;
   formatPrice?: boolean;
   required?: boolean;
}

const Input: React.FC<InputProps> = ({ id, label, register, errors, type = "text", disabled, formatPrice, required }) => {
   return (
      <div className="w-full relative">
         {formatPrice && <BiDollar size={24} className="text-neutral-700 absolute top-5 left-2" />}
         <input
            id={id}
            disabled={disabled}
            type={type}
            placeholder=" "
            {...register(id, { required })}
            className={`peer w-full peer p-3 pt-6 bg-white text-base font-normal border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
               ${formatPrice ? "pl-9" : "pl-4"}
               ${errors[id] ? "border-rose-500 focus:border-rose-500" : "border-neutral-300 focus:border-black"}`}
         />
         <label
            htmlFor={id}
            className={`absolute font-normal duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
               formatPrice ? "left-9" : "left-4"
            } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors[id] ? "text-rose-500" : "text-zinc-400"}`}
         >
            {label}
            {required && "*"}
         </label>
      </div>
   );
};

export default Input;

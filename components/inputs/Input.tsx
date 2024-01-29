"use client";

import { useEffect } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import toast from "react-hot-toast";
import { BiDollar } from "react-icons/bi";

interface InputProps {
   id: string;
   label: string;
   register: UseFormRegister<FieldValues>;
   payload?: { pattern?: { value: RegExp; message: string }; minLength?: { value: number; message: string }; required?: { value: boolean; message: string } };
   errors: FieldErrors | any;
   type?: string;
   disabled?: boolean;
   formatPrice?: boolean;
}

const Input: React.FC<InputProps> = ({ id, label, register, payload, errors, type = "text", disabled, formatPrice }) => {
   useEffect(() => {
      errors[id] && toast.error(errors[id]?.message);
   }, [errors[id]]);

   return (
      <div className="w-full relative">
         {formatPrice && <BiDollar size={24} className="text-neutral-700 absolute top-6 left-2" />}
         <input
            id={id}
            disabled={disabled}
            type={type}
            placeholder=" "
            {...register(id, {
               ...payload,
            })}
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
            {payload?.required && "*"}
         </label>
      </div>
   );
};

export default Input;

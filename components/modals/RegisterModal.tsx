"use client";

import { useState } from "react";
import useRegisterModal from "@/hooks/useRegisterModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";

const RegisterModal = () => {
   const registerModal = useRegisterModal();
   const [isLoading, setIsLoading] = useState(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         name: "",
         email: "",
         password: "",
      },
   });

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);

      axios
         .post("/api/register", data)
         .then(() => {
            registerModal.onClose();
         })
         .catch(() => {
            toast.error("Something went wrong!");
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   const bodyContent = (
      <div className="flex flex-col gap-4">
         <Heading title="Welcome to Airbnb" subTitle="Create an account!" />
         <Input id="name" label="Your name" disabled={isLoading} register={register} errors={errors} required />
         <Input id="email" label="Email" type="email" disabled={isLoading} register={register} errors={errors} required />
         <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
      </div>
   );

   const footerContent = (
      <div className="flex flex-col gap-4 mt-3">
         <hr />
         <Button outline icon={FcGoogle} label="Continue with Google" onClick={() => {}} />
         <Button outline icon={AiFillGithub} label="Continue with Github" onClick={() => {}} />
         <div className="text-neutral-500 text-center mt-4 font-light">
            <div className="flex items-center gap-3 justify-center">
               <span>Already have an account?</span>
               <span onClick={registerModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">
                  Login
               </span>
            </div>
         </div>
      </div>
   );

   return (
      <Modal
         disabled={isLoading}
         title="Register"
         actionLabel="Continue"
         isOpen={registerModal.isOpen}
         onClose={registerModal.onClose}
         onSubmit={handleSubmit(onSubmit)}
         body={bodyContent}
         footer={footerContent}
      />
   );
};

export default RegisterModal;
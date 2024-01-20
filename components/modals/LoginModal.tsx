"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import useRegisterModal from "@/hooks/useLoginModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";

const LoginModal = () => {
   const router = useRouter();
   const registerModal = useRegisterModal();
   const loginModal = useLoginModal();
   const [isLoading, setIsLoading] = useState(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);

      signIn("credentials", {
         ...data,
         redirect: false,
      })
         .then((callback) => {
            setIsLoading(true);

            if (callback?.ok) {
               toast.success("You logged-in successfully");
               router.refresh();
               loginModal.onClose();
            }

            console.log(callback);
            // if (callback?.error) {
            //    toast.error("Email or Password is incorrect!");
            // }  <-- (or can use this that is better)

            // ----- Do not use in real project
            if (callback?.error === "InvalidEmailOrPassword" || callback?.error === "InvalidPassword") {
               toast.error("Email or Password is incorrect!");
            }

            if (callback?.error === "EmailNotFound") {
               toast.error("Email not found! Please SignUp.");
            }
            // -----
         })
         .catch(() => {
            toast.error("Login Error!");
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   const bodyContent = (
      <div className="flex flex-col gap-4">
         <Heading title="Welcome back" subTitle="Login to your account!" />

         <Input
            id="email"
            label="Email"
            type="email"
            payload={{
               pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter valid email value!",
               },
               required: {
                  value: true,
                  message: "Email is require!",
               },
            }}
            disabled={isLoading}
            register={register}
            errors={errors}
         />

         <Input
            id="password"
            label="Password"
            type="password"
            payload={{
               required: {
                  value: true,
                  message: "Password is require!",
               },
            }}
            disabled={isLoading}
            register={register}
            errors={errors}
         />
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
         title="Login"
         disabled={isLoading}
         actionLabel="Continue"
         isOpen={loginModal.isOpen}
         onClose={loginModal.onClose}
         onSubmit={handleSubmit(onSubmit)}
         body={bodyContent}
         footer={footerContent}
      />
   );
};

export default LoginModal;

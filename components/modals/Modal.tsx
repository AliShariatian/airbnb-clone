"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
   title?: string;
   body?: React.ReactElement;
   footer?: React.ReactElement;
   isOpen?: boolean;
   disable?: boolean;
   secondaryLabel?: string;
   secondaryAction?: () => void;

   onClose: () => void;
   onSubmit: () => void;
   actionLabel: string;
}

const Modal: React.FC<ModalProps> = ({ title, body, footer, isOpen, disable, secondaryAction, secondaryLabel, onClose, onSubmit, actionLabel }) => {
   const [showModal, setShowModal] = useState(isOpen);

   useEffect(() => {
      setShowModal(isOpen);
   }, [isOpen]);

   const closeModalHandler = useCallback(() => {
      // if modal is disable, return
      if (disable) {
         return;
      }

      // close modal
      setShowModal(false);

      setTimeout(() => {
         onClose();
      }, 300);
   }, [disable, onClose]);

   const submitHandler = useCallback(() => {
      // if modal is disable, return
      if (disable) {
         return;
      }

      onSubmit();
   }, [disable, onSubmit]);

   const secondaryActionHandler = useCallback(() => {
      // if modal is disable or have not secondary action
      if (disable || !secondaryAction) {
         return;
      }

      // if is not open, return
      if (!isOpen) {
         return null;
      }

      secondaryAction();
   }, [disable, secondaryAction]);

   return (
      <div className="flex justify-center items-center fixed inset-0 overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none bg-neutral-800/70">
         <div className="relative w-full my-6 mx-auto h-full md:h-auto md:w-4/6 lg:w-3/6 xl:w-2/5">
            {/* content */}
            <div className={`transition duration-300 h-full ${showModal ? "translate-y-0" : "translate-y-full"} ${showModal ? "opacity-100" : "opacity-0"}`}>
               <div className="relative flex flex-col bg-white transition w-full h-full md:h-auto outline-none focus:outline-none border-0 rounded-lg shadow-lg">
                  {/* header */}
                  <div className="relative flex items-center justify-center p-6 rounded-t border-b-[1px]">
                     <button onClick={closeModalHandler} className="absolute left-9 p-1 border-0 hover:opacity-70 transition">
                        <IoMdClose size={18} />
                     </button>
                     <h3 className="text-lg font-semibold">{title}</h3>
                  </div>
                  {/* body */}
                  <div className="relative p-6 flex-auto">{body}</div>
                  {/* footer */}
                  <div className="flex flex-col gap-2 p-6">
                     <div className="flex items-center gap-4 w-full">{/* <Button /> */}</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Modal;
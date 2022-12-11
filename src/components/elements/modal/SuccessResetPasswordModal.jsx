import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const SuccessResetPasswordModal = ({ isOpen }) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 "
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95 transform translate-y-[100%]"
                enterTo="opacity-100 scale-100 transform translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100 translate-y-0"
                leaveTo="opacity-0 scale-95 translate-y-[100%]"
              >
                <Dialog.Panel className="w-full max-w-md p-5 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <div className="text-center">
                    <CheckCircleIcon className="text-green-500 w-[100px] h-[100px] mx-auto" />
                    <h1 className="mt-4 text-xl font-semibold lg:text-2xl">
                      Password Updated
                    </h1>

                    <Link href={"/"}>
                      <div className="w-full py-3 mt-8 cursor-pointer btn btn-primary">
                        Back to login
                      </div>
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SuccessResetPasswordModal;

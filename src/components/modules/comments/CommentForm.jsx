import Button from "@/components/elements/Button";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Form from "@/components/forms";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { socket } from "@/utils/socket";
import Avatar from "@/assets/images/avatar.svg";
import useComment from "@/hooks/useComment";

const defaultValues = {
  content: "",
};
const CommentForm = ({ onSubmitComment }) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit, reset, watch } = methods;

  const { user } = useAuth();

  const sendComment = async (values) => {
    reset();

    await onSubmitComment(values);
  };

  const content = watch("content");

  return (
    <div className="px-4 py-6 bg-gray-50 sm:px-6">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          {/* <UserCircleIcon className="w-10 h-10 text-gray-400" /> */}
          <Image
            width={32}
            height={32}
            className="rounded-full"
            src={user?.image?.url ?? Avatar}
            alt={user?.first_name + " " + user?.last_name}
            objectFit="cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <FormProvider {...methods}>
            <form>
              <Form.Group className="space-y-0">
                <Form.Textarea name="content" />
              </Form.Group>

              <div className="flex items-center justify-end mt-3">
                <Button
                  type="submit"
                  className="px-4 py-2 text-sm btn-primary"
                  onClick={handleSubmit(sendComment)}
                  disabled={content === ""}
                >
                  Comment
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;

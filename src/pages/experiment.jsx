import Button from "@/components/elements/Button";
import React, { useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Form from "@/components/forms";

import { SocketContext } from "@/context/SocketContext";
import { useAuth } from "@/context/AuthContext";

const defaultValues = {
  content: "",
};

const ExperimentPage = () => {
  const { socket } = useContext(SocketContext);
  const { current_user } = useAuth();

  const methods = useForm({ defaultValues });

  const { handleSubmit } = methods;

  const onSubmit = ({ content }) => {
    socket.emit("send-notification", {
      content,
      user_id: current_user,
    });
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("receive-notification", (data) => {
      console.log("receive", data);
    });
  }, [socket]);

  return (
    <div className="px-4 py-6 bg-gray-50 sm:px-6">
      <div className="flex space-x-3">
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
                  onClick={handleSubmit(onSubmit)}
                >
                  Send notification
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default ExperimentPage;

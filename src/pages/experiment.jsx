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

  return <div>Hello</div>;
};

export default ExperimentPage;

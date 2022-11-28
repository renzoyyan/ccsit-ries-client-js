import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import React, { useEffect, useRef, useState } from "react";

import socketIO from "socket.io-client";

const COMMENT_EVENT = "comments";
const SOCKET_IO_SERVER = "http://localhost:5000";

const useComment = (project_id) => {
  const [comments, setComments] = useState([]);
  const { access_token } = useAuth();
  const socketRef = useRef();

  const currentId =
    project_id?.research_id !== null
      ? project_id.research_id
      : project_id.extension_id;

  const getComments = async () => {
    try {
      const { data } = await api.get(`/api/comment/research/${currentId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      setComments(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentId) {
      socketRef.current = socketIO(SOCKET_IO_SERVER, {
        // query: { project_id },
        extraHeaders: {
          Authorization: `Bearer ${access_token}`,
          "project-id": currentId,
        },
      });

      socketRef.current.on(COMMENT_EVENT, (data) => {
        setComments((prev) => [...prev, data]);
      });
      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [currentId, access_token]);

  const sendNewComment = (data) => {
    socketRef.current.emit(COMMENT_EVENT, data);
  };

  return {
    comments,
    sendNewComment,
  };
};

export default useComment;

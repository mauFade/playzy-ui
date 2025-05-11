"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useChat } from "@/context/chat-context";

import ChatPage from "./components/chat-page";

const Chat = () => {
  const { chatData } = useChat();
  const router = useRouter();

  useEffect(() => {
    if (!chatData) {
      router.push("/sessions");
    }
  }, [chatData, router]);

  if (!chatData) return null;

  return (
    <ChatPage
      data={{ message: chatData.message }}
      userId={chatData.userId}
      otherUserId={chatData.otherUserId}
      userName={chatData.userName}
    />
  );
};

export default Chat;

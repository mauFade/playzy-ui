"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ChatData = {
  message: string;
  userId: string;
  otherUserId: string;
  userName: string;
};

type ChatContextType = {
  chatData: ChatData | null;
  setChatData: (data: ChatData) => void;
  clearChatData: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatContextProvider({ children }: { children: ReactNode }) {
  const [chatData, setChatData] = useState<ChatData | null>(null);

  const clearChatData = () => {
    setChatData(null);
  };

  return (
    <ChatContext.Provider value={{ chatData, setChatData, clearChatData }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

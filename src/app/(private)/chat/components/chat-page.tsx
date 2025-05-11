"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Send, Phone, Video, MoreVertical, ArrowLeft } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useMobile } from "@/hooks/use-mobile";
import { capitalizeName } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
}

interface ChatPageProps {
  data: { message: string };
  userId: string;
  otherUserId: string;
  userName: string;
}

const ChatPage = ({ userId, otherUserId, data, userName }: ChatPageProps) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const isMobile = useMobile();
  useEffect(() => {
    setMessages([
      {
        id: "1",
        content: data.message,
        senderId: userId,
        timestamp: new Date(),
      },
    ]);
  }, [data.message, otherUserId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      senderId: userId,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Simulate a response after 1 second
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message! This is an automated response.",
        senderId: otherUserId,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="sm:ml-14 flex flex-col h-[calc(100vh-2rem)] bg-background rounded-lg shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          {isMobile && (
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <Avatar>
            <div className="w-full h-full flex items-center justify-center text-foreground bg-muted font-medium">
              {otherUserId.substring(0, 2).toUpperCase()}
            </div>
          </Avatar>
          <div>
            <h2 className="font-semibold">{capitalizeName(userName)}</h2>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => {
            const isCurrentUser = message.senderId === userId;

            return (
              <div
                key={message.id}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-end space-x-2">
                  {!isCurrentUser && (
                    <Avatar className="h-8 w-8">
                      <div className="w-full h-full flex items-center justify-center text-foreground bg-muted font-medium">
                        {otherUserId.substring(0, 2).toUpperCase()}
                      </div>
                    </Avatar>
                  )}
                  <div className="space-y-1">
                    <div
                      className={`max-w-xs sm:max-w-md px-4 py-2 rounded-2xl ${
                        isCurrentUser
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-muted rounded-bl-none"
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground px-2">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;

"use client";

import { Send } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

// Types for our messages
interface MessageInterface {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
  type: "sent" | "received";
}

const Messages = () => {
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Example messages for UI demonstration
  const exampleMessages: MessageInterface[] = [
    {
      id: "1",
      content: "Oi! Bora jogar?",
      sender: {
        id: "2",
        name: "João",
        avatar: "/placeholder.svg",
      },
      timestamp: new Date().toISOString(),
      type: "received",
    },
    {
      id: "2",
      content: "Claro! Que jogo você quer jogar?",
      sender: {
        id: "1",
        name: "Você",
        avatar: "https://github.com/shadcn.png",
      },
      timestamp: new Date().toISOString(),
      type: "sent",
    },
    {
      id: "3",
      content: "Que tal um CS2?",
      sender: {
        id: "2",
        name: "João",
        avatar: "https://github.com/shadcn.png",
      },
      timestamp: new Date().toISOString(),
      type: "received",
    },
  ];

  useEffect(() => {
    // Simulate loading initial messages
    setMessages(exampleMessages);

    // WebSocket connection setup would go here
    // const ws = new WebSocket('ws://localhost:8081/ws')

    // ws.onopen = () => {
    //   setIsConnected(true)
    //   console.log('Connected to WebSocket')
    // }

    // ws.onmessage = (event) => {
    //   const message = JSON.parse(event.data)
    //   setMessages(prev => [...prev, message])
    // }

    // ws.onclose = () => {
    //   setIsConnected(false)
    //   console.log('Disconnected from WebSocket')
    // }

    // return () => {
    //   ws.close()
    // }
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Create new message
    const message: MessageInterface = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        id: "1",
        name: "Você",
        avatar: "https://github.com/shadcn.png",
      },
      timestamp: new Date().toISOString(),
      type: "sent",
    };

    // Add message to state
    setMessages((prev) => [...prev, message]);

    // Here you would send the message via WebSocket
    // ws.send(JSON.stringify(message))

    // Clear input
    setNewMessage("");
  };

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-2rem)] mx-auto max-w-3xl mt-4">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Mensagens</h2>
          <div
            className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {isConnected ? "Conectado" : "Desconectado"}
        </span>
      </div>

      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2 ${message.type === "sent" ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={message.sender.avatar} />
                <AvatarFallback>
                  {message.sender.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div
                className={`group relative max-w-[80%] rounded-lg p-3 ${
                  message.type === "sent"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm mb-1">{message.content}</p>
                <span className="text-xs opacity-70">
                  {formatMessageTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
};

export default Messages;

"use client";

import { Send } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

// Types for our messages
interface MessageInterface {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
  isRead: boolean;
  isMine: boolean;
}

interface MessagesPropsInterface {
  otherUserId: string;
  currentUserId: string; // ID do usuário atual
}

const Messages = ({ otherUserId, currentUserId }: MessagesPropsInterface) => {
  const { toast } = useToast();

  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  // Conectar ao WebSocket ao montar o componente
  useEffect(() => {
    // Carregar histórico de mensagens
    fetchMessageHistory();

    // Conectar ao WebSocket
    connectWebSocket();

    // Limpar ao desmontar
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [otherUserId, currentUserId]);

  // Buscar histórico de mensagens
  const fetchMessageHistory = async () => {
    try {
      const response = await fetch(`/api/messages?otherUserID=${otherUserId}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar mensagens");
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Erro:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as mensagens anteriores",
        variant: "destructive",
      });
    }
  };

  // Conectar ao WebSocket
  const connectWebSocket = () => {
    const socket = new WebSocket(
      `ws://localhost:8080/ws?userID=${currentUserId}`
    );
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Conectado ao WebSocket");
      setConnected(true);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Mensagem recebida:", data);

      // Verificar se a mensagem é relevante para esta conversa
      if (
        (data.senderId === currentUserId && data.receiverId === otherUserId) ||
        (data.senderId === otherUserId && data.receiverId === currentUserId)
      ) {
        // Adicionar a nova mensagem ao estado
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    socket.onclose = () => {
      setConnected(false);

      // Tentar reconectar após 3 segundos
      setTimeout(() => {
        if (socketRef.current?.readyState !== WebSocket.OPEN) {
          connectWebSocket();
        }
      }, 3000);
    };

    socket.onerror = (error) => {
      console.error("Erro WebSocket:", error);
      toast({
        title: "Erro de conexão",
        description: "Problema na conexão de chat em tempo real",
        variant: "destructive",
      });
    };
  };

  // Rolar para o final quando novas mensagens chegarem
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !connected) return;

    // Criar objeto da mensagem
    const messageObj = {
      type: "message",
      content: newMessage,
      receiverId: otherUserId,
    };

    // Enviar mensagem via WebSocket
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(messageObj));
      // A mensagem aparecerá quando o servidor enviar de volta via websocket
    } else {
      toast({
        title: "Não conectado",
        description: "Não foi possível enviar a mensagem. Tente novamente.",
        variant: "destructive",
      });
    }

    // Limpar input
    setNewMessage("");
  };

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-2rem)] mx-auto max-w-3xl">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Chat</h2>
          <div className="text-sm text-muted-foreground">
            {connected ? (
              <span className="text-green-500">●</span>
            ) : (
              <span className="text-red-500">●</span>
            )}
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4" ref={scrollRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2 ${message.isMine ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback>
                  {message.isMine ? "Me" : "Them"}
                </AvatarFallback>
              </Avatar>

              <div
                className={`group relative max-w-[80%] rounded-lg p-3 ${
                  message.isMine
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
          disabled={!connected}
        />
        <Button type="submit" disabled={!connected}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
};

export default Messages;

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Smile, Send, Plus, ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export default function ChatPage() {
  const [message, setMessage] = useState("");

  const chatData = {
    currentUser: {
      id: 1,
      name: "Jontray Arnold",
      avatar: "/placeholder.svg?height=200&width=200",
      status: "available",
    },
    recentChats: [
      {
        id: 1,
        name: "Real estate deals",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Flying",
        time: "11:35",
        unread: false,
      },
      {
        id: 2,
        name: "Kate Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "",
        time: "11:15",
        unread: false,
      },
      {
        id: 3,
        name: "Tamara Shevchenko",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "are you going to a business...",
        time: "10:05",
        unread: false,
      },
      {
        id: 4,
        name: "Joshua Clarkson",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "I wanted to share how...",
        time: "10:09",
        unread: false,
      },
      {
        id: 5,
        name: "Jensen Zoet",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Are you free next week...",
        time: "14:09",
        unread: false,
      },
    ],
    currentChat: {
      id: 2,
      name: "Group Chat",
      participants: ["Kate Johnson", "Evan Scott", "Robert", "You"],
      messages: [
        {
          id: 1,
          sender: {
            id: 2,
            name: "Kate Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          message: "I'm super junior, so it's okay if he can laugh 😂",
          time: "12:54 AM",
        },
        {
          id: 2,
          sender: {
            id: 2,
            name: "Kate Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          message:
            "Recently I saw properties in a great location that I did not pay attention to before 😊",
          time: "12:54 AM",
        },
        {
          id: 3,
          sender: {
            id: 3,
            name: "Evan Scott",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          message: "Ooo, why didn't you say something more",
          time: "12:56 AM",
        },
        {
          id: 4,
          sender: {
            id: 2,
            name: "Kate Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          message: "@Robert? 🤔",
          time: "12:57 AM",
        },
        {
          id: 5,
          sender: {
            id: 1,
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          message: "He creates an atmosphere of mystery 😎",
          time: "12:58 AM",
          isCurrentUser: true,
        },
        {
          id: 6,
          sender: {
            id: 3,
            name: "Evan Scott",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          message: "Robert, don't be like that and say something more :)",
          time: "12:59 AM",
        },
        {
          id: 7,
          sender: {
            id: 4,
            name: "Robert",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          message: "Robert is typing",
          time: "1:00 AM",
          isTyping: true,
        },
      ],
    },
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const { user } = useAuth();

  return (
    <div className="sm:ml-14 flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-80 border-r flex flex-col">
        {/* User Profile */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="size-12">
              <AvatarImage
                src={user?.avatar || "https://github.com/shadcn.png"}
                alt={`@${user?.name}`}
              />
              <AvatarFallback>PZ</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user?.name}</h3>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5"></span>
                <span className="capitalize">
                  {chatData.currentUser.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-9 bg-muted/50" />
          </div>
        </div>

        {/* Recent Chats */}
        <div className="flex items-center justify-between px-4 py-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            Last chats
          </h4>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {chatData.recentChats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center space-x-3 p-2 rounded-md hover:bg-accent cursor-pointer ${chat.id === 2 ? "bg-accent" : ""}`}
              >
                <Avatar className="h-10 w-10">
                  <img
                    src={chat.avatar || "/placeholder.svg"}
                    alt={chat.name}
                    className="object-cover"
                  />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium truncate">
                      {chat.name}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {chat.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 border-b flex items-center px-4">
          <Button variant="ghost" size="icon" className="md:hidden mr-2">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="font-medium">{chatData.currentChat.name}</h2>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {chatData.currentChat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                {!msg.isCurrentUser && (
                  <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                    <img
                      src={msg.sender.avatar || "/placeholder.svg"}
                      alt={msg.sender.name}
                      className="object-cover"
                    />
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] ${msg.isCurrentUser ? "order-1" : "order-2"}`}
                >
                  {!msg.isCurrentUser && (
                    <div className="flex items-center mb-1">
                      <span className="text-sm font-medium">
                        {msg.sender.name}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {msg.time}
                      </span>
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      msg.isCurrentUser
                        ? "bg-primary text-primary-foreground"
                        : msg.isTyping
                          ? "bg-muted"
                          : "bg-accent"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  {msg.isCurrentUser && (
                    <div className="flex justify-end mt-1">
                      <span className="text-xs text-muted-foreground">
                        {msg.time}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button variant="ghost" size="icon">
              <Smile className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-primary text-primary-foreground rounded-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

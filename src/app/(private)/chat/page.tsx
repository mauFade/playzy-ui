import { useAuth } from "@/context/auth-context";
import Messages from "./components/messages";

const ChatPage = () => {
  const { user } = useAuth();
  
  return (
    <Messages currentUserId={user!.id} otherUserId="" />
  )
}

export default ChatPage
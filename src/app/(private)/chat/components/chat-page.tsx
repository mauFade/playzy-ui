import React from "react";

interface ChatPageProps {
  data: { message: string };
  userId: string;
  otherUserId: string;
}

const ChatPage = (props: ChatPageProps) => {
  return (
    <main className="sm:ml-14 p-4 space-y-4">
      <div>{props.data.message}</div>
    </main>
  );
};

export default ChatPage;

import Messages from "./components/page";

export default function MessagePage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-4">
      <Messages roomId={params.id} />
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EditProfileModal from "./components/edit-profile-modal";

export default function ProfileSettings() {
  const user = {
    name: "Mauricio",
    email: "mauricio.cds55777@gmail.com",
    phone: "41985351419",
    avatar: "https://www.github.com/mauFade.png",
    gamertag: "maucardsm11785",
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.gamertag}</p>
            </div>
          </div>
          <div className="grid gap-4 mt-6">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue={user.name} disabled />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue={user.email} disabled />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" defaultValue={user.phone} disabled />
            </div>
          </div>

          <EditProfileModal />
        </CardContent>
      </Card>
    </div>
  );
}

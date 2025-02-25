"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Drawerform = () => {
  const router = useRouter();

  const [wait, setWait] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    message: z
      .string()
      .min(5, "A mensagem deve ter pelo menos 5 caracteres")
      .max(500, "A mensagem não pode ter mais de 500 caracteres"),
  });

  type MessageSchema = z.infer<typeof formSchema>;

  const form = useForm<MessageSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (data: MessageSchema) => {
    setWait(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const id = v4();

      toast({
        title: "Mensagem enviada!",
        description: "Sua mensagem foi enviada com sucesso.",
      });

      form.reset();

      router.push(`/messages/${id}`);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar sua mensagem.",
        variant: "destructive",
      });

      console.error({ error });
    } finally {
      setWait(false);
    }
  };

  const messageLength = form.watch("message")?.length || 0;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="lg" className="gap-2" variant="outline">
          <Icons.gamepad className="h-5 w-5" />
          Bora jogar!
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-bold">Bora jogar!</DrawerTitle>
            <DrawerDescription className="text-base">
              Se apresente! Diga se já tá jogando com alguém, se prefere falar
              por Discord e tudo mais!
            </DrawerDescription>
          </DrawerHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="px-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="message">Sua mensagem</Label>
                  <span className="text-xs text-muted-foreground">
                    {messageLength}/500 caracteres
                  </span>
                </div>
                <Textarea
                  id="message"
                  placeholder="Qual é a boa? Conte um pouco sobre você e como quer jogar..."
                  className={`min-h-[120px] resize-none ${form.formState.errors.message && "border-red-500"}`}
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>
            </div>

            <DrawerFooter>
              <Button
                className="w-full"
                type="submit"
                disabled={wait || messageLength === 0}
              >
                {wait ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar mensagem"
                )}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Drawerform;

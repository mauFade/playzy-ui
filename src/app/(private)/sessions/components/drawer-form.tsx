"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const Drawerform = () => {
  const formSchema = z.object({
    game: z.string().min(3, {
      message: "Insira o nome de um jogo válido",
    }),
    objective: z.string().min(3),
    rank: z.string().min(3, {
      message: "Insira um ranque válido",
    }),
    is_ranked: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      game: "",
      is_ranked: true,
      objective: "",
      rank: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Bora jogar!</Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Criar sessão</DrawerTitle>
            <DrawerDescription>
              Crie uma sessão e encontre alguém pra jogar.
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="game"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jogo</FormLabel>
                      <FormControl>
                        <Input placeholder="Jogo" {...field} />
                      </FormControl>
                      <FormDescription>
                        Para qual jogo você quer criar uma sessão.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Drawerform;

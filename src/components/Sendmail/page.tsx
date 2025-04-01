// src/components/Sendmail/page.tsx
// page.tsx
'use client';

import React, { useState } from 'react';
import Image from "next/image";
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import mockup from "public/mockup.png"

const SendmailForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast(); // Keeping this as showToast

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    console.log("Form data:", { name, email });

    // Basic validation
    if (!name || !email) {
      console.log("Validation failed: Missing required fields");
      showToast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const data = { name, email };

    try {
      console.log("Sending request to /api/send-ebook");
      const response = await fetch("/api/send-ebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        console.log("Email sent successfully");
        showToast({
          title: "Sucesso!",
          description: "O e-book foi enviado para seu email. Verifique sua caixa de entrada.",
        });
        // Reset form
        event.currentTarget.reset();
      } else {
        const errorData = await response.json();
        console.error("Error data:", errorData);
        throw new Error(errorData.error || "Failed to send email");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      showToast({
        title: "Erro",
        description: `Houve um problema ao enviar o e-book: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12" style={{ paddingTop: '200px' }}>
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#012B09] leading-tight">
              Guia Completo sobre Contribuição Previdenciária
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Há mais de 15 anos trabalhando incansavelmente pelo melhor benefício previdenciário. Baixe agora nosso
              guia exclusivo e entenda seus direitos.
            </p>
          </div>
          <Card className="bg-white shadow-xl border-0">
          <Image
              placeholder="blur"
              src={mockup}
              alt="E-book - Guia completo sobre aliquotas do INSS 2025"
              className="max-w-[350px] mx-auto"
            />
            <CardHeader>
              <CardTitle>
                <span className="font-serif text-2xl text-[#012B09]">Baixe Gratuitamente</span>
              </CardTitle>
              <CardDescription>Receba nosso e-book exclusivo sobre direito previdenciário</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input type="text" name="name" placeholder="Seu nome" required />
                <Input type="email" name="email" placeholder="Seu email" required />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Enviando...' : 'Enviar'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>

  );
};

export default SendmailForm;
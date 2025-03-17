"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { CheckCircle } from "lucide-react";

const WEBHOOK_URL = "https://hook.eu2.make.com/lp9z90waqnuw3g2u96q8pfaspvy18rt8";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

interface ContactFormProps {
  onSubmitSuccess?: () => void;
}

export function ContactForm({ onSubmitSuccess }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSubmitted(true);
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[40rem] w-full bg-black relative flex items-center justify-center">
        <div className="max-w-md w-full relative z-10">
          <div className="rounded-lg bg-zinc-900/50 p-8 text-center space-y-6 backdrop-blur-sm">
            <div className="flex justify-center">
              <CheckCircle className="h-20 w-20 text-green-500" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Successfully Submitted</h3>
            <p className="text-gray-400">
              We'll be in touch within 60 seconds
            </p>
          </div>
        </div>
        <BackgroundBeams />
      </div>
    );
  }

  return (
    <div className="min-h-[40rem] w-full bg-black relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 relative z-10">
        <h1 className="text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 text-center font-sans font-bold">
          Get in contact
        </h1>
        <p className="text-neutral-400 max-w-lg mx-auto my-2 text-sm text-center">
          We will reach out in under 60 seconds
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="fullName" className="text-white">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              className="mt-2 text-white bg-neutral-900 border-neutral-800 placeholder:text-neutral-400"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="phoneNumber" className="text-white">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="mt-2 text-white bg-neutral-900 border-neutral-800 placeholder:text-neutral-400"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500 mt-1">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-white">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="mt-2 text-white bg-neutral-900 border-neutral-800 placeholder:text-neutral-400"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
      <BackgroundBeams />
    </div>
  );
}
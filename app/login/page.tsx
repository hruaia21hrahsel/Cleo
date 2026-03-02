"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Home, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useApp } from "@/lib/context/AppContext";
import { loginSchema, LoginInput } from "@/lib/validators";

const DEMO_ACCOUNTS = [
  { label: "Landlord (Rajesh)", email: "rajesh@example.com", password: "password123" },
  { label: "Tenant (Priya)", email: "priya@example.com", password: "password123" },
];

export default function LoginPage() {
  const { login, currentUser, isLoading } = useApp();
  const router = useRouter();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (currentUser) {
      router.replace(currentUser.role === "landlord" ? "/dashboard" : "/tenant/dashboard");
    }
  }, [currentUser, router]);

  const onSubmit = async (data: LoginInput) => {
    const success = await login(data.email, data.password);
    if (!success) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Welcome back!");
    }
  };

  const fillDemo = (email: string, password: string) => {
    form.setValue("email", email);
    form.setValue("password", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-background p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Brand */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-2xl font-bold text-primary mb-2">
            <Home className="h-7 w-7" />
            RentEase
          </div>
          <p className="text-muted-foreground text-sm">Smart Rental Management</p>
        </div>

        {/* Demo Quick Login */}
        <div className="flex gap-2">
          {DEMO_ACCOUNTS.map((acc) => (
            <Button
              key={acc.email}
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => fillDemo(acc.email, acc.password)}
            >
              Demo: {acc.label}
            </Button>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";

import LoginForm from "./components/login-form";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <LoginForm />
        <p className="text-sm text-muted-foreground text-center mt-4">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

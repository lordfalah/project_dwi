"use client";

import { signIn, signOut } from "next-auth/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Dashboard from "@/assets/icon/Dashboard";

const LoginBtn = ({ session }) => {
  return (
    <div className="p-6 lg:p-8 transition-colors border-black/20 border-2 hover:border-black/40 lg:border-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        {session?.token?.role === "USER" ? (
          <button
            type="button"
            className="bg-slate-900 w-full py-2.5 flex justify-center items-center gap-x-3.5 rounded-md transition-colors hover:bg-slate-900/80"
            onClick={() => signOut()}
          >
            <Image
              src={"/image/logo/Google.svg"}
              width={150}
              height={150}
              className="w-8 h-8"
              alt="google"
              style={{
                objectFit: "cover",
              }}
            />
            <span className="font-medium text-lg text-white">Log Out</span>
          </button>
        ) : (
          !session && (
            <button
              type="button"
              className="bg-slate-900 w-full py-2.5 flex justify-center items-center gap-x-3.5 rounded-md transition-colors hover:bg-slate-900/80"
              onClick={() =>
                signIn("google", {
                  redirect: true,
                  callbackUrl: process.env.NEXT_PUBLIC_URL_PAGE,
                })
              }
            >
              <Image
                src={"/image/logo/Google.svg"}
                width={150}
                height={150}
                className="w-8 h-8"
                alt="google"
                style={{
                  objectFit: "cover",
                }}
              />
              <span className="font-medium text-lg text-white">Google</span>
            </button>
          )
        )}

        {session?.token?.role === "ADMIN" && (
          <Link
            href={"/dashboard"}
            className="bg-slate-900 w-full py-2.5 flex justify-center items-center gap-x-3.5 rounded-md transition-colors hover:bg-slate-900/80"
          >
            <Dashboard className="w-8 h-8 stroke-white stroke-2" />
            <span className="font-medium text-lg text-white">Dashboard</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LoginBtn;

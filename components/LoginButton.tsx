// components/LoginButton.tsx
"use client";

import { signIn } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button
      onClick={() => {
        signIn("github", {
          callbackUrl: "/", // hoặc trang dashboard nếu muốn
          prompt: "login", // ép hiện màn hình đăng nhập lại
        });
      }}
      className="px-4 py-2 bg-black text-white rounded"
    >
      Login with GitHub
    </button>
  );
};

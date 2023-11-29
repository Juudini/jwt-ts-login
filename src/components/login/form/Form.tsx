"use client";
import React, { useState } from "react";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    console.log("Form submitted with:", email, password);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        className="bg-white text-black grid text-center px-5 py-5 gap-5 rounded-xl w-96 shadow-custom"
        onSubmit={handleSubmit}
      >
        <p className="text-xl font-semibold">Login</p>
        <input
          className="border-gray-300 px-2.5 py-1.5 border rounded-md"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border-gray-300 px-2.5 py-1.5 border rounded-md"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="#" className="text-xs text-blue-700 w-fit mx-auto">
          Forgot password?
        </a>
        <button
          type="submit"
          className="bg-rgb-blue text-white rounded-md p-2.5"
        >
          Login
        </button>
        <p className="text-xs">
          {"Don't have an account? "}
          <a href="/signup" className=" text-blue-700 w-fit mx-auto">
            Signup
          </a>
        </p>
      </form>
    </main>
  );
}

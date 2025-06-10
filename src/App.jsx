import "./index.css";
import { useEffect } from "react";
import React from "react";
import NumberGuesserGame from "./components/numberGuessingGame";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-3xl font-light text-center mb-8">Number Guesser Game</h1>
        <NumberGuesserGame />
      </div>
    </main>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button";
import { Input } from "./ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Label } from "@/components/ui/label"
import { AlertCircle, ThumbsUp, ThumbsDown } from "lucide-react"

// This is our main game component
export default function NumberGuesserGame() {

  const [secretNumber, setSecretNumber] = useState(0)
  const [userGuess, setUserGuess] = useState("")
  const [message, setMessage] = useState("Make a guess!")
  const [attemptsLeft, setAttemptsLeft] = useState(10)
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [difficulty, setDifficulty] = useState("medium")
  const [guessHistory, setGuessHistory] = useState([]);
    const [shake, setShake] = useState(false)

  // This function generates a random number between 1 and 100
  // We use this to create the secret number the player needs to guess
  function generateRandomNumber() {
    // Math.random() gives us a number between 0 and 1
 
    return Math.floor(Math.random() * 100) + 1
  }

  // This function sets up a new game
  function startNewGame() {
    // Generate a new secret number
    const newSecretNumber = generateRandomNumber()
    console.log("Secret number is: " + newSecretNumber) // This helps us cheat for testing!

    // Reset all our game variables
    setSecretNumber(newSecretNumber)
    setUserGuess("")
    setMessage("Make a guess!")
    setGameOver(false)
    setGameWon(false)
    setGuessHistory([])

    // Set the number of attempts based on difficulty
    if (difficulty === "easy") {
      setAttemptsLeft(15)
    } else if (difficulty === "medium") {
      setAttemptsLeft(10)
    } else {
      setAttemptsLeft(5)
    }
  }

  // This runs when the component first loads or when difficulty changes
  useEffect(() => {
    startNewGame()
  }, [difficulty])

  // This function handles when the player submits a guess
  function handleGuess() {
    // Convert the user's guess from a string to a number
    const guess = Number.parseInt(userGuess)

    // Check if the guess is valid
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setMessage("Please enter a valid number between 1 and 100!")
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    setGuessHistory([...guessHistory, guess])

    // Decrease the number of attempts left
    const newAttemptsLeft = attemptsLeft - 1
    setAttemptsLeft(newAttemptsLeft)

    // Check if the guess is correct
    if (guess === secretNumber) {
      setMessage("You won! The number was " + secretNumber)
      setGameOver(true)
      setGameWon(true)
    }
    // Check if the player is out of attempts
    else if (newAttemptsLeft === 0) {
      setMessage("Game over! The number was " + secretNumber)
      setGameOver(true)
    }
    // Give a hint if the guess is too high or too low
    else {
      if (guess < secretNumber) {
        setMessage("Too low! Try a higher number. Attempts left: " + newAttemptsLeft)
      } else {
        setMessage("Too high! Try a lower number. Attempts left: " + newAttemptsLeft)
      }
      setUserGuess("")
    }
  }

  // This function handles when the player changes their guess in the input field
  function handleInputChange(e) {
    setUserGuess(e.target.value)
  }

  // This function handles when the player presses Enter in the input field
  function handleKeyPress(e) {
    if (e.key === "Enter" && !gameOver) {
      handleGuess()
    }
  }

  // This function handles when the player changes the difficulty
  function handleDifficultyChange(value) {
    setDifficulty(value)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Guess the Number</CardTitle>
        <CardDescription className="text-center">I'm thinking of a number between 1 and 100</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="difficulty">Difficulty:</Label>
            <Select value={difficulty} onValueChange={handleDifficultyChange}>
              <SelectTrigger id="difficulty" className="w-[180px]">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy (15 attempts)</SelectItem>
                <SelectItem value="medium">Medium (10 attempts)</SelectItem>
                <SelectItem value="hard">Hard (5 attempts)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div
            className={`p-4 rounded-md ${gameWon ? "bg-green-100" : gameOver ? "bg-red-100" : "bg-gray-100"} ${shake ? "animate-shake" : ""}`}
          >
            <p className="text-center font-medium">
              {gameWon ? (
                <ThumbsUp className="inline mr-2" />
              ) : gameOver ? (
                <ThumbsDown className="inline mr-2" />
              ) : (
                <AlertCircle className="inline mr-2" />
              )}
              {message}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={userGuess}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter your guess"
              min="1"
              max="100"
              disabled={gameOver}
              className={shake ? "animate-shake" : ""}
            />
            <Button onClick={handleGuess} disabled={gameOver || userGuess === ""}>
              Guess
            </Button>
          </div>

          <div>
            <p>Attempts left: {attemptsLeft}</p>
            {guessHistory.length > 0 && (
              <div>
                <p>Your guesses: {guessHistory.join(", ")}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {gameOver && (
          <Button className="w-full" onClick={startNewGame}>
            Play Again
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

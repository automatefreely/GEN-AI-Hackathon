"use client"

import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Demo content
const demoContent = {
  videoId: 'cH4mYC91omg',
  questions: [
    {
      timestamp: 30,
      question: "What is the main topic of this video?",
      options: ['Cooking recipes', 'Web development', 'Machine learning'],
      correctAnswer: 'Machine learning'
    },
    {
      timestamp: 60,
      question: "What type of machine learning is discussed?",
      options: ['Supervised learning', 'Unsupervised learning', 'Reinforcement learning'],
      correctAnswer: 'Supervised learning'
    },
    {
      timestamp: 120,
      question: "What is the goal of machine learning according to the video?",
      options: ['To replace human jobs', 'To make predictions based on data', 'To create artificial intelligence'],
      correctAnswer: 'To make predictions based on data'
    }
  ]
}

export default function LearnPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showQuestion, setShowQuestion] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState(null)
  const [player, setPlayer] = useState(null)

  const currentQuestion = demoContent.questions[currentQuestionIndex]

  useEffect(() => {
    const interval = setInterval(() => {
      if (player && currentQuestion) {
        const currentTime = Math.floor(player.getCurrentTime())
        if (currentTime === currentQuestion.timestamp) {
          player.pauseVideo()
          setShowQuestion(true)
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [player, currentQuestion])

  const onReady = (event) => {
    setPlayer(event.target)
  }

  const handleSubmit = () => {
    const correct = selectedAnswer === currentQuestion.correctAnswer
    setIsCorrect(correct)
    if (correct) {
      setTimeout(() => {
        setShowQuestion(false)
        setSelectedAnswer('')
        setIsCorrect(null)
        setCurrentQuestionIndex((prev) => prev + 1)
        player.playVideo()
      }, 2000) // Automatically play video after 2 seconds for correct answers
    }
  }

  const handleContinue = () => {
    setShowQuestion(false)
    setIsCorrect(null)
    setSelectedAnswer('')
    setCurrentQuestionIndex(prev => prev + 1)
    player.playVideo()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Learn: Machine Learning Basics</h1>
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <YouTube
          videoId={demoContent.videoId}
          onReady={onReady}
          opts={{
            width: '100%',
            height: '500px',
            playerVars: {
              autoplay: 1,
              controls: 1,
              modestbranding: 1,
              rel: 0,
            },
          }}
        />
      </div>
      {showQuestion && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            {isCorrect === null ? (
              <Button onClick={handleSubmit}>Submit</Button>
            ) : (
              <>
                <p className={isCorrect ? "text-green-500" : "text-red-500"}>
                  {isCorrect ? "Correct!" : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`}
                </p>
                <Button onClick={handleContinue} className="ml-4">Continue</Button>
              </>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

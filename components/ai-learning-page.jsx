'use client';
import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Brain, Send, BookOpen, BarChart, Sparkles, User, Mic, Volume2 } from "lucide-react";
import Link from "next/link"
import { motion, AnimatePresence } from 'framer-motion'

export default function AiLearningPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hello! I'm your AI tutor. What would you like to learn today?" }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [learningStyle, setLearningStyle] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const chatContainerRef = useRef(null)
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        handleSendMessage(transcript)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    };
  }, [])

  const handleSendMessage = (message = inputMessage) => {
    if (message.trim() === '') return

    const newMessages = [
      ...messages,
      { role: 'user', content: message }
    ]
    setMessages(newMessages)
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false)
      const aiResponse = generateAIResponse(message)
      setMessages([...newMessages, { role: 'ai', content: aiResponse }])
      speakResponse(aiResponse)
    }, 1500)
  }

  const generateAIResponse = (userMessage) => {
    // This is a simplified AI response generation.
    // In a real application, this would involve calling an AI service.
    const responses = [
      `That's an interesting question about ${selectedSubject}. Let's explore it further.`,
      `Great! I'll explain that concept in a way that suits your ${learningStyle} learning style.`,
      `To understand this better, let's break it down into smaller parts.`,
      `Here's an example that might help illustrate this concept.`,
      `Based on what we've discussed so far, can you try to explain this back to me?`
    ]
    return responses[Math.floor(Math.random() * responses.length)];
  }

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop()
    } else {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch (error) {
        console.error('Error starting speech recognition:', error)
      }
    }
  }

  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    }
  }

  return (
    (<div
      className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <header
        className="px-4 lg:px-6 h-14 flex items-center border-b bg-white dark:bg-gray-800 shadow-sm">
        <Link className="flex items-center justify-center" href="#">
          <Brain className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">AI Tutor</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:text-primary transition-colors"
            href="#">
            Dashboard
          </Link>
          <Link
            className="text-sm font-medium hover:text-primary transition-colors"
            href="#">
            Progress
          </Link>
          <Link
            className="text-sm font-medium hover:text-primary transition-colors"
            href="#">
            Settings
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div
          className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Interactive AI Learning</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Engage with our AI tutor for a personalized learning experience. Select your subject and preferred learning style to get started.
            </p>
            <div className="space-y-2 relative z-10">
              <Select onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="literature">Literature</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={setLearningStyle}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your learning style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visual">Visual</SelectItem>
                  <SelectItem value="auditory">Auditory</SelectItem>
                  <SelectItem value="reading">Reading/Writing</SelectItem>
                  <SelectItem value="kinesthetic">Kinesthetic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="w-full overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Chat with AI Tutor</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Ask questions, get explanations, and deepen your understanding. You can type or use voice input!
                    </p>
                  </div>
                  <div
                    ref={chatContainerRef}
                    className="h-[400px] overflow-y-auto border rounded-lg p-4 space-y-4 bg-white dark:bg-gray-900">
                    <AnimatePresence>
                      {messages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div
                            className={`flex items-start space-x-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div
                              className={`rounded-full p-2 ${message.role === 'user' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}>
                              {message.role === 'user' ? <User className="h-4 w-4 text-white" /> : <Brain className="h-4 w-4 text-primary" />}
                            </div>
                            <div
                              className={`rounded-lg p-3 max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-800'}`}>
                              {message.content}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: '0.2s' }}></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type your message here..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1" />
                    <Button
                      onClick={() => handleSendMessage()}
                      className="rounded-full w-10 h-10 p-2">
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                    <Button
                      onClick={toggleListening}
                      className={`rounded-full w-10 h-10 p-2 ${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}>
                      <Mic className="h-4 w-4" />
                      <span className="sr-only">{isListening ? 'Stop listening' : 'Start listening'}</span>
                    </Button>
                    {isSpeaking && (
                      <div
                        className="flex items-center justify-center rounded-full w-10 h-10 bg-primary">
                        <Volume2 className="h-4 w-4 text-white animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">Your Learning Journey</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex flex-col items-center space-y-2">
                  <BookOpen className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold text-center">Adaptive Curriculum</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Our AI tailors the learning material to your pace and style, ensuring optimal comprehension.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex flex-col items-center space-y-2">
                  <BarChart className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold text-center">Progress Tracking</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Monitor your learning progress with detailed analytics and personalized insights.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex flex-col items-center space-y-2">
                  <Sparkles className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold text-center">Intelligent Feedback</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Receive instant, constructive feedback to reinforce your learning and correct misconceptions.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      <section
        className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/20 to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Enhance Your Learning?</h2>
              <p
                className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Start your personalized learning journey with our AI tutor today. Experience the future of education!
              </p>
            </div>
            <Button size="lg" className="rounded-full">
              Begin Your Learning Adventure
            </Button>
          </div>
        </div>
      </section>
      <footer
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 AI Tutor. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Cookie Policy
          </Link>
        </nav>
      </footer>
    </div>)
  );
}
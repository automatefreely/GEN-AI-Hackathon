

const lessonData = [
  // ... (your existing lessonData array)
];



export default function StartLesson() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const id = params.id;
    const lessonId = searchParams.get("lessonId");
    const index = searchParams.get("index");

    setData({
      index: index,
      lessonId: lessonId,
      title: `Lesson ${lessonId}`,
    });

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [params.id, searchParams]);

  if (!data) {
    return <div>Loading...</div>;
  }

  // ... (rest of your component logic)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-1 py-12 px-8">
        <h1 className="text-3xl font-bold mb-6">{lessonData[data.index].name}</h1>
        <Card className="mb-8">
          <CardContent className="p-6">
            {isLoading ? (
              <div className="h-40 flex items-center justify-center">
                <motion.div
                  className="w-4 h-4 bg-blue-500 rounded-full"
                  animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              </div>
            ) : (
              <TypingAnimation text={lessonData[data.index].explanation} />
            )}
          </CardContent>
        </Card>
        {!quizCompleted ? (
          <Button onClick={handleStartQuiz}>Test Your Knowledge</Button>
        ) : (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Quiz Results</h2>
              <p className="text-lg mb-4">
                You scored {score} out of {lessonData[data.index].quiz.length}{" "}
                questions correctly.
              </p>
              {score >= 3 ? (
                <Link
                  href={{
                    pathname: `/startLesson`,
                    query: {
                      index: parseInt(data.index) + 1,
                    },
                  }}
                >
                  <Button>Next Lesson</Button>
                </Link>
              ) : (
                <Link href="/learn">
                  <Button>Learn With Video</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
        <Dialog open={showQuiz} onOpenChange={setShowQuiz}>
          {/* ... (your existing Dialog content) */}
        </Dialog>
      </main>
      <Footer />
    </div>
  );
}
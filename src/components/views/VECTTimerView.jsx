import { useState, useEffect, useRef } from "react"
import { Button } from "../ui/Button_V2"
import React from "react"
import { Play, Pause, Square, SkipForward, Dumbbell, Target, Zap, Flame, Heart, Volume2, VolumeX } from "lucide-react"

const workoutData = [
  {
    name: "Push-ups",
    duration: 45,
    muscleGroup: "💪 Chest",
    secondaryMuscles: "Triceps, Shoulders",
    icon: <Dumbbell className="w-5 h-5" />,
    caloriesPerSecond: 0.15,
  },
  {
    name: "Mountain Climbers",
    duration: 30,
    muscleGroup: "🔥 Core",
    secondaryMuscles: "Shoulders, Legs",
    icon: <Target className="w-5 h-5" />,
    caloriesPerSecond: 0.2,
  },
  {
    name: "Burpees",
    duration: 40,
    muscleGroup: "⚡ Full Body",
    secondaryMuscles: "All muscles",
    icon: <Zap className="w-5 h-5" />,
    caloriesPerSecond: 0.25,
  },
  {
    name: "Plank Hold",
    duration: 60,
    muscleGroup: "🔥 Core",
    secondaryMuscles: "Shoulders, Back",
    icon: <Target className="w-5 h-5" />,
    caloriesPerSecond: 0.1,
  },
  {
    name: "Jump Squats",
    duration: 35,
    muscleGroup: "🦵 Legs",
    secondaryMuscles: "Glutes, Core",
    icon: <Dumbbell className="w-5 h-5" />,
    caloriesPerSecond: 0.18,
  },
]

const motivationalMessages = [
  "Keep pushing!",
  "You've got this!",
  "Stay strong!",
  "Almost there!",
  "Feel the burn!",
  "Don't give up!",
]

const heartRateZones = [
  { zone: 1, name: "Recovery", range: "50-60%" },
  { zone: 2, name: "Aerobic", range: "60-70%" },
  { zone: 3, name: "Tempo", range: "70-80%" },
  { zone: 4, name: "Threshold", range: "80-90%" },
  { zone: 5, name: "VO2 Max", range: "90-100%" },
]

export default function VECTTimerView() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentRound, setCurrentRound] = useState(1)
  const [totalRounds] = useState(3)
  const [timeLeft, setTimeLeft] = useState(workoutData[0].duration)
  const [isRunning, setIsRunning] = useState(false)
  const [isResting, setIsResting] = useState(false)
  const [restTime] = useState(15)
  const [motivationMessage, setMotivationMessage] = useState(motivationalMessages[0])
  const [caloriesBurned, setCaloriesBurned] = useState(0)
  const [currentHeartRateZone, setCurrentHeartRateZone] = useState(3)
  const [workoutStartTime, setWorkoutStartTime] = useState(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false)
  const [showSoundWave, setShowSoundWave] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [exerciseKey, setExerciseKey] = useState(0)
  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  const currentExercise = workoutData[currentExerciseIndex]
  const nextExercise = workoutData[(currentExerciseIndex + 1) % workoutData.length]
  const totalExercises = workoutData.length * totalRounds
  const completedExercises = (currentRound - 1) * workoutData.length + currentExerciseIndex
  const overallProgress = (completedExercises / totalExercises) * 100

  const remainingExercises = totalExercises - completedExercises

  const calculateRemainingTime = () => {
    if (isWorkoutComplete) return 0

    let remainingSeconds = timeLeft

    if (isResting) {
      // During rest, add remaining time for current round starting from current exercise
      for (let i = currentExerciseIndex; i < workoutData.length; i++) {
        remainingSeconds += workoutData[i].duration
        // Add rest time only if not the last exercise of the workout
        if (!(currentRound === totalRounds && i === workoutData.length - 1)) {
          remainingSeconds += restTime
        }
      }
    } else {
      // During work, add remaining time for current round starting from next exercise
      for (let i = currentExerciseIndex + 1; i < workoutData.length; i++) {
        remainingSeconds += workoutData[i].duration
        // Add rest time only if not the last exercise of the workout
        if (!(currentRound === totalRounds && i === workoutData.length - 1)) {
          remainingSeconds += restTime
        }
      }
    }

    // Add time for remaining rounds
    const remainingRounds = totalRounds - currentRound
    if (remainingRounds > 0) {
      const roundDuration = workoutData.reduce((sum, ex) => sum + ex.duration, 0) + (workoutData.length - 1) * restTime
      remainingSeconds += remainingRounds * roundDuration
    }

    return Math.max(0, remainingSeconds)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getContextualMessage = () => {
    if (isWorkoutComplete) return "BRAVO! Workout Complete! 🎉"

    const progressPercent = overallProgress
    if (progressPercent >= 90) return "Final push! 💥"
    if (progressPercent >= 80) return "Almost done! 🔥"
    if (progressPercent >= 50) return "Halfway there! 💪"
    return motivationMessage
  }

  const playCountdownSound = () => {
    if (!isMuted && timeLeft <= 3 && timeLeft > 0) {
      setShowSoundWave(true)
      // Create a simple beep sound using Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = timeLeft === 1 ? 800 : 600
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)

      setTimeout(() => setShowSoundWave(false), 300)
    }
  }

  // Calculate circular progress
  const maxTime = isResting ? restTime : currentExercise.duration
  const progress = ((maxTime - timeLeft) / maxTime) * 100
  const circumference = 2 * Math.PI * 140
  const strokeDashoffset = circumference - (progress / 100) * circumference

  useEffect(() => {
    if (isRunning && timeLeft > 0 && !isWorkoutComplete) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1
          if (newTime <= 3 && newTime > 0) {
            playCountdownSound()
          }
          return newTime
        })

        if (!isResting) {
          setCaloriesBurned((prev) => prev + currentExercise.caloriesPerSecond)
          // Simulate heart rate zone changes based on exercise intensity
          const intensity = currentExercise.caloriesPerSecond
          if (intensity > 0.2) setCurrentHeartRateZone(4)
          else if (intensity > 0.15) setCurrentHeartRateZone(3)
          else setCurrentHeartRateZone(2)
        }
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft, isResting, currentExercise, isWorkoutComplete, isMuted])

  useEffect(() => {
    if (timeLeft === 0 && !isWorkoutComplete) {
      setIsTransitioning(true)

      setTimeout(() => {
        if (isResting) {
          setIsResting(false)
          const nextIndex = (currentExerciseIndex + 1) % workoutData.length

          if (nextIndex === 0) {
            if (currentRound < totalRounds) {
              setCurrentRound((prev) => prev + 1)
              setCurrentExerciseIndex(0)
              setTimeLeft(workoutData[0].duration)
            } else {
              setIsRunning(false)
              setIsWorkoutComplete(true)
              setMotivationMessage("BRAVO! Workout Complete! 🎉")
              setIsTransitioning(false)
              return
            }
          } else {
            setCurrentExerciseIndex(nextIndex)
            setTimeLeft(workoutData[nextIndex].duration)
          }
          setExerciseKey((prev) => prev + 1)
        } else {
          const isLastExercise = remainingExercises <= 1

          if (isLastExercise) {
            setIsRunning(false)
            setIsWorkoutComplete(true)
            setMotivationMessage("BRAVO! Workout Complete! 🎉")
            setIsTransitioning(false)
            return
          }

          setIsResting(true)
          setTimeLeft(restTime)
          setCurrentHeartRateZone(2)
          setMotivationMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)])
        }

        setIsTransitioning(false)
      }, 300) // Short delay for transition effect
    }
  }, [
    timeLeft,
    isResting,
    currentExerciseIndex,
    currentRound,
    totalRounds,
    restTime,
    remainingExercises,
    isWorkoutComplete,
  ])

  const toggleTimer = () => {
    if (isWorkoutComplete) return

    if (!isRunning && !workoutStartTime) {
      setWorkoutStartTime(new Date())
    }
    setIsRunning(!isRunning)
  }

  const skipExercise = () => {
    if (isWorkoutComplete) return

    if (isResting) {
      setIsResting(false)
      const nextIndex = (currentExerciseIndex + 1) % workoutData.length

      if (nextIndex === 0 && currentRound < totalRounds) {
        setCurrentRound((prev) => prev + 1)
      }

      setCurrentExerciseIndex(nextIndex)
      setTimeLeft(workoutData[nextIndex].duration)
    } else {
      if (remainingExercises <= 1) {
        setIsRunning(false)
        setIsWorkoutComplete(true)
        setMotivationMessage("BRAVO! Workout Complete! 🎉")
        return
      }

      setIsResting(true)
      setTimeLeft(restTime)
    }
  }

  const stopWorkout = () => {
    setIsRunning(false)
    setCurrentExerciseIndex(0)
    setCurrentRound(1)
    setTimeLeft(workoutData[0].duration)
    setIsResting(false)
    setMotivationMessage(motivationalMessages[0])
    setCaloriesBurned(0)
    setCurrentHeartRateZone(3)
    setWorkoutStartTime(null)
    setIsWorkoutComplete(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="min-h-screen warm-gradient text-warm-primary overflow-hidden grain-texture">
      <div className="relative z-10 p-8 flex flex-col min-h-screen warm-lighting">
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="dark-black-tile px-6 py-3 rounded-2xl text-center">
              <h1 className="text-4xl font-exercise-header text-white">HIIT WORKOUT</h1>
            </div>
            <Button
              onClick={toggleMute}
              size="sm"
              variant="ghost"
              className="glass-card-light text-warm-secondary hover:text-warm-primary hover:bg-white/20 relative border-0 rounded-xl p-3 world-class-button haptic-feedback"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              {showSoundWave && !isMuted && (
                <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <div className="w-1 h-3 bg-gradient-to-t from-[#f97316] to-[#dc2626] animate-pulse rounded-full"></div>
                  <div className="w-1 h-4 bg-gradient-to-t from-[#f97316] to-[#dc2626] animate-pulse delay-75 rounded-full"></div>
                  <div className="w-1 h-3 bg-gradient-to-t from-[#f97316] to-[#dc2626] animate-pulse delay-150 rounded-full"></div>
                </div>
              )}
            </Button>
          </div>

          {!isWorkoutComplete && (
            <div className="elevated-stat-card rounded-2xl p-6 mb-8 floating-element">
              <div className="text-2xl font-exercise-header gradient-text mb-4 shadow-lg rounded-md border-4 border-slate-300">
                ROUND {currentRound} OF {totalRounds}
              </div>

              <div className="grid grid-cols-2 gap-6 text-sm border-slate-300">
                <div className="text-center elevated-stat-card rounded-xl p-4 border-slate-400">
                  <div className="font-ui-label text-warm-muted mb-1">EXERCISES</div>
                  <div className="font-stats-number text-xl text-warm-primary">
                    {remainingExercises}/{totalExercises}
                  </div>
                </div>
                <div className="text-center elevated-stat-card rounded-xl p-4 border-slate-400">
                  <div className="font-ui-label text-warm-muted mb-1">TIME LEFT</div>
                  <div className="font-timer-digits text-xl text-warm-primary">
                    {formatTime(calculateRemainingTime())}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-6 text-sm">
                <div className="text-center elevated-stat-card rounded-xl p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Flame className="w-6 h-6 text-[#f97316] prominent-fire" />
                    <span className="font-stats-number text-xl text-[#f97316]">{Math.round(caloriesBurned)}</span>
                    <span className="font-ui-label text-warm-muted">CAL</span>
                  </div>
                </div>
                <div className="text-center elevated-stat-card rounded-xl p-4">
                  <div
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg hr-zone-${currentHeartRateZone}`}
                  >
                    <Heart className="w-5 h-5 text-white" />
                    <span className="font-stats-number text-lg text-white">ZONE {currentHeartRateZone}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full">
          {!isWorkoutComplete && (
            <div className="text-center mb-8 w-full">
              {!isResting && (
                <div
                  key={`current-${exerciseKey}`}
                  className={`${isTransitioning ? "exercise-exit-active" : "exercise-enter-active"} ${!isTransitioning ? "energetic-bounce" : ""}`}
                >
                  <h2 className="font-exercise-header text-4xl mb-4 text-warm-primary">
                    {currentExercise.name.toUpperCase()}
                  </h2>
                  <div className="glass-card-light rounded-2xl p-6">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      {currentExercise.icon}
                      <span className="font-body-athletic text-xl text-warm-primary">
                        {currentExercise.muscleGroup}
                      </span>
                    </div>
                    <div className="font-body-athletic text-sm text-warm-muted">{currentExercise.secondaryMuscles}</div>
                  </div>
                </div>
              )}

              {isResting && (
                <div className="phase-transition">
                  <h2 className="font-exercise-header text-4xl mb-4 text-warm-primary">REST TIME</h2>
                </div>
              )}
            </div>
          )}

          <div className={`relative mb-12 ${isRunning && !isWorkoutComplete ? "enhanced-breathing" : ""}`}>
            <svg className="w-80 h-80 transform -rotate-90" viewBox="0 0 320 320">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              <circle cx="160" cy="160" r="140" stroke="rgba(30, 41, 59, 0.1)" strokeWidth="2" fill="none" />
              <circle
                cx="160"
                cy="160"
                r="140"
                stroke={isWorkoutComplete ? "#10b981" : "url(#progressGradient)"}
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={isWorkoutComplete ? 0 : strokeDashoffset}
                className={`transition-all duration-1000 ease-linear world-class-ring smooth-transition ${
                  !isResting && !isWorkoutComplete ? "blue-work-glow" : ""
                }`}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {isWorkoutComplete ? (
                <div className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <div className="font-exercise-header text-2xl text-[#10b981]">COMPLETE!</div>
                </div>
              ) : (
                <>
                  <div className="font-timer-digits text-7xl mb-4 text-warm-primary smooth-transition">
                    {formatTime(timeLeft)}
                  </div>
                  <div
                    className={`font-ui-label text-sm px-6 py-2 rounded-full backdrop-blur-sm border smooth-transition ${
                      isResting
                        ? "bg-[#dc2626]/10 text-[#dc2626] border-[#dc2626]/20"
                        : "bg-[#2563eb]/10 text-[#2563eb] border-[#2563eb]/20"
                    }`}
                  >
                    {isResting ? "REST" : "WORK"}
                  </div>
                </>
              )}
            </div>
          </div>

          {!isWorkoutComplete && remainingExercises > 1 && (
            <div
              key={`next-${exerciseKey}`}
              className="glass-card-light rounded-2xl p-6 mb-12 w-full floating-element next-exercise-slide-in"
            >
              <div className="font-ui-label text-warm-muted mb-2">NEXT UP:</div>
              <div className="flex items-center justify-center gap-3">
                {nextExercise.icon}
                <span className="font-body-athletic text-warm-primary">{nextExercise.name.toUpperCase()}</span>
              </div>
            </div>
          )}

          <div className="flex gap-6 mb-12">
            <Button
              onClick={toggleTimer}
              size="lg"
              className={`enhanced-play-button font-body-athletic px-10 py-4 rounded-2xl text-lg world-class-button haptic-feedback ${
                isWorkoutComplete ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isWorkoutComplete}
            >
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            <Button
              onClick={skipExercise}
              size="lg"
              className="btn-secondary px-6 py-4 rounded-2xl world-class-button haptic-feedback"
              disabled={isWorkoutComplete}
            >
              <SkipForward className="w-6 h-6" />
            </Button>
            <Button
              onClick={stopWorkout}
              size="lg"
              className="glass-card-light border-[#dc2626]/30 text-[#dc2626] hover:bg-[#dc2626]/10 px-6 py-4 rounded-2xl world-class-button haptic-feedback"
            >
              <Square className="w-6 h-6" />
            </Button>
          </div>

          {!isWorkoutComplete && (
            <div className="w-full max-w-md">
              <div className="flex justify-between text-sm text-warm-muted mb-3">
                <span className="font-ui-label">WORKOUT PROGRESS</span>
                <span className="font-timer-digits">{Math.round(overallProgress)}%</span>
              </div>
              <div className="h-2 bg-black/5 rounded-full overflow-hidden backdrop-blur-sm leading-6 shadow-md">
                <div
                  className="h-full warm-progress-gradient rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

VECTTimerView.propTypes = {
  // No props are passed to this component, but adding PropTypes structure for future extensibility
}
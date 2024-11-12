// app/exercise/page.js

'use client';

import { useState, useEffect } from 'react';
import styles from './exercise.module.css';

const EXERCISES = [
  { name: 'Push-ups', duration: 30 },
  { name: 'Squats', duration: 30 },
  { name: 'Lunges', duration: 30 },
  { name: 'Rest', duration: 15 },
];

export default function ExercisePage() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXERCISES[0].duration);

  useEffect(() => {
    const timer =
      timeLeft > 0 &&
      setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

    if (timeLeft === 0) {
      const nextIndex = (currentExerciseIndex + 1) % EXERCISES.length;
      setCurrentExerciseIndex(nextIndex);
      setTimeLeft(EXERCISES[nextIndex].duration);
    }

    return () => clearInterval(timer);
  }, [timeLeft, currentExerciseIndex]);

  const currentExercise = EXERCISES[currentExerciseIndex];

  return (
    <main className={styles.main}>
      <div className={styles.timer}>{timeLeft}s</div>
      <div className={styles.exerciseName}>
        {currentExercise.name === 'Rest' ? (
          <>
            <h2>REST</h2>
            <p>Next: {EXERCISES[(currentExerciseIndex + 1) % EXERCISES.length].name}</p>
          </>
        ) : (
          <h2>{currentExercise.name}</h2>
        )}
      </div>
    </main>
  );
}

// app/exercise/page.js

'use client';

import { useState, useEffect } from 'react';
import styles from './exercise.module.css';

const EXERCISES = [
  { name: 'Push-ups', duration: 3 },
  { name: 'Squats', duration: 3 },
  { name: 'Lunges', duration: 3 },
];

export default function ExercisePage() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXERCISES[0].duration);
  const [isRest, setIsRest] = useState(false);

  useEffect(() => {
    let timer = null;

    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else {
      clearInterval(timer);

      if (isRest) {
        // Rest period is over, move to next exercise
        const nextIndex = currentExerciseIndex + 1;
        if (nextIndex < EXERCISES.length) {
          setCurrentExerciseIndex(nextIndex);
          setTimeLeft(EXERCISES[nextIndex].duration);
          setIsRest(false);
        } else {
          // Workout is complete
          // Reset or handle completion as desired
          setCurrentExerciseIndex(0);
          setTimeLeft(EXERCISES[0].duration);
          setIsRest(false);
        }
      } else {
        // Exercise period is over, start rest period
        setIsRest(true);
        setTimeLeft(1); // Rest duration of 1 second
      }
    }

    return () => clearInterval(timer);
  }, [timeLeft, isRest]);

  const currentExercise = EXERCISES[currentExerciseIndex];

  return (
    <main className={styles.main}>
      <div className={styles.timer}>{timeLeft}s</div>
      <div className={styles.exerciseName}>
        {isRest ? (
          <>
            <h2>REST</h2>
            <p>
              Next: {EXERCISES[currentExerciseIndex + 1] ? EXERCISES[currentExerciseIndex + 1].name : 'Workout Complete'}
            </p>
          </>
        ) : (
          <h2>{currentExercise.name}</h2>
        )}
      </div>
      <div className={styles.exerciseFooter}>
        <button className={styles.skipButton} onClick={() => setTimeLeft(0)}>Skip</button>
      </div>
    </main>
  );
}

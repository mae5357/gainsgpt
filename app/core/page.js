// app/exercise/page.js

'use client';

import { useState, useEffect } from 'react';
import styles from './core.module.css';

const EXERCISES = [
  { name: 'bird dogs', duration: 30 },
  { name: 'Side planks w/dips', duration: 30 },
  { name: 'Russian twists', duration: 30 },
  { name: 'Pushups', duration: 30 },
  { name: '6 inches', duration: 30 },
];

const BACKGROUND_COLORS = [
  "#CE8964",
  "#5f5aa2ff",
  "#355691ff",
  "#88A0A8",
  "#D16666",
];

const restDuration = 10;

export default function CorePage() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXERCISES[0].duration);
  const [isRest, setIsRest] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(BACKGROUND_COLORS[0]);

  useEffect(() => {
    let timer = null;
    let backgroundColorIndex = 0;

    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else {
      clearInterval(timer);
      backgroundColorIndex = currentExerciseIndex * 2 % BACKGROUND_COLORS.length;
      setBackgroundColor(BACKGROUND_COLORS[backgroundColorIndex]);

      if (isRest) {
        // background color change
        backgroundColorIndex = (currentExerciseIndex * 2 + 1) % BACKGROUND_COLORS.length;
        setBackgroundColor(BACKGROUND_COLORS[backgroundColorIndex]);

        // Rest period is over, move to next exercise
        const nextIndex = currentExerciseIndex + 1;

        // Check if there are more exercises
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
        setTimeLeft(restDuration); // Rest duration of 1 second
      }
    }

    return () => clearInterval(timer);
  }, [timeLeft, isRest]);

  const currentExercise = EXERCISES[currentExerciseIndex];

  return (
    <main className={styles.main} style={{ backgroundColor }}>
      <div className={styles.timer} style={{ backgroundColor }}>{timeLeft}s</div>
      <div className={styles.exerciseName} style={{ backgroundColor }}>
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

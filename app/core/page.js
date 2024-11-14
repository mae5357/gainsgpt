// app/exercise/page.js

'use client';

import { useState, useEffect } from 'react';
import styles from './core.module.css';
import useGoogleSheetData from '../components/GoogleSheetData.js';

const BACKGROUND_COLORS = [
  "#CE8964",
  "#5f5aa2ff",
  "#355691ff",
  "#88A0A8",
  "#D16666",
];

const sheetId = '1uaGTy7ZnJrpFcrxW4p8NPvm3Sv7wJXLIMOg8IvBGyJ8';
const range = 'Sheet1!A2:B5';
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export default function CorePage() {
  const { data, error } = useGoogleSheetData({ sheetId, range, apiKey });

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // Default initial duration
  const [isRest, setIsRest] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(BACKGROUND_COLORS[0]);
  const restDuration = 1;

  const EXERCISES = data 
    ? data.map((row) => ({ name: row[0], duration: parseInt(row[1], 10) }))
    : []; 

    console.log(EXERCISES);

  useEffect(() => {
    if (!data || EXERCISES.length === 0) return;

    setTimeLeft(EXERCISES[currentExerciseIndex].duration);

    let timer = null;
    let backgroundColorIndex = 0;

    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else {
      clearInterval(timer);
      backgroundColorIndex = (currentExerciseIndex * 2) % BACKGROUND_COLORS.length;
      setBackgroundColor(BACKGROUND_COLORS[backgroundColorIndex]);

      if (isRest) {
        backgroundColorIndex = (currentExerciseIndex * 2 + 1) % BACKGROUND_COLORS.length;
        setBackgroundColor(BACKGROUND_COLORS[backgroundColorIndex]);

        const nextIndex = currentExerciseIndex + 1;

        if (nextIndex < EXERCISES.length) {
          setCurrentExerciseIndex(nextIndex);
          setTimeLeft(EXERCISES[nextIndex].duration);
          setIsRest(false);
        } else {
          setCurrentExerciseIndex(0);
          setTimeLeft(EXERCISES[0].duration);
          setIsRest(false);
        }
      } else {
        setIsRest(true);
        setTimeLeft(restDuration);
      }
    }

    return () => clearInterval(timer);
  }, [timeLeft, isRest, data]);

  if (error) return <p>Error loading exercises.</p>;

  if (!data || EXERCISES.length === 0) return <p>Loading...</p>;

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
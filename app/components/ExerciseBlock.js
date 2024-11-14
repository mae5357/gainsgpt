// app/components/ExerciseBlock.js
import styles from './ExerciseBlock.module.css';

export default function ExerciseBlock({ exercise }) {
    return (
        <div className={styles.exerciseBlock}>
            <h2>{exercise.name}</h2>
            <div className={styles.exerciseDetails}>
                <p>
                    <strong>Weight:</strong> {exercise.weight} lbs
                </p>
            
                {exercise.image && (
                <img src={exercise.image} alt={`${exercise.name} illustration`} className={styles.exerciseImage} />
            )}
                <p>
                    <strong>Reps:</strong> {exercise.reps}
                </p>
            </div>


        </div>
    );
}

import ExerciseBlock from "../components/exerciseBlock";
import styles from './lift.module.css';

export default function LiftPage() {
    return (
        <main className={styles.main}>
        <ExerciseBlock exercise={{ name: 'Squat', weight: '50', reps: '5', image: '/globe.svg'}} />
        <ExerciseBlock exercise={{ name: 'Dead Lift', weight: '75', reps: '5', image: '/next.svg'}} />

        </main>
    );
    }

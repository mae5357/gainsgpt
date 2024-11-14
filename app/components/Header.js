import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Workout</h1>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/core">Core</Link>
          </li>
          <li>
            <Link href="/lift">Lift</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

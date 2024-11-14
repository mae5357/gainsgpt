import './globals.css';
import styles from './globals.css';
import Header from './components/Header';

export const metadata = {
  title: 'workout gpt',
  description: 'ai for workouts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.RootLayout}>
        <Header />
        {children}
      </body>
    </html>
  );
}

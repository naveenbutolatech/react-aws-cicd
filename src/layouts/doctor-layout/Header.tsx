import styles from './doctor.module.css'

interface HeaderProps {
  onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  return (
    <div className={styles.container}>
      <h1>Header</h1>
      <button onClick={onLogout} className={styles.logoutButton}>Logout</button>
    </div>
  );
}


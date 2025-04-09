
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import styles from './dashboard.module.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
}


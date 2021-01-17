import { signOut } from '@lib/firebase';
import { useAuth } from '@contexts/auth';
import styles from './Layout.module.scss';

const Layout = ({ children }) => {
  const [user] = useAuth();

  return (
    <div className={styles.Layout}>
      <nav>
        <span>
          <a href="/">My Next.js Blog</a>
        </span>
        {user && (
          <span>
            <button onClick={() => signOut()}>Sign Out</button>
          </span>
        )}
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;

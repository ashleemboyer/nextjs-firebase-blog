import styles from './Layout.module.scss';

const Layout = ({ children }) => (
  <div className={styles.Layout}>
    <nav>
      <span>
        <a href="/">My Next.js Blog</a>
      </span>
    </nav>
    <main>{children}</main>
  </div>
);

export default Layout;

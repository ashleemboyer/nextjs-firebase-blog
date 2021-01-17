import { useRouter } from 'next/router';
import styles from '@styles/post.module.scss';

const PostPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className={styles.PostPage}>
      <h1>Hello, from post: {slug}!</h1>
    </div>
  );
};

export default PostPage;

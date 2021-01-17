import { useRouter } from 'next/router';
import { getPostBySlug } from '@lib/firebase';
import { getFormattedDate } from '@lib/utils';
import { Layout } from '@components';
import styles from '@styles/post.module.scss';

const PostPage = ({ post }) => {
  const router = useRouter();

  if (!post && typeof window !== 'undefined') {
    router.push('/404');
    return;
  }

  if (!post) {
    return null;
  }

  return (
    <Layout>
      <div className={styles.PostPage}>
        <img src={post.coverImage} alt={post.coverImageAlt} />
        <h1>{post.title}</h1>
        <span>Published {getFormattedDate(post.dateCreated)}</span>
        <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const post = await getPostBySlug(context.query.slug);

  return {
    props: {
      post,
    },
  };
}

export default PostPage;

import { useRouter } from 'next/router';
import { getPostBySlug } from '@lib/firebase';
import { getFormattedDate } from '@lib/utils';
import { useAuth } from '@contexts/auth';
import { Icon, Layout } from '@components';
import styles from '@styles/post.module.scss';

const PostPage = ({ post }) => {
  const router = useRouter();
  const [user] = useAuth();

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
        <div>
          <h1>{post.title}</h1>
          {user && (
            <span>
              <a href={`/edit/${post.slug}`}>
                <Icon name="pencil-alt" />
              </a>
              <button
                onClick={() => {
                  const shouldDeletePost = confirm(
                    'Are you sure you want to delete this post?',
                  );
                  if (shouldDeletePost) {
                    deletePost(post.slug).then(() => {
                      router.push('/');
                    });
                  }
                }}
              >
                <Icon name="trash-alt" />
              </button>
            </span>
          )}
        </div>
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

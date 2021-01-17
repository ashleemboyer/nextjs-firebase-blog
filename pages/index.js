// This component represents the index page for the site. You
// can read more about Pages in the Next.js docs at:
// https://nextjs.org/docs/basic-features/pages

import { getPosts } from '@lib/firebase';
import { getFormattedDate } from '@lib/utils';
import { Layout } from '@components';
import styles from '@styles/index.module.scss';

const HomePage = ({ posts }) => (
  <Layout>
    <div className={styles.HomePage}>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <article key={post.slug}>
          <img src={post.coverImage} alt={post.coverImageAlt} />
          <div>
            <h2>{post.title}</h2>
            <span>{getFormattedDate(post.dateCreated)}</span>
            <p
              dangerouslySetInnerHTML={{
                __html: `${post.content.substring(0, 200)}...`,
              }}
            ></p>
            <a href={`/post/${post.slug}`}>Continue Reading</a>
          </div>
        </article>
      ))}
    </div>
  </Layout>
);

export async function getServerSideProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}

export default HomePage;

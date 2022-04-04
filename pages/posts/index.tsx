import React, {useEffect} from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import {Post} from 'src/entity/Post';
import Link from 'next/link';

type Props = {
  posts: Post[]
}

const PostsIndex: NextPage<Props> = (props) => {
  const {posts} = props;
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(post =>
        <div key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <a>
              {post.title}
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connect = await getDatabaseConnection();
  const posts = await connect.manager.find(Post);
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  };
};

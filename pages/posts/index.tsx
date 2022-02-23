import {GetStaticProps, NextPage} from 'next';
import {Post, usePosts} from '../../hooks/usePosts';
import React from 'react';
import getPosts from '../../lib/posts';
import posts from '../../lib/posts';
import Link from 'next/link';

// 客户端渲染
/*const PostsIndex: NextPage = () => {
  const {isLoading,posts} = usePosts()
  return (
    <div>
      <h1>文章列表</h1>
      {isLoading ? <div>加载中</div> :
        posts.map(p => <div key={p.id}>
          {p.id}
        </div>)}
    </div>
  );
};*/

// SSG
type Props = {
  posts: Post[]
}
const PostsIndex: NextPage<Props> = (props) => {
  const {posts} = props;
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(p => <div key={p.id}>
        <Link href={`/posts/${p.id}`}>
          <a>{p.id}</a>
        </Link>
      </div>)}
    </div>
  );
};

export default PostsIndex;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  };
};

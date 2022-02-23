import React from 'react';
import {getPost, getPostIds} from '../../lib/posts';
import {NextPage} from 'next';
import {Post} from 'hooks/usePosts';

type Props = {
  post: Post
}

const PostsShow: NextPage<Props> = (props) => {
  const {post} = props;
  return (
    <div>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{__html: post.htmlContent}}>
      </article>
    </div>
  );
};

export default PostsShow;

export const getStaticPaths = async () => {
  const idList = await getPostIds();
  return {
    paths: idList.map(id => ({
      params: {id}
    })),
    fallback: false
  };
};

export const getStaticProps = async (x: any) => {
  const id = x.params.id;
  const post = await getPost(id);
  return {
    props: {
      post: JSON.parse(JSON.stringify(post))
    }
  };
};

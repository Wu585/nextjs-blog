import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';

type Props = {
  post: Post
}

const PostsShow: NextPage<Props> = (props) => {
  const {post} = props;
  return (
    <div>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{__html: post.content}}>
      </article>
    </div>
  );
};

export default PostsShow;

export const getServerSideProps: GetServerSideProps<any, { id: string }> = async (context) => {
  const id = context.params.id;
  const connect = await getDatabaseConnection();
  const post = await connect.manager.findOne(Post, id);
  return {
    props: {
      post: JSON.parse(JSON.stringify(post))
    }
  };
};

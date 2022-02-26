import React from 'react';
import {UAParser} from 'ua-parser-js';
import {GetServerSideProps, NextPage} from 'next';
import {getDatabaseConnection} from '../lib/getDatabaseConnection';
import {Post} from '../src/entity/Post';

type Props = {
  posts: Post[]
}

const Index: NextPage<Props> = (props) => {
  const {posts} = props;
  return (
    <div>
      {posts.map(post => <div key={post.id}>{post.title}</div>)}
    </div>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connect = await getDatabaseConnection();
  const posts = await connect.manager.find(Post);
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  };
};

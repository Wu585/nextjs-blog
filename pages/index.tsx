import React, {useEffect} from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {getDatabaseConnection} from '../lib/getDatabaseConnection';
import {Post} from '../src/entity/Post';
import Link from 'next/link';
import axios from 'axios';

type Props = {
  posts: Post[]
}

const Index: NextPage<Props> = (props) => {
  const {posts} = props;
  useEffect(()=>{
    axios.get('/api/v1/test').then(res=>{
      console.log('res');
      console.log(res);
    })
  },[])

  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(post =>
        <Link key={post.id} href={`/posts/${post.id}`}>
          <a>
            {post.title}
          </a>
        </Link>
      )}
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

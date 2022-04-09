import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';
import {marked} from 'marked';

type Props = {
  post: Post
}

const PostsShow: NextPage<Props> = (props) => {
  const {post} = props;
  return (
    <>
      <div className="wrapper">
        <h1>{post.title}</h1>
        <article className="markdown-body" dangerouslySetInnerHTML={{__html: marked(post.content)}}>
        </article>
      </div>
      <style jsx>{`
        .wrapper {
          padding: 16px 24px;
        }

        h1 {
          text-align: center;
          border-bottom: 1px solid #ccc;
        }

        .markdown-body {
          font-size: 16px;
          line-height: 1.5;
          word-break: break-word;
          word-wrap: break-word;
          color: #24292e;
          background-color: #fff;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </>
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

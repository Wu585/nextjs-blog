import React, {useCallback} from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';
import {marked} from 'marked';
import Link from 'next/link';
import axios from 'axios';

type Props = {
  post: Post,
  id: number
}

const PostsShow: NextPage<Props> = (props) => {
  const {post, id} = props;
  const onDelete = useCallback(() => {
    axios.delete(`/api/v1/posts/${id}`).then(() => {
      window.alert('删除成功');
      window.location.href = '/posts';
    });
  }, [id]);
  return (
    <>
      <div className="wrapper">
        <header>
          <h1>{post.title}</h1>
          <p className="actions">
            <Link href={{
              pathname: '/posts/[id]/edit',
              query: {id}
            }}>
              <a>编辑</a>
            </Link>
            <span style={{color: '#00adb5', borderBottom: '1px solid', cursor: 'pointer'}} onClick={onDelete}>删除</span>
          </p>
        </header>
        <article className="markdown-body" dangerouslySetInnerHTML={{__html: marked(post.content)}}>
        </article>
      </div>
      <style jsx>{`
        .actions > * {
          margin: 4px;
        }

        .actions > *:first-child {
          margin-left: 0;
        }

        .wrapper {
          padding: 16px 24px;
          max-width: 800px;
          margin: 16px auto;
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
      post: JSON.parse(JSON.stringify(post)),
      id
    }
  };
};

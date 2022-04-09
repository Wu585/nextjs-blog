import React from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';
import Link from 'next/link';
import qs from 'qs';
import usePager from '../../hooks/usePager';
import {withSession} from '../../lib/withSession';

type Props = {
  posts: Post[],
  perPageCount: number,
  page: number,
  totalPages: number,
}

const PostsIndex: NextPage<Props> = (props) => {
  const {posts, page, totalPages} = props;
  const {pager} = usePager({
    page,
    totalPages
  });
  return (
    <>
      <div className="posts">
        <h1>文章列表</h1>
        {posts.map(post =>
          <div key={post.id} className="onePost">
            <Link href={`/posts/${post.id}`}>
              <a>
                {post.title}
              </a>
            </Link>
          </div>
        )}
        <footer>
          {pager}
        </footer>
      </div>
      <style jsx>{`
        .posts {
          max-width: 800px;
          margin: 0 auto;
          padding: 16px;
        }

        .onePost {
          border-bottom: 1px solid #ddd;
          padding: 8px 0;
        }

        .onePost > a {
          border-bottom: none;
          color: #000;
        }

        .onePost > a:hover {
          color: #00adb5;
        }
      `}</style>
    </>
  );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  // @ts-ignore
  const query = qs.parse(context.req.url.split('?')[1]);  // 获取url中的参数
  const page = parseInt(query.page as string) || 1; // 如果没有page参数，默认为1
  const perPageCount = 10;
  const connect = await getDatabaseConnection();
  // @ts-ignore
  const user = context.req.session.get('currentUser');
  const [posts, count] = await connect.manager.findAndCount(Post, {
    skip: (page - 1) * perPageCount,
    take: perPageCount,
    where: {
      authorId: user.id
    }
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      perPageCount,
      page,
      totalPages: Math.ceil(count / perPageCount)
    }
  };
});

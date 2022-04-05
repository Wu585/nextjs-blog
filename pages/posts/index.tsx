import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import {Post} from 'src/entity/Post';
import Link from 'next/link';
import qs from 'querystring';
import usePager from '../../hooks/usePager';

type Props = {
  posts: Post[],
  count: number,
  perPageCount: number,
  page: number,
  totalPages: number,
}

const PostsIndex: NextPage<Props> = (props) => {
  const {posts,page,totalPages} = props;
  const {pager} = usePager({
    page,
    totalPages
  })
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
      <footer>
        {pager}
      </footer>
    </div>
  );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connect = await getDatabaseConnection();
  const query = qs.parse(context.req.url.split('?')[1]);  // 获取url中的参数
  const page = parseInt(query.page as string) || 1; // 如果没有page参数，默认为1
  const perPageCount = 1;
  const [posts, count] = await connect.manager.findAndCount(Post, {
    skip: (page - 1) * perPageCount,
    take: perPageCount
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      count,
      perPageCount,
      page,
      totalPages: Math.ceil(count / perPageCount)
    }
  };
};

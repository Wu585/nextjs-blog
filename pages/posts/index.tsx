import {NextPage} from 'next';
import {usePosts} from '../../hooks/usePosts';
import React from 'react';

const PostsIndex: NextPage = () => {
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
};

export default PostsIndex;

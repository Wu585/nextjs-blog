import {useEffect, useState} from 'react';
import axios from 'axios';

export type Post = {
  id: string,
  title: string,
  date: string,
  content: string,
  htmlContent: string
}

export const usePosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/v1/posts').then(res => {
        setPosts(res.data);
        setIsLoading(false);
      }
    );
  }, []);
  return {isLoading, setIsLoading, posts, setPosts};
};

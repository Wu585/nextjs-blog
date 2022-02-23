import fs, {promises as fsPromise} from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {marked} from 'marked';

const markdownDir = path.join(process.cwd(), 'markdown');

const getPosts = async () => {
  const fileNames = await fsPromise.readdir(markdownDir);
  return fileNames.map(fileName => {
    const fullPath = path.join(markdownDir, fileName);
    const id = fileName.replace(/\.md$/g, '');  //文件名
    const text = fs.readFileSync(fullPath, 'utf-8');
    const {data: {title, date}, content} = matter(text);  //标题，日期
    return {id, title, date};
  });
};

export default getPosts;

export const getPost = (id: string) => {
  const fullPath = path.join(markdownDir, id + '.md');
  const text = fs.readFileSync(fullPath, 'utf-8');
  const {data: {title, date}, content} = matter(text);  //标题，日期
  const htmlContent = marked(content);
  return {
    id, title, date, content, htmlContent
  };
};

export const getPostIds = async () => {
  const fileNames = await fsPromise.readdir(markdownDir);
  return fileNames.map(fileName => fileName.replace(/\.md$/g, ''));
};

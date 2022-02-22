import fs, {promises as fsPromise} from 'fs';
import path from 'path';
import matter from 'gray-matter';

const getPosts = async () => {
  const markdownDir = path.join(process.cwd(), 'markdown');
  const fileNames = await fsPromise.readdir(markdownDir);
  return fileNames.map(fileName => {
    const fullPath = path.join(markdownDir, fileName);
    const id = fileName.replace(/\.md$/g,'')  //文件名
    const text = fs.readFileSync(fullPath, 'utf-8');
    const {data: {title, date}, content} = matter(text);  //标题，日期
    return {id,title,date}
  });
};

export default getPosts;

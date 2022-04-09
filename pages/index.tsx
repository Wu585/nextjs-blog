import {NextPage} from 'next';
import logo from 'assets/images/blog-logo.png';
import Image from 'next/image';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <div className="cover">
        <Image src={logo} width={120} height={120}/>
        <h1>精致的个人博客系统</h1>
        <p>
          <Link href="/posts">
            <a>文章列表</a>
          </Link>
        </p>
      </div>
      <style jsx>{`
        .cover {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
      `} </style>
    </>
  );
};

export default Home;

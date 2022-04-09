import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import logo from 'assets/images/blog-logo.png';
import Image from 'next/image';
import Link from 'next/link';
import {withSession} from '../lib/withSession';
import {User} from '../src/entity/User';

const Home: NextPage<{ user: User }> = (props) => {
  if (!props.user && typeof window !== 'undefined') {
    window.location.href = '/sign_up';
  }
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

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  // @ts-ignore
  const user = context.req.session.get('currentUser');
  return {
    props: {
      user: user ? user : null
    }
  };
});

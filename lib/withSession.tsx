import {withIronSession} from 'next-iron-session';
import {NextApiHandler} from 'next/types';
import {GetServerSideProps} from 'next';

export function withSession(handler: NextApiHandler | GetServerSideProps) {
  return withIronSession(handler, {
    password: '565a7a78-0fb3-442d-884a-338c9ecec792',
    cookieName: 'blog',
    cookieOptions: {
      secure: false
    }
  });
}

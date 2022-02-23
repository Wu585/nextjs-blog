import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import png from 'assets/images/img.png';
import {UAParser} from 'ua-parser-js';
import {GetServerSideProps, NextPage} from 'next';

type Props = {
  browser: {
    browser:{
      name:string,
      version:string,
      major:string
    }
  }
}

const Index: NextPage<Props> = (props) => {
  const {browser} = props
  return (
    <div>
      <h1>你的浏览器是:{browser.browser.name}</h1>
    </div>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: JSON.parse(JSON.stringify(result))
    }
  };
};

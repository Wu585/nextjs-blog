import React from 'react';
import {UAParser} from 'ua-parser-js';
import {GetServerSideProps, NextPage} from 'next';
import {getConnection} from 'typeorm';
import {getDatabaseConnection} from '../lib/getDatabaseConnection';

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
      <h1>你的浏览器是1211:{browser.browser.name}</h1>
    </div>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connect = await getDatabaseConnection();
  console.log('connect');
  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: JSON.parse(JSON.stringify(result))
    }
  };
};

import Head from 'next/head';
import React from 'react';
import 'styles/global.scss'

export default function App({Component,pageProps}) {
  return <div className={"frank"}>
    <Head>
      <title>
        我的博客 - Wu
      </title>
      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"/>
    </Head>
    <Component {...pageProps}/>
  </div>
}

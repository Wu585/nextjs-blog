import React from 'react';
import Link from 'next/link';
import _ from 'lodash';

type Options = {
  page: number;
  totalPages: number;
  urlMaker?: (n: number) => string;
}

const defaultUrlMaker = (n: number) => `?page=${n}`;

const usePager = (options: Options) => {
  const {page, totalPages, urlMaker: _urlMaker} = options;
  const urlMaker = _urlMaker || defaultUrlMaker;
  const numbers = [];
  numbers.push(1);
  for (let i = page - 3; i <= page + 3; i++) {
    numbers.push(i);
  }
  numbers.push(totalPages);
  const pageNumbers = _.uniq(numbers).sort().filter(n => n > 0 && n <= totalPages).reduce((result, n) => n - (result[result.length - 1] || 0) === 1
    ? result.concat(n) : result.concat(-1, n), []);
  const pager = (
    <div className="wrapper">
      {page > 1 &&
      <Link href={urlMaker(page - 1)}>
        <a>上一页</a>
      </Link>
      }
      {pageNumbers.map(n => n === -1 ? <span>...</span> :
        <Link href={urlMaker(n)}><a>{n}</a></Link>)}
      {totalPages > page &&
      <Link href={urlMaker(page + 1)}>
        <a>下一页</a>
      </Link>
      }
      <span>第 {page} / {totalPages} 页</span>
      <style jsx>{`
        .wrapper {
          margin: 0 -8px;
        }

        .wrapper > a, .wrapper > span {
          margin: 0 8px;
        }

      `}</style>
    </div>
  );
  return {pager};
};

export default usePager;

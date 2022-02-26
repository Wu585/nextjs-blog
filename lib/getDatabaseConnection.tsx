import 'reflect-metadata';
import {createConnection, getConnectionManager} from 'typeorm';
import {Post} from 'src/entity/Post';
import {User} from 'src/entity/User';
import {Comment} from 'src/entity/Comment';
import config from 'ormconfig.json';

const create = async () => {
  // @ts-ignore
  return createConnection({
    ...config,
    entities: [Post, User, Comment]
  });
};

const promise = (async function () {
  const manager = getConnectionManager();
  const hasDefaultConnection = manager.has('default');
  if (!hasDefaultConnection) {
    console.log('创建connection');
    return create();
  } else {
    console.log('复用connection');
    const current = manager.get('default');
    if (current.isConnected) {
      return current;
    } else {
      return create();
    }
  }
})();

export const getDatabaseConnection = async () => {
  return promise;
};

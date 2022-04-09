import 'reflect-metadata';
import {Connection, getConnectionManager} from 'typeorm';
import {Post} from 'src/entity/Post';
import {User} from 'src/entity/User';
import {Comment} from 'src/entity/Comment';
import config from 'ormconfig.json';

/*
const create = async () => {
  console.log('create');

  // @ts-ignore
  return createConnection({
    ...config,
    host: process.env.NODE_ENV === 'production' ? 'localhost' : config.host,
    database: process.env.NODE_ENV === 'production' ? 'blog_production' : 'blog_development',
    entities: [Post, User, Comment]
  });
};

const promise = (async function () {
  console.log(111);
  const manager = getConnectionManager();
  console.log('manager');
  console.log(manager);
  console.log(222);
  const current = manager.has('default') && manager.get('default');
  console.log(333);
  if (current) {
    console.log('here close');
    await current.close();
  }
  console.log('here create');
  return await create();
})();

export const getDatabaseConnection = async () => {
  console.log('get connection');
  const aaa = await promise;
  console.log('aaa');
  console.log(aaa.isConnected);
  return aaa;
};
*/

const options = {
  ...config,
  host: process.env.NODE_ENV === 'production' ? 'localhost' : config.host,
  database: process.env.NODE_ENV === 'production' ? 'blog_production' : 'blog_development',
  entities: [Post, User, Comment]
};

function entitiesChanged(prevEntities: any[], newEntities: any[]): boolean {
  if (prevEntities.length !== newEntities.length) return true;

  for (let i = 0; i < prevEntities.length; i++) {
    if (prevEntities[i] !== newEntities[i]) return true;
  }

  return false;
}

async function updateConnectionEntities(connection: Connection, entities: any[]) {
  if (!entitiesChanged(connection.options.entities, entities)) return;
  console.log('here');
  // @ts-ignore
  connection.options.entities = entities;

  // @ts-ignore
  await connection.buildMetadatas();

  if (connection.options.synchronize) {
    await connection.synchronize();
  }
}

export async function getDatabaseConnection() {
  const connectionManager = getConnectionManager();

  if (connectionManager.has('default')) {
    const connection = connectionManager.get('default');
    // 此处不分开发环境与生产环境了，原因尚未知
    await updateConnectionEntities(connection, options.entities);

    return connection;
  }

  // @ts-ignore
  return await connectionManager.create({...options}).connect();
}

/*
export const getDatabaseConnection = async () => {
  const connectionManager = getConnectionManager();
  console.log('connectionManager');
  console.log(connectionManager);

  if (connectionManager.has('default')) {
    console.log('here close--1');
    const current = connectionManager.get('default');
    console.log('here close--2');
    await current.close();
    console.log('here close--3');
    /!*c
    const connection = connectionManager.get('default');

    if (!connection.isConnected) {
      await connection.connect();
    }

    return connection;*!/
  }
  console.log('here---');

  // @ts-ignore
  const ccc = connectionManager.create({
    ...config,
    host: process.env.NODE_ENV === 'production' ? 'localhost' : config.host,
    database: process.env.NODE_ENV === 'production' ? 'blog_production' : 'blog_development',
    entities: [Post, User, Comment]
  });
  console.log('here---create');
  return await ccc.connect();
};
*/

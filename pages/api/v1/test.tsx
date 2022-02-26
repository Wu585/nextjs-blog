import {NextApiRequest, NextApiResponse} from 'next';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {Post} from '../../../src/entity/Post';

const Test = async (req: NextApiRequest, res: NextApiResponse) => {
  const connect = await getDatabaseConnection();
  const posts = await connect.manager.find(Post);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(JSON.stringify(posts));
  res.end();
};

export default Test;


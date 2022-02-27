import {NextApiRequest, NextApiResponse} from 'next';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {User} from '../../../src/entity/User';
import md5 from 'md5';

const Sessions = async (req: NextApiRequest, res: NextApiResponse) => {
  const {username, password} = req.body;
  const connection = await getDatabaseConnection();
  const user = await connection.manager.findOne(User, {where: {username}});
  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  if (user) {
    const passwordDigest = md5(password);
    if (user.passwordDigest === passwordDigest) {
      res.statusCode = 200;
      res.end(JSON.stringify(user));
    } else {
      res.statusCode = 422;
      res.end(JSON.stringify({password: ['密码不匹配']}));
    }
  } else {
    res.statusCode = 422;
    res.end(JSON.stringify( {username: ['用户名不存在']}));
  }
  /*res.setHeader('Content-Type', 'application/json;charset=utf-8');
  res.statusCode = 200;
  res.write('');
  res.end();*/
};

export default Sessions;

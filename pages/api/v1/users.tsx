import {NextApiRequest, NextApiResponse} from 'next';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {User} from '../../../src/entity/User';

const Users = async (req: NextApiRequest, res: NextApiResponse) => {
  const {username, password, password_confirmation} = req.body;
  const connect = await getDatabaseConnection();

  res.setHeader('Content-Type', 'application/json;charset=utf-8');

  const user = new User();
  user.username = username.trim();
  user.password = password;
  user.password_confirmation = password_confirmation;
  await user.validate();
  if (user.hasErrors()) {
    res.statusCode = 422;
    res.write(JSON.stringify(user.errors));
  } else {
    await connect.manager.save(user);
    res.statusCode = 200;
    res.write(JSON.stringify(user));
  }
  res.end();
};

export default Users;

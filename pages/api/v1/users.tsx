import {NextApiRequest, NextApiResponse} from 'next';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {User} from '../../../src/entity/User';
import md5 from 'md5';

const Users = async (req: NextApiRequest, res: NextApiResponse) => {
  const {username, password, password_confirmation} = req.body;

  const errors = {
    username: [] as string[],
    password: [] as string[],
    password_confirmation: [] as string[],
  };
  if (username.trim().length === '') {
    errors.username.push('用户名不能为空');
  }
  if (!/[a-zA-Z0-9]/.test(username.trim())) {
    errors.username.push('格式不合法');
  }
  if (username.trim().length > 42) {
    errors.username.push('太长');
  }
  if (username.trim().length <= 3) {
    errors.username.push('太短');
  }
  if (password === '') {
    errors.username.push('密码不能为空');
  }
  if (password !== password_confirmation) {
    errors.password_confirmation.push('密码不匹配');
  }
  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  const hasErrors = Object.values(errors).find(v => v.length > 0);
  if (hasErrors) {
    res.statusCode = 422;
    res.write(JSON.stringify(errors));
  } else {
    const connect = await getDatabaseConnection();
    const user = new User();
    user.username = username.trim();
    user.passwordDigest = md5(password);
    await connect.manager.save(user);
    res.statusCode = 200;
    res.write(JSON.stringify(user));
  }
  res.end();
};

export default Users;

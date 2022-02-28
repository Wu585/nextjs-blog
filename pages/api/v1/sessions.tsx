import {NextApiRequest, NextApiResponse} from 'next';
import {SignIn} from '../../../src/model/SignIn';
import {withSession} from '../../../lib/withSession';

const Sessions = async (req: NextApiRequest, res: NextApiResponse) => {
  const {username, password} = req.body;
  console.log(req.session);
  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  const signIn = new SignIn();
  signIn.username = username;
  signIn.password = password;
  await signIn.validate();
  if (signIn.hasErrors()) {
    res.statusCode = 422;
    res.end(JSON.stringify(signIn.errors));
  } else {
    req.session.set('currentUser', signIn.user);
    await req.session.save();
    res.statusCode = 200;
    res.end(JSON.stringify(signIn.user));
  }
};

export default withSession(Sessions);

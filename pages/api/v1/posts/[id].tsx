import {NextApiRequest, NextApiResponse} from 'next';
import {withSession} from '../../../../lib/withSession';
import {getDatabaseConnection} from '../../../../lib/getDatabaseConnection';
import {Post} from '../../../../src/entity/Post';


const Posts = withSession(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    const {title, content, id} = req.body;
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne(Post, id);
    post.title = title;
    post.content = content;
    const user = req.session.get('currentUser');
    if (!user) {
      res.status(401).json({message: 'Unauthorized'});
      return;
    }
    await connection.manager.save(post);
    res.json(post);
  } else if (req.method === 'DELETE') {
    const id = req.query.id.toString();
    const connection = await getDatabaseConnection();
    await connection.manager.delete(Post, id);
    res.statusCode = 200;
    res.end();
  }
});

export default Posts;


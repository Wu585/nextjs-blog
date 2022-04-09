import {GetServerSideProps, NextPage} from 'next';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {Post} from '../../../src/entity/Post';
import {useForm} from '../../../hooks/useForm';
import axios from 'axios';

type Props = {
  id: number,
  post: Post
}

const PostsEdit: NextPage<Props> = (props) => {
  const {post, id} = props;
  const {form} = useForm(
    {
      initialFormData: {title: post.title, content: post.content},
      fields: [
        {label: '标题', type: 'text', key: 'title'},
        {label: '内容', type: 'textarea', key: 'content'}
      ],
      buttons:
        <div className="actions">
          <button type="submit" style={{width: '64px', height: '32px'}}>
            提交
          </button>
        </div>
      ,
      submit: {
        request: (formData) => {
          return axios.patch(`/api/v1/posts/${id}`, {...formData,id});
        },
        success: () => {
          window.alert('提交成功');
          // window.location.href = '/posts';
        },
      }
    }
  );
  return (
    <div className="postsNew">
      <div className="form-wrapper">
        {form}
      </div>
      <style jsx global>{`
        .form-wrapper {
          padding: 16px;
        }

        .postsNew .field-content textarea {
          height: 20em;
          resize: none;
        }

        .postsNew .label-text {
          width: 4em;
          text-align: right;
        }

        .postsNew .actions {
          text-align: center;
          padding: 4px 0;
        }
      `}</style>
    </div>
  );
};

export default PostsEdit;

export const getServerSideProps: GetServerSideProps<any, { id: string }> = async (context) => {
  const id = context.params.id;
  const connect = await getDatabaseConnection();
  const post = await connect.manager.findOne(Post, id);
  return {
    props: {
      id,
      post: JSON.parse(JSON.stringify(post)),
    }
  };
};

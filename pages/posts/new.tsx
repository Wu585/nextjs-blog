import {NextPage} from 'next';
import axios, {AxiosResponse} from 'axios';
import {useForm} from '../../hooks/useForm';

const PostsNew: NextPage = () => {
    const {form} = useForm(
      {
        initialFormData: {title: '', content: ''},
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
            return axios.post('/api/v1/posts', formData);
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
  }
;

export default PostsNew;

import {NextPage} from 'next';
import {useCallback, useState} from 'react';
import axios, {AxiosError, AxiosResponse} from 'axios';

const Signup: NextPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({
    username: [],
    password: [],
    password_confirmation: []
  });
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    axios.post('/api/v1/users', formData)
      .then(() => {
        window.alert('注册成功');
        window.location.href = '/sign_up';
      }, (error) => {
        console.log(error.response);
        if (error.response) {
          const response: AxiosResponse = error.response;
          if (response.status === 422) {
            console.log('response.data');
            console.log(response.data);
            setErrors(response.data);
          }
        }
      });
  }, [formData]);
  return (
    <div>
      <h1>注册</h1>
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <label>
              用户名
              <input type="text" value={formData.username}
                     onChange={e => setFormData({...formData, username: e.target.value})}/>
            </label>
            {errors.username?.length > 0 && <div>
              {errors.username.join(',')}
            </div>}
          </div>
          <div>
            <label>
              密码
              <input type="password" value={formData.password}
                     onChange={e => setFormData({...formData, password: e.target.value})}/>
            </label>
            {errors.password?.length > 0 && <div>
              {errors.password.join(',')}
            </div>}
          </div>
          <div>
            <label>
              确认密码
              <input type="password" value={formData.password_confirmation}
                     onChange={e => setFormData({...formData, password_confirmation: e.target.value})}/>
            </label>
            {errors.password_confirmation?.length > 0 && <div>
              {errors.password_confirmation.join(',')}
            </div>}
          </div>
          <div>
            <button type="submit">注册</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;

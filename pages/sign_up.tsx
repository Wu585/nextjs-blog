import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {useCallback, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {withSession} from '../lib/withSession';
import {User} from '../src/entity/User';
import Form from '../components/Form';
import qs from 'qs';
import Header from '../components/Header';

const Signup: NextPage<{ user: User }> = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: [],
    password: [],
  });
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    axios.post('/api/v1/sessions', formData)
      .then(() => {
        window.alert('登录成功');
        const query = qs.parse(window.location.search.split('?')[1]);
        query.return_to && (window.location.href = query.return_to?.toString());
        window.location.href = '/';
      }, (error) => {
        if (error.response) {
          const response: AxiosResponse = error.response;
          if (response.status === 422) {
            setErrors(response.data);
          }
        }
      });
  }, [formData]);
  const onChange = useCallback((key, value) => {
    setFormData({...formData, [key]: value});
  }, [formData]);
  return (
    <div>
      {/*<div style={{display:'flex',alignItems:'center',justifyContent:'center',maxWidth:'800px'}}>
        <h1 style={{borderRight:'2px solid #000',padding:'0 12px'}}>登录</h1>
        <h1 style={{padding:'0 12px'}} onClick={()=>window.location.href='/sign_in'}>注册</h1>
      </div>*/}
      <Header/>
      <Form
        onSubmit={onSubmit}
        buttons={
          <>
            <div className="child-el">
              <button type="submit">
                登录
              </button>
            </div>
          </>
        }
        fields={[{
          label: '用户名', type: 'text', value: formData.username,
          onChange: e => onChange('username', e.target.value),
          errors: errors.username
        },
          {
            label: '密码', type: 'password', value: formData.password,
            onChange: e => onChange('password', e.target.value),
            errors: errors.password
          }]}/>
      <style jsx>{`
        .child-el {
          display: flex;
          justify-content: flex-end;
          padding: 12px 64px;
        }

        .child-el button {
          width: 64px;
          height: 32px;
        }
      `}</style>
    </div>
  );
};

export default Signup;

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  // @ts-ignore
  const user = context.req.session.get('currentUser');
  return {
    props: {
      user: user ? user : null
    }
  };
});

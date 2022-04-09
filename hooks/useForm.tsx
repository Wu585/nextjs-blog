import React, {ChangeEventHandler, ReactChild, useCallback, useState} from 'react';
import {AxiosResponse} from 'axios';
import cs from 'classnames';

type Field<T> = {
  label: string,
  type: 'text' | 'password' | 'textarea'
  key: keyof T
  className?: string
}

type useFormOptions<T> = {
  initialFormData: T,
  fields: Field<T>[],
  buttons: ReactChild,
  submit: {
    request: (formData: T) => Promise<AxiosResponse<T>> | Promise<any>,
    success: () => void,
  }
}

export function useForm<T>(options: useFormOptions<T>) {
  const {initialFormData, fields, buttons, submit} = options;
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(() => {
    const e: { [k in keyof T]?: string[] } = {};
    for (let key in initialFormData) {
      if (initialFormData.hasOwnProperty(key)) {
        e[key] = [];
      }
    }
    return e;
  });
  const onChange = useCallback((key: keyof T, value: any) => {
    setFormData({...formData, [key]: value});
  }, [formData]);
  const _onSubmit = useCallback((e) => {
    e.preventDefault();
    if (Object.values(formData).includes('')) {
      return window.alert('请填写内容');
    }
    submit.request(formData).then(() => {
      submit.success();
    }, (error) => {
      if (error.response) {
        const response: AxiosResponse = error.response;
        if (response.status === 422) {
          setErrors(response.data);
        } else if ((response.status === 401)) {
          window.alert('请先登录');
          window.location.href = '/sign_up?return_to=' + encodeURIComponent(window.location.pathname);
        }
      }
    });
  }, [submit, formData]);
  const form = (
    <form onSubmit={_onSubmit}>
      {fields.map(field =>
        <div key={field.label} className={cs('field', `field-${field.key}`, field.className)}>
          <label className="label">
            <span className="label-text">
              {field.label}
            </span>
            {field.type === 'textarea' ?
              <textarea className="control" onChange={e => onChange(field.key, e.target.value)}
                        value={formData[field.key].toString()}/> :
              <input className="control" type={field.type} value={formData[field.key].toString()}
                     onChange={e => onChange(field.key, e.target.value)}/>
            }
          </label>
          {errors[field.key]?.length > 0 && <div>
            {errors[field.key].join(',')}
          </div>}
        </div>
      )}
      <div>
        {buttons}
      </div>
      <style jsx>{`
        .field {
          margin: 8px 0;
        }

        .label {
          display: flex;
          line-height: 32px;
        }

        .label input {
          height: 32px;
        }

        .label > .label-text {
          white-space: nowrap;
          margin-right: 1em;
        }

        .label > .control {
          width: 100%;
        }
      `}</style>
    </form>
  );
  return {
    form,
    setErrors
  };
}

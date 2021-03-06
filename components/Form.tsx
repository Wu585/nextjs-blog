import React, {ChangeEventHandler, FormEventHandler, ReactChild} from 'react';

type Props = {
  onSubmit: FormEventHandler
  fields: {
    label: string,
    type: 'text' | 'password' | 'textarea'
    value: string | number,
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    errors: string[]
  }[]
  buttons: ReactChild
}

const Form: React.FC<Props> = (props) => {
  return (
    <form className="wrapper" onSubmit={props.onSubmit}>
      {props.fields.map(field =>
        <div key={field.label}>
          <label>
            <span>{field.label}</span>
            {field.type === 'textarea' ?
              <textarea onChange={field.onChange} value={field.value}/> :
              <input type={field.type} value={field.value} onChange={field.onChange}/>
            }
          </label>
          {field.errors?.length > 0 && <div>
            {field.errors.join(',')}
          </div>}
        </div>
      )}
      <div className='child-el'>
        {props.buttons}
      </div>
      <style jsx>{`
        .wrapper {
          max-width: 800px;
          margin: 20px auto;
        }

        .wrapper > div > label {
          display: flex;
          padding: 12px 6px; 
        }

        .wrapper > div > label > span {
          width: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 6px;
        }
      `}
      </style>
    </form>
  );
};

export default Form;

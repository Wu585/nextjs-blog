import React, {useState} from 'react';

function Header() {
  const [selected, setSelected] = useState('登录');
  const handleClick = (name: string) => {
    setSelected(name);
    switch (name) {
      case '登录':
        window.location.href = '/sign_up';
        break;
      case '注册':
        window.location.href = '/sign_in';
        break;
    }
  };
  return (
    <div className="wrapper">
      {
        ['登录', '注册'].map(item =>
          <span key={item}
                onClick={() => {
                  handleClick(item);
                }}
                className={selected === item ? 'active' : ''}>{item}</span>)
      }
      <style jsx>{`
        .wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 800px;
          margin: 0 auto;
          margin-top: 64px;
          border: 1px solid gray;
        }

        .wrapper span {
          width: 50%;
          height: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .wrapper span.active {
          background: #ddd;
        }
      `}
      </style>
    </div>
  );
}

export default Header;

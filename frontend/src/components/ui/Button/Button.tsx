import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <>
      <style>{`
        .addTaskBtn {
          background-color: #4D007D;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 8px 12px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background-color 0.2s ease;
        }
        .addTaskBtn:hover {
          background-color: #553c9a;
        }
      `}</style>

      <button className={`addTaskBtn ${className}`} {...props}>
        {children}
      </button>
    </>
  );
};

export default Button;

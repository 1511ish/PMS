import React, { useState } from 'react';
import LoginForm from '../LoginForm.tsx';
import RegisterForm from '../RegisterForm.tsx';
import styles from './RegistrationPage.module.css';


export default function RegistrationPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className={styles.container}>
      {/* <Logo boxSize={30} fontSize={26} square={4} /> */}
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Welcome to Dashboard</h2>

          {isLogin ? (
            <LoginForm />
          ) : (
            <RegisterForm setIsLogin={setIsLogin} />
          )}

          <div className={styles.switchMode}>
            <span className={styles.switchText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button type="button" onClick={toggleMode} className={styles.switchButton}>
              {isLogin ? 'Register' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

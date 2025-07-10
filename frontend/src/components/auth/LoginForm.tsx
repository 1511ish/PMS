import React, { useState, ChangeEvent, MouseEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.tsx';
import styles from './auth.module.css';

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { setToken } = useAuth();
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isFormValid = () => {
    return formData.email.trim() !== '' && formData.password.trim() !== '';
  };

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/login`,
        formData
      );

      const { token } = res.data;
      setToken(token);

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || 'Login failed.';
        setError(msg);
      } else {
        setError('Login failed.');
      }
    }
  };

  return (
    <>
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Email Address<span className={styles.required}>*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Email Address"
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Password<span className={styles.required}>*</span>
        </label>
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={styles.passwordInput}
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.eyeButton}
          >
            <img
              src={showPassword ? '/icons/eye-open.png' : '/icons/eye-hidden.png'}
              alt={showPassword ? 'Hide password' : 'Show password'}
              className={styles.eyeIcon}
            />
          </button>
        </div>
      </div>

      <div className={styles.forgotPassword}>
        <span className={styles.forgotLink}>Forgot password?</span>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      <button
        className={styles.submitButton}
        style={{
          backgroundColor: isFormValid() ? '#6B46C1' : '#ccc',
          cursor: isFormValid() ? 'pointer' : 'not-allowed'
        }}
        onClick={handleLogin}
        disabled={!isFormValid()}
      >
        Login
      </button>
    </>
  );
}

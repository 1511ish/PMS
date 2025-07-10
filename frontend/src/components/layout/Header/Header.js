// src/components/Header/Header.js
import React from 'react';
import styles from './Header.module.css';

const Header = ({ title = 'Dashboard', userName = 'Admin' }) => {
  return (
    <div className={styles.headerContainer}>
      <h2 className={styles.pageTitle}>{title}</h2>
      <div className={styles.userSection}>
        <img src="/icons/messege.png" alt="messages" />
        <img src="/icons/notification.png" alt="notifications" />
        <div className={styles.profileSection}>
          <img src="https://avatars.githubusercontent.com/u/117707870?s=400&u=1ce3d071d197c4e846eeadb497c975b18e63d7b4&v=4" alt="User Icon" className={styles.userIcon} />
          <img src="icons/dropdown.png" alt="dropdown" />
        </div>
      </div>
    </div>
  );
};

export default Header;
import React from "react";
import styles from "./Table.module.css";

const Table = ({ children, className='' }) => {
    return (
        <div className={` ${className || styles.container}`}>
            <table className={styles.table}>
                {children}
            </table>
        </div>
    );
};

export default Table;

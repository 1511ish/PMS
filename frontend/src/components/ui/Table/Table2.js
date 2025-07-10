import React from "react";
import styles from "./Table.module.css";
import Thead from "./Thead";
import Tbody from "./Tbody";

const Table2 = ({ columns, candidates, openActionMenu, onStatusChange, toggleActionMenu, deleteCandidate, handleActionClick, profile, experience, email }) => {
    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <Thead columns={columns} />
                <Tbody candidates={candidates}
                    openActionMenu={openActionMenu}
                    onStatusChange={onStatusChange}
                    toggleActionMenu={toggleActionMenu}
                    deleteCandidate={deleteCandidate}
                    handleActionClick={handleActionClick} 
                    profile={profile}
                    experience={experience}
                    email={email}/>
            </table>
        </div>
    );
};

export default Table2;

// import React from "react";
// import Dropdown from "../Dropdown/Dropdown"; // adjust path if needed
// import styles from "./Table.module.css"; // same styling as table

// const Tbody = ({
//     candidates,
//     onStatusChange,
//     toggleActionMenu,
//     openActionMenu,
//     handleActionClick
// }) => {
//     return (
//         <tbody>
//             {candidates.map((candidate, index) => (
//                 <tr key={candidate._id}>
//                     <td>{candidate.srNo || index + 1}</td>
//                     <td>{candidate.name}</td>
//                     <td>{candidate.email}</td>
//                     <td>{candidate.phone}</td>
//                     <td>{candidate.position}</td>
//                     <td>
//                         <Dropdown
//                             value={candidate.status}
//                             onChange={(e) => onStatusChange(candidate._id, e.target.value)}
//                             options={[
//                                 { label: "New", value: "New" },
//                                 { label: "Selected", value: "Selected" },
//                                 { label: "Rejected", value: "Rejected" }
//                             ]}
//                         />
//                     </td>
//                     <td>{candidate.experience}</td>
//                     <td>
//                         <div className={styles.actionMenuContainer}>
//                             <div className={styles.dots} onClick={() => toggleActionMenu(candidate.id)}>
//                                 <img src="/icons/more.png" alt="options" />
//                             </div>
//                             {openActionMenu === candidate.id && (
//                                 <div className={styles.actionMenu}>
//                                     <button
//                                         className={styles.actionMenuItem}
//                                         onClick={() =>
//                                             handleActionClick("Download Resume", candidate.id)
//                                         }
//                                     >
//                                         Download Resume
//                                     </button>
//                                     <button
//                                         className={`${styles.actionMenuItem} ${styles.delete}`}
//                                         onClick={() =>
//                                             handleActionClick("Delete Candidate", candidate._id)
//                                         }
//                                     >
//                                         Delete Candidate
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </td>
//                 </tr>
//             ))}
//         </tbody>
//     );
// };

// export default Tbody;



















import React from "react";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./Table.module.css";

const Tbody = ({
  candidates,
  onStatusChange,
  toggleActionMenu,
  openActionMenu,
  handleActionClick,
  profile,
  experience,
  email
}) => {
  return (
    <tbody>
      {candidates.map((candidate, index) => (
        <tr key={candidate._id || candidate.id || index}>
          {/* <td>{candidate.srNo || index + 1}</td> */}

          {profile && (
            <td>
              <img
                src={`https://avatars.githubusercontent.com/u/117707870?s=400&u=1ce3d071d197c4e846eeadb497c975b18e63d7b4&v=4`}
                alt="profile"
                className={styles.profile}
              />
            </td>
          )}

          {candidate.name && <td>{candidate.name}</td>}
          {email && <td>{candidate.email}</td>}
          {candidate.phone && <td>{candidate.phone}</td>}
          {candidate.position && <td>{candidate.position}</td>}
          {candidate.department && <td>{candidate.department}</td>}
          {candidate.task && <td>{candidate.task}</td>}
          {candidate.reason && <td>{candidate.reason}</td>}
          {experience && <td>{candidate.experience}</td>}
          {candidate.joiningDate && <td>{candidate.joiningDate}</td>}

          {candidate.status && (
            <td>
              <Dropdown
                value={candidate.status}
                onChange={(e) =>
                  onStatusChange(candidate._id, e.target.value)
                }
                options={[
                  { label: "New", value: "New" },
                  { label: "Selected", value: "Selected" },
                  { label: "Rejected", value: "Rejected" }
                ]}
              />
            </td>
          )}

          <td>
            <div className={styles.actionMenuContainer}>
              <div
                className={styles.dots}
                onClick={() => toggleActionMenu(candidate.id)}
              >
                <img src="/icons/more.png" alt="options" />
              </div>
              {openActionMenu === candidate.id && (
                <div className={styles.actionMenu}>
                  <button
                    className={styles.actionMenuItem}
                    onClick={() =>
                      handleActionClick("Download Resume", candidate.id)
                    }
                  >
                    Download Resume
                  </button>
                  <button
                    className={`${styles.actionMenuItem} ${styles.delete}`}
                    onClick={() =>
                      handleActionClick("Delete Candidate", candidate._id)
                    }
                  >
                    Delete Candidate
                  </button>
                </div>
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody;


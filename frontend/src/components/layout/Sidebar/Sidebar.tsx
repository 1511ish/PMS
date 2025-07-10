import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import Button from '../../ui/Button/Button.tsx';
import AddOrEditProjectModal from '../../modals/AddOrEditProjectModal/AddOrEditProjectModal.tsx'
import { Project } from '../../../types/Project.ts';


export default function Sidebar({
    projects,
    activeTab,
    setActiveTab,
    onDeleteProject,
    onAddProject,
    onEditProject
}: {
    projects: Project[];
    activeTab: string | null;
    setActiveTab: (id: string) => void;
    onDeleteProject: (id: string) => void;
    onAddProject: (data: Project) => void;
    onEditProject: (data: Project) => void;
}) {
    const [showModal, setShowModal] = useState(false);
    const [editProject, setEditProject] = useState<Project | false>(false);

    return (
        <div className={styles.sidebar}>
            <div className={styles.upperSection}>
                <Button onClick={() => setShowModal(true)}>+ Add Project</Button>
            </div>

            <div className={styles.lowerSection}>
                <ul>
                    {projects.map((project) => (
                        <li
                            key={project._id}
                            className={`${styles.menuItem} ${activeTab === project._id ? styles.active : ''
                                }`}
                            onClick={() => {
                                if (project._id) {
                                    setActiveTab(project._id);
                                }
                            }}
                        >
                            <span>{project.title}</span>

                            <div className={styles.projectActions}>
                                <button
                                    className={styles.editBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditProject(project);
                                    }}
                                >
                                    ✏️
                                </button>
                                <button
                                    className={styles.deleteBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (project._id) {
                                            onDeleteProject(project._id);
                                        }
                                    }
                                    }
                                >
                                    🗑️
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {showModal && (
                <AddOrEditProjectModal
                    onClose={() => setShowModal(false)}
                    onSave={(data) => {
                        onAddProject(data);
                        setShowModal(false);
                    }}
                />
            )}

            {editProject && (
                <AddOrEditProjectModal
                    onClose={() => setEditProject(false)}
                    project={editProject}
                    onSave={(data) => {
                        onEditProject(data);
                    }}
                />
            )}

        </div>
    );
}

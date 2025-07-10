import React, { useState } from 'react';
import Table from '../../ui/Table/Table';
import styles from './MainContent.module.css';

export default function TaskTable({ tasks, onEdit, onDelete }) {
    const [dropdownId, setDropdownId] = useState<string | null>(null);

    const toggleActionMenu = (id: string) => {
        setDropdownId(dropdownId === id ? null : id);
    };

    return (
        <Table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(task => (
                    <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.status}</td>
                        <td>{task.dueDate?.split('T')[0]}</td>
                        <td className={styles.actionCell}>
                            <div className={styles.dots} onClick={() => toggleActionMenu(task._id)}>
                                <img src="/icons/more.png" alt="options" />
                            </div>
                            {dropdownId === task._id && (
                                <div className={styles.dropdown}>
                                    <div onClick={() => onEdit(task)}>Edit</div>
                                    <div onClick={() => onDelete(task._id)}>Delete</div>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

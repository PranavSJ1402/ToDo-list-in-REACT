import { useState } from "react";

function TDL() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editTaskValue, setEditTaskValue] = useState('');

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask(''); 
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function handleEditChange(event) {
        setEditTaskValue(event.target.value);
    }

    function saveTask(index) {
        if (editTaskValue.trim() !== '') {
            const updatedTasks = tasks.map((task, i) => (i === index ? editTaskValue : task));
            setTasks(updatedTasks);
            setEditIndex(null);
            setEditTaskValue('');
        }
    }

    return (
        <div className="To-Do-list">
            <h1>To-Do List App</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter a Task"
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="Add-Btn" onClick={addTask}>Add</button>
            </div>
            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        {editIndex === index ? (
                            <input
                                type="text"
                                value={editTaskValue}
                                onChange={handleEditChange}
                            />
                        ) : (
                            <span className="text">{task}</span>
                        )}
                        <button className="Delete-btn" onClick={() => deleteTask(index)}>Delete</button>
                        <button className="move-btn" onClick={() => moveTaskUp(index)}>👆</button>
                        <button className="move-btn" onClick={() => moveTaskDown(index)}>👇</button>
                        {editIndex === index ? (
                            <button className="save-btn" onClick={() => saveTask(index)}>Save</button>
                        ) : (
                            <button className="edit-btn" onClick={() => {
                                setEditIndex(index);
                                setEditTaskValue(task);
                            }}>Edit</button>
                        )}
                    </li>
                )}
            </ol>
        </div>
    );
}

export default TDL;

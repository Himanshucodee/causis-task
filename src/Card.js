/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Draggable from "react-draggable";
import AddTaskForm from "./AddTask";
import { useState } from "react";

export default function Card({ currentTask, tasks, addTask }) {
    const [addItem, setAddItem] = useState(false);
    const [tasks1, setTasks1] = useState([]);
    const [counter, setCounter] = useState(0);
    const addTask1 = (task) => {
        setTasks1(task);
    };

    const editTask = () => {
        setAddItem(true);
        console.log("currentTask", currentTask);
    }

    return (
        <>
            <Draggable grid={[10, 10]} axis='y' bounds='parent'>
                <div className='card' key={currentTask.id}>
                    <div className='heading'>
                        <h3>{currentTask.name && currentTask.name}</h3>
                    </div>
                    <div className="btnsec">
                        <img
                            onClick={() => {
                                const newTaskList = tasks.filter((item) => {
                                    if (item.id != currentTask.id) {
                                        return item;
                                    }
                                });
                                addTask(newTaskList);
                                const TasksList = JSON.parse(localStorage.getItem('Tasks'));
                                TasksList.splice(TasksList.findIndex(a => a.id === currentTask.id), 1)
                                localStorage.setItem('Tasks', JSON.stringify(TasksList));
                            }}
                            src='https://toppng.com/uploads/preview/recycling-bin-vector-delete-icon-png-black-11563002079w1isxqyyiv.png'
                            style={{ height: "20px", width: "20px" }}
                        />
                        <img
                            onClick={() => editTask()}
                            src='https://toppng.com/uploads/preview/edit-11550108380m4qblivgwt.png'
                            style={{ height: "20px", width: "20px" }}
                        />
                    </div>
                    <div style={{marginTop: '15px'}}>Counter: {currentTask.counter ?? 0}</div>
                    <div>Date: {currentTask.date ?? 0}</div>
                </div>
            </Draggable>
            {addItem && (
                <AddTaskForm addItem={addItem}
                    setAddItem={setAddItem}
                    tasks={tasks1}
                    currentTask={currentTask}
                    setTasks={addTask1} />
            )}
        </>

    );
}
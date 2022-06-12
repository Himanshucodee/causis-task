import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddTaskForm({ setAddItem, addItem, tasks, setTasks, currentTask }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [option, setOption] = useState("");
    const [taskName, setTaskName] = useState("");
    const [taskOption, setTaskOption] = useState("");
    const [taskCounter, setTaskCounter] = useState(0);
    const [counter, setCounter] = useState(0);
    const [date, setDate] = useState('31-12-2099');

    const handleSubmit = (e) => {
        if (Object.keys(currentTask).length > 0) {
            let newTask = {
                id: uuidv4(),
                name: name,
                counter: counter,
                date: date,
                timeline: option,
            };
            const TasksList = JSON.parse(localStorage.getItem('Tasks'));
            TasksList.push(newTask)
            TasksList.splice(TasksList.findIndex(a => a.id === currentTask.id) , 1)
            localStorage.setItem('Tasks', JSON.stringify(TasksList));
        } else {
            e.preventDefault();
            let newTask = {
                id: uuidv4(),
                name: name,
                date: date,
                counter: counter,
                timeline: option,
            };
            setTasks([...tasks, newTask]);
            let AllTasks = tasks;
            AllTasks.push(newTask)
            localStorage.setItem('Tasks', JSON.stringify(AllTasks));
            setAddItem(!addItem);
        }

    };

    useEffect(() => {
        if (Object.keys(currentTask).length > 0) {
            setTaskName(currentTask.name);
            setTaskOption(currentTask.timeline);
            setOption(currentTask.timeline);
            setName(currentTask.name);
            setTaskCounter(currentTask.counter);
            setCounter(currentTask.counter)
            setDate(currentTask.date);
        }

    }, []);

    return (
        <div className='addForm'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type='text'
                    placeholder='Text'
                    value={taskName ? taskName : null}
                    onChange={(e) => { setName(e.target.value); setTaskName(e.target.value) }}
                />
                 <input
                    type='date'
                    onChange={(e) => { setDate(e.target.value); }}
                    value={date ? date : null}
                />
                <select
                    name='timeline'
                    id='timeline'
                    onChange={(e) => {
                        setOption(e.target.value);
                        setTaskOption(e.target.value)
                    }}
                    value={taskOption ? taskOption : null}
                >
                    <option value=''>Select Status</option>
                    <option value='planning'>Went Well</option>
                    <option value='inprogress'>Went Wrong</option>
                </select>
                <div style={{marginTop: '15px'}}>Counter: {counter ?? 0}</div>
                <span className="counterInc" onClick={() => setCounter(counter => counter + 1)} >Click to Increase Counter</span>
                <button className="addnewBtn" type='submit'>Add</button>
                <button className="cancelBtn" type='cancel'>Cancel</button>
            </form>
        </div>
    );
}
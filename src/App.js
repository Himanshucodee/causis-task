import "./App.css";
import { useState, useEffect } from "react";
import Header from "./header";
import Planning from "./planning";
import InProgress from "./InProgress";
import AddTaskForm from "./AddTask";
function App() {
  const [tasks, setTasks] = useState([]);
  const [addItem, setAddItem] = useState(false);
  const handleSubmit = () => {
    setAddItem(!addItem);
  };
  const addTask = (task) => {
    setTasks(task);
  };

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('Tasks'));
    if (tasks) {
      setTasks(tasks.sort((a,b) => Date.parse(b.date) - Date.parse(a.date)));
    }
  }, []);

  return (
    <div>
      <Header handleSubmit={handleSubmit} />
      <div className='mainGrid'>
        <div className='column'>
          <Planning tasks={tasks} addTask={addTask} />
        </div>
        <div className='column'>
          <InProgress tasks={tasks} addTask={addTask} />
        </div>
        {addItem && (
          <AddTaskForm
            addItem={addItem}
            setAddItem={setAddItem}
            tasks={tasks}
            currentTask={[]}
            setTasks={addTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
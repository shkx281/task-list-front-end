import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const App = () => {
  const [tasks, setTasks] = useState([]);
  const URL = 'https://task-list-api-c17.herokuapp.com/tasks';

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        const newTasks = res.data.map((task) => {
          return {
            id: task.id,
            title: task.title,
            isComplete: task.is_complete,
          };
        });
        setTasks(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const flipComplete = (id) => {
    const newTasks = [];
    let mark = '';
    for (const task of tasks) {
      // const updatedTask = { ...task };
      if (task.id === id) {
        if (task.isComplete) {
          mark = 'mark_incomplete';
          task.isComplete = !task.isComplete;
        } else {
          mark = 'mark_complete';
          task.isComplete = !task.isComplete;
        }
      }
      newTasks.push(task);
    }
    axios
      .patch(`${URL}/${id}/${mark}`)
      .then(() => {
        setTasks(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`${URL}/${id}`)
      .then(() => {
        const newTasks = [];
        for (const task of tasks) {
          if (task.id !== id) {
            newTasks.push(task);
          }
        }
        setTasks(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={tasks}
            completeCallback={flipComplete}
            deleteCallback={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;

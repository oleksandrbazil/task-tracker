import React from 'react';
import TaskForm from './components/TaskForm';
import TaskTabs from './components/TaskTabs';
import './App.css';

function App() {
  return (
    <div className="App">
      <TaskForm />
      <TaskTabs />
    </div>
  );
}

export default App;

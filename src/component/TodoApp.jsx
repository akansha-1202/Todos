import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users/1/todos");
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todo = {
        id: Date.now(),
        title: newTodo,
        completed: false,
      };
      setTodos([todo, ...todos]); // Add the new todo at the beginning of the array
      setNewTodo('');
    }
  };

  const toggleCompleted = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const editTodo = (id, newTitle) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filteredTodos = showCompleted
  ? todos.filter((todo) => todo.completed)
  : todos;

  return (
    <div className='todo'>
        <header>
            <h1>Todo App</h1>
        </header>
        <section className='section1'>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={addTodo}>Add</button>
        </section>
        <section className='section2'>
        <div>
          <h2 onClick={() => setShowCompleted(false)}>ALL TASKS</h2>
          <h2 onClick={() => setShowCompleted(true)}>COMPLETED TASKS</h2>
        </div>
        </section>
        <section className='section3'>
            <ul type="none">
                {filteredTodos.map((todo) => (
                    <div className='list'>
                        <li
                            key={todo.id}
                            style={{ textDecoration : todo.completed ? 'line-through' : 'none' }}
                            onClick={() => toggleCompleted(todo.id)}
                        >
                            {todo.title}
                        </li>
                        <div className='buttons'>
                            <button onClick={() => editTodo(todo.id, prompt('Edit task:', todo.title))}>
                                Edit
                            </button>
                            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </ul>
        </section>    
    </div>
  );
};


"use client"

import React, { useState, useEffect } from 'react';

const Page = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [mainTask, setMainTask] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setMainTask(savedTasks);
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const submitHandler = (e) => {
    e.preventDefault();
    const newTask = { title, desc };
    setMainTask([...mainTask, newTask]);
    setTitle('');
    setDesc('');

    const updatedTasks = [...mainTask, newTask];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteHandler = (i) => {
    const updatedTasks = mainTask.filter((_, index) => index !== i);
    setMainTask(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  let renderTask = <h2>No Task Available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <li key={i} className='flex items-center justify-between mb-5'>
        <div className='flex items-center justify-between w-2/3'>
          <h5 className='text-2xl font-semibold'>{t.title}</h5>
          <h6 className='text-xl font-semibold'>{t.desc}</h6>
        </div>
        <button
          onClick={() => {
            deleteHandler(i);
          }}
          className='bg-red-400 text-white rounded px-4 py-3 font-bold'
        >
          DELETE
        </button>
      </li>
    ));
  }

  return (
    <>
      <h1 className='bg-black text-white p-5 text-center text-5xl font-bold'>
        RAJEEV's TODO LIST
      </h1>
      <form className='' onSubmit={submitHandler}>
        <input
          type='text'
          className='text-2xl border-zinc-800 border-4 m-8 px-4 py-2'
          placeholder='Enter Title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type='text'
          className='text-2xl border-zinc-800 border-4 m-8 px-4 py-2'
          placeholder='Enter Task'
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <button className='bg-black text-white px-4 py-4 text-2xl rounded-md font-bold m-5'>
          Add Task
        </button>
      </form>

      <hr />
      <div className='p-8 bg-slate-300'>
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default Page;
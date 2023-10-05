// TO DO LIST
"use client"
import { excludeDefaultMomentLocales } from '@/next.config'
import React, { useState } from 'react'
const page = () => {
const [title,settitle]=useState("")
const [desc,setdesc]=useState("")
const [mainTask,setMainTask]=useState([])

const submitHandler=(e)=>{
  e.preventDefault()
  setMainTask([...mainTask,{title,desc}])
  console.log(title)
  console.log(desc)
  settitle("");
  setdesc("");
  console.log(mainTask);
};
const deleteHandler=(i)=>{
  let copytask=[...mainTask]
  copytask.splice(i,1)
  setMainTask(copytask)
}
let renderTask= <h2>No Task Available</h2>;
if(mainTask.length>0){
  renderTask= mainTask.map((t,i)=>{
    return(
    <li key={i} className='flex items-center justify-between mb-5'>
      <div className='flex items-center justify-between w-2/3'>
      <h5 className='text-2xl font-semibold'>{t.title}</h5>
      <h6 className='text-xl font-semibold'>{t.desc}</h6>
    </div>
    <button onClick={()=>{
      deleteHandler(i)
    }}
     className='bg-red-400 text-white rounded px-4 py-3 font-bold'>DELET</button>

    </li>
    );
});

}

  return (
      <>
      <h1 class= 'bg-black
       text-white p-5 text-center text-5xl font-bold'>
        RAJEEV's TODO LIST</h1>
    <form className='' onSubmit={submitHandler}>
      <input type="text" className='text-2xl border-zinc-800 border-4 m-8 px-4 py-2'
      placeholder='Enter Title'
      value = {title}
      onChange={(e)=>{
        settitle(e.target.value)
      }}
      />
      <input type="text" className='text-2xl  border-zinc-800 border-4 m-8 px-4 py-2'
      placeholder='Enter Task'
      value = {desc}
      onChange={(e)=>{
        setdesc(e.target.value)
      }}/>
<button className='bg-black text-white px-4 py-4 text-2xl rounded-md font-bold m-5'>Add Task</button>
    </form>

    <hr/>
    <div className='p-8 bg-slate-300' >

    <ul>
      {renderTask}
    </ul>
    </div>
      </>  
  )
}
export default page

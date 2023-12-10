import React, { useEffect, useState } from 'react'
import './To_Do.css'
import { MdDeleteForever, MdDescription } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function To_Do() {
    const[isCompleteScreen,setIsCompleteScreen]=useState(false); 
    const [allTodos,setTodos]=useState([]);
    const [newTitle,setNewTitle]=useState("");
    const [newDescription,setNewDescription]=useState("")
    const[completedTodos,setCompletedTodos]=useState([])


    const handleAddTodo=()=>{
      let newTodoItem={
        title:newTitle,
        description:newDescription
      }
      let updatedTodoArr=[...allTodos]
      updatedTodoArr.push(newTodoItem)
      setTodos(updatedTodoArr);
      localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
    }
    const handleCompleted=(index)=>{
            let now=new Date();
            let dd=now.getDate();
            let mm=now.getMonth()+1;
            let yyyy=now.getFullYear();
            let h=now.getHours();
            let m=now.getMinutes();
            let s=now.getSeconds();
            let completeOn=dd+'-'+mm+'-'+yyyy+' at'+h+':'+m+':'+s;
            // console.log(completeOn)
            let filteredItem={
              ...allTodos[index],
              completeOn:completeOn
            }
            let updatedCompleteArr=[...completedTodos];
            updatedCompleteArr.push(filteredItem)
            setCompletedTodos(updatedCompleteArr)
            localStorage.setItem('completedTodos',JSON.stringify(updatedCompleteArr))

    }
    const handleDeleteTodo=(index)=>{
       let reducedTodo=[...allTodos]
       reducedTodo.splice(index)//spice method will removed item at specific index
       localStorage.setItem('todolist',JSON.stringify(reducedTodo))
       setTodos(reducedTodo)
    }
    const handleDeleteCompletedTodo=(index)=>{
      let reducedTodo=[...completedTodos]
      reducedTodo.splice(index);//spice method will removed item at specific index
      localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
      setCompletedTodos(reducedTodo)

    };
    useEffect(()=>{
       let savedTodo=JSON.parse(localStorage.getItem('todolist'))
       let savecompletedTodo=JSON.parse(localStorage.getItem('completedTodos'))
      //  console.log(savedTodo)
       if(savedTodo){
        setTodos(savedTodo)
       }
       if(savecompletedTodo){
        setCompletedTodos(savecompletedTodo)
       }
    },[])
    // const handleDeleteTodo=(index)=>{
    //       let reducedTodo={...allTodos};
    //       reducedTodo.splice(index)
    //       localStorage.setItem('todolist',JSON.stringify(reducedTodo))
    //       setTodos(reducedTodo)
    // }
  return (
    <>
         <div className='App'>
            <h1>My Todo List</h1>
              <div className='todo-warpper'>
                     <div className='todo-input'>
                           <div className='todo-input-item'>
                            <lable>Title</lable>
                            <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's The Title Task" ></input>
                           </div>
                           <div className='todo-input-item'>
                            <label>Description</label>
                            <input type='text'  value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}placeholder="What's The  Task Description" ></input>
                           </div>
                           <div className='todo-input-item'>
                                <button type="button" onClick={handleAddTodo} className='PrimaryBtn'>Add</button>
                           </div>
                     </div> 
                     <div className='btn-area'>
                        <button className={`secondaryBtn ${isCompleteScreen===false && 'active'}`} onClick={()=>{setIsCompleteScreen(false)}}>Todo</button>
                        <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`} onClick={()=>{setIsCompleteScreen(true)}}> Complete</button>
                     </div>
                     <div className='todo-list'>
                       {isCompleteScreen===false && allTodos.map((item,index)=>{
                              return(
                                <div className='todo-list-item' key={index}>
                                <div>
                                   <h3>{item.title}</h3>
                                   <p>{item.description}</p>
                                </div>
                                   <div>
                                    <MdDeleteForever className='icon' 
                                     onClick={()=>{handleDeleteTodo(index)}} title='Deleted?'/>
                                    <FaCheck className='chek-icon' onClick={()=>handleCompleted(index)}  />
                                   </div>
                              </div>
                              );
                           })}

                            {isCompleteScreen===true && completedTodos.map((item,index)=>{
                              return(
                                <div className='todo-list-item' key={index}>
                                <div>
                                   <h3>{item.title}</h3>
                                   <p>{item.description}</p>
                                   <p><small>Completed On:{item.completedOn}</small></p>
                                </div>
                                   <div>
                                    <MdDeleteForever className='icon'
                                    onClick={()=>{handleDeleteCompletedTodo(index)}} title='Deleted?' />
                                   </div>
                              </div>
                              )
                       })}

                     </div>
              </div>
         </div>
    </>
  )

}

export default To_Do
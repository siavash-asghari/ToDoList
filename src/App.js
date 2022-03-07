import React, { useState } from 'react';
import './App.css';
import { v4 as uuid } from 'uuid'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { FiEdit, FiTrash } from 'react-icons/fi'



function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [alert, setAlert] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [id, setId] = useState(null)
  const [filter, setFilter] = useState('all')



  const handleAdd = (e) => {
    e.preventDefault()
    if (!task) {
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 3000);
    }
    else if (task && isEditing) {
      setIsEditing(false)
      tasks.map(name => (
        name.id === id.id ? name.task = task : task
      ))
      setTasks([...tasks])
      setTask('')
    }
    else {
      const newTask = {
        id: uuid().slice(0, 8),
        task: task,
        completed: false,
        color: '#BDE0FE'
      }
      setTasks([...tasks, newTask])
      setAlert('')
      setTask('')
    }
  }


  const handleRemove = (item) => {
    const card = tasks.filter(card => card !== item)
    setTasks(card)
  }

  const handleDone = (item) => {
    tasks.map(card => (
      card.id === item.id && (item.completed = !item.completed)
    ))
    item.completed ? (item.color = '#A2D2FF') : (item.color = '#BDE0FE')

    setTasks([...tasks])
  }

  const handleEdit = (item) => {
    tasks.find(card => (
      card.id === item.id && setTask(card.task)
    ))
    setId(item)
    setIsEditing(true)
  }

  const handleCompleted = (e) => {
    setFilter(e.target.dataset['filter'])
  }

  let filtered = [...tasks]
  switch (filter) {
    case 'all':
      filtered = [...tasks]
      break;

    case 'complete':
      filtered = tasks.filter(task => task.completed)
      break;

    case 'uncompleted':
      filtered = tasks.filter(task => !task.completed)
      break;

    default:
      filtered = [...tasks]
  }


  const taskCard = filtered.map((item) => (
    <div className="card" key={item.id} style={{ background: item.color }}>
      <p className={`${item.completed && "taskDone"}`} >{item.task}</p>
      <div className='wrapper'>
        <button className='btnTrash' onClick={() => handleRemove(item)}>
          <FiTrash className='trash' />
        </button>
        <button className='btnDone' onClick={() => handleDone(item)}>
          {item.completed ? <MdCheckBox className='tik' /> : <MdCheckBoxOutlineBlank className='noTik' />}
        </button>
        <button className='btnEdit' onClick={() => handleEdit(item)}>
          <FiEdit className='tik' />
        </button>
      </div>
    </div>
  ))



  return (
    <div className="App">
      <div className='form'>
        <div className='formList'>
          <input type='text' placeholder='تسک' value={task} onChange={(e) => setTask(e.target.value)} />
          <button className='btnAdd' onClick={handleAdd}>
            {isEditing ? 'ویرایش' : 'افزودن'}
          </button>
        </div>
        <div className='filter'>
          <button
            data-filter='all'
            className={`btn ${filter === 'all' ? ' btnAll' : ''}`}
            onClick={handleCompleted}
          >
            تمام تسک ها
          </button>
          <button
            data-filter='complete'
            className={`btn ${filter === 'complete' ? ' btnComplete' : ''}`}
            onClick={handleCompleted}
          >
            کامل شده
          </button>
          <button
            data-filter='uncompleted'
            className={`btn ${filter === 'uncompleted' ? ' btnUncompleted' : ''}`}
            onClick={handleCompleted}
          >
            کامل نشده
          </button>
        </div>
        {alert && <h4 className='alert'>لطفا تسک خود را وارد کنید...</h4>}
      </div>
      <>
        {taskCard.length > 0 ? taskCard : 'شما تسکی ندارید...'}
      </>
    </div>
  );
}

export default App;
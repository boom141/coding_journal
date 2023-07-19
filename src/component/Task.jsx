import React, {useState, useEffect, useRef } from 'react'
import { Form as BTForm, FormGroup, Input, Button, Table} from 'reactstrap'

const Task = () => {
    const task_ref = useRef(null);
    const date_ref = useRef(null);

    const task_list = JSON.parse(localStorage.getItem('task_list'))
    const [tasks,setTasks] = useState(task_list ? task_list : []);


    const getTodayDate = () =>{
        let date = new Date()
        return date.toLocaleDateString()
    }

    const store_task = (e) =>{
        e.preventDefault()

        let task_data = 
        {
            id: Date.now(),
            date: date_ref.current.value,
            task: task_ref.current.value
        }
        
        setTasks([...tasks, task_data])

        e.target.reset()
        window.location.reload()
    }

    const deletetasks = (e) =>{
        let task_list_copy = JSON.parse(localStorage.getItem('task_list'));
        const new_task_list = task_list_copy.filter(task => task.id !== Number(e.target.id));
        
        setTasks(new_task_list)
        window.location.reload()
    }   

    const edittasks = (e) =>{
        let new_data = prompt("Enter New Task: ")
        let task_list_copy = JSON.parse(localStorage.getItem('task_list'));

        task_list_copy.forEach(data => {
            if (data.id === Number(e.target.id)){
                if(new_data){
                   data.task = new_data;
                }
            }
        });

        localStorage.setItem('task_list', JSON.stringify(task_list_copy))
        setTasks(task_list_copy)
        window.location.reload()
    }

    useEffect(()=>{
        localStorage.setItem('task_list', JSON.stringify(tasks))
    }, [tasks])


  return (
    <>
    <BTForm className='w-25 mt-5' onSubmit={store_task}> 

        <FormGroup className='d-flex flex-row justify-content-between'>
            <h5>Task for the Day</h5>
            <div className='d-flex flex-row'>
                <h5>Date: </h5>
                <Input type='text' className='text-center' value={getTodayDate()} innerRef={date_ref} readOnly></Input>
            </div>
        </FormGroup>
        <FormGroup className='d-flex flex-column'>
            <Input type='textarea' innerRef={task_ref}></Input>
            <Button color='primary' className='align-self-end mt-3'>Save</Button>
        </FormGroup>
        <FormGroup>
        <Table className='table table-bordered text-center'>
            <thead>
                <tr text-center>
                    <th>
                        ID
                    </th>
                    <th>
                        Task of The Day
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                { JSON.parse(localStorage.getItem('task_list')).map(data => (
                        <tr>
                            <td onClick={deletetasks}>
                                {data.id}
                            </td>
                            <td>
                                <span className='fw-bold'>{data.date} </span><br />
                                {data.task}
                            </td >
                            <td className='d-flex justify-content-between'>                            
                                <Button id={data.id} color='warning' onClick={edittasks}>Edit</Button>
                                <Button id={data.id} color='danger' onClick={deletetasks}>Delete</Button>
                            </td> 
                        </tr>
                )) }
                
            </tbody>
        </Table>
        </FormGroup>

    </BTForm>
    
    </>
  )
}

export default Task
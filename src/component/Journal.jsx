import React, {useState, useEffect, useRef } from 'react'
import { Form as BTForm, FormGroup, Input, Button, Table} from 'reactstrap'

const Journal = () => {
    const note_ref = useRef(null);
    const date_ref = useRef(null);

    const note_list = JSON.parse(localStorage.getItem('note_list'))
    const [notes,setNotes] = useState(note_list ? note_list : []);
    const [displayData,setDisplay] = useState(true)


    const getTodayDate = () =>{
        let date = new Date()
        return date.toLocaleDateString()
    }

    const store_note = (e) =>{
        e.preventDefault()
        let note_data = 
        {
            id: Date.now(),
            date: date_ref.current.value,
            note: note_ref.current.value
        }
        
        setNotes([...notes, note_data])

        e.target.reset()
        window.location.reload()
    }

    const deleteNotes = (e) =>{
        let note_list_copy = JSON.parse(localStorage.getItem('note_list'));
        const new_note_list = note_list_copy.filter(note => note.id !== Number(e.target.id));
        
        setNotes(new_note_list)
        window.location.reload()
    }   

    const editNotes = (e) =>{
        let new_data = prompt("Enter New Note: ")
        let note_list_copy = JSON.parse(localStorage.getItem('note_list'));

        note_list_copy.forEach(data => {
            if (data.id === Number(e.target.id)){
                if(new_data){
                   data.note = new_data;
                }
            }
        });

        setNotes(note_list_copy)
        window.location.reload()
    }

    // const displayData = () =>{

    // }

    useEffect(()=>{
        setDisplay(false);
        localStorage.setItem('note_list', JSON.stringify(notes))

    }, [notes])


  return (
    <>
    <BTForm className='w-25 mt-5' onSubmit={store_note}> 

        <FormGroup className='d-flex flex-row justify-content-between'>
            <h5>Thoughts for the Day</h5>
            <div className='d-flex flex-row'>
                <h5>Date: </h5>
                <Input type='text' className='text-center' value={getTodayDate()} innerRef={date_ref} readOnly></Input>
            </div>
        </FormGroup>
        <FormGroup className='d-flex flex-column'>
            <Input type='textarea' innerRef={note_ref}></Input>
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
                        Notes of The Day
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                { 
               
                    (JSON.parse(localStorage.getItem('note_list')) ) ?
                        JSON.parse(localStorage.getItem('note_list')).map(data => (
                                <tr>
                                    <td onClick={deleteNotes}>
                                        {data.id}
                                    </td>
                                    <td>
                                        <span className='fw-bold'>{data.date} </span><br />
                                        {data.note}
                                    </td >
                                    <td className='d-flex justify-content-between'>                            
                                        <Button id={data.id} color='warning' onClick={editNotes}>Edit</Button>
                                        <Button id={data.id} color='danger' onClick={deleteNotes}>Delete</Button>
                                    </td> 
                                </tr>
                        )) : false 
                        
             
                }
                      
            </tbody>
        </Table>
        </FormGroup>

    </BTForm>
    
    </>
  )
}

export default Journal
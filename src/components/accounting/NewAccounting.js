import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import Swal from 'sweetalert2';
import SelectCategory from '../selectcategory/SelectCategory'

const NewAccounting = ({userId, handleReload})=>{

    const token = localStorage.getItem("ACCESS_TOKEN");
    
    const [field, setField] = useState({
        date: "",
        concept: "",
        amount: "",        
        type: "",
        category_id: "",
        user_id: userId
      })

    const handleEditChange = (e) => {
        console.log(e.target.name);
            setField({
                ...field,
                [e.target.name]: e.target.value			
            });	
        console.log(field);
        }
        
        
          const handleCreate = async (e) => {
                e.preventDefault();			
                async function postAccounting() { 
                        await axios({
                            method: 'post',
                            url: `//localhost:8000/accounting`,
                            data: field,
                            headers: {'Authorization': token}
                            })
                        .then((res) => {
                  Swal.fire(
                    'Success!',
                    'Your opeartion has been created.',
                    'success'
                    )
                    handleReload();
                        })
                        .catch((error) => {
                  Swal.fire(
                    'Error!',
                    error.response.data.message,           
                    'error'            
                  )
                        });
                }
                postAccounting ();		
            };

    return (
        <Form className='bg-dark p-4 text-light'>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Operation</Form.Label>
              <Form.Control as='select' name='type' onChange={e=>handleEditChange(e)}>
                <option value=''>Choose...</option>   
                <option value='DEBIT'>Debit</option>
                <option value='CREDIT'>Credit</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Categories</Form.Label>
       
              <SelectCategory  handleEditChange={handleEditChange} field={field} token={token} />
              
            </Form.Group>

            <Form.Group as={Col} controlId='formGrid'>
              <Form.Label>Date</Form.Label>
              <Form.Control placeholder='Content' name='date' type='date' onChange={e=>handleEditChange(e)}/>
            </Form.Group>
          </Form.Row>

          <Form.Group >
            <Form.Label>Concept</Form.Label>
            <Form.Control placeholder='Concept' name="concept" onChange={e=>handleEditChange(e)}/>
          </Form.Group>

          <Form.Group >
            <Form.Label>Amount</Form.Label>
            <Form.Control placeholder='Amount' name="amount" type="number" onChange={e=>handleEditChange(e)}/>
          </Form.Group>

          <br />
          <Button variant='primary' type='button' onClick={e=>handleCreate(e)} >
            Submit
          </Button>
        </Form>
    )
}
export default NewAccounting
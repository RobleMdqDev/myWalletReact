import React, { useState } from 'react';
import axios from 'axios';
import { Form, InputGroup, Col, FormControl, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function NewCategory({handleReloadCategories}){


    const token = localStorage.getItem("ACCESS_TOKEN");
  
    const [field, setField] = useState({name: ""});

    const handleEditChange = (e) => {   
        console.log(field);     
            setField({
                ...field,
                [e.target.name]: e.target.value			
            });	      
    }

    const handleNew = async (e) => {
		e.preventDefault();			
		async function postCategory() { 
				await axios({
				    method: 'post',
				    url: `//localhost:8000/category`,
				    data: field,
				    headers: {'Authorization': token}
				    })
				.then((res) => {
                    
          Swal.fire(
            'Success!',
            'Your file has been created.',
            'success'
            )
            handleReloadCategories();
				})
				.catch((error) => {
          Swal.fire(
            'Error!',
            error.response.data.message,           
            'error'            
          )
				});
		}
		postCategory ();		
	};


    return (
        <Form>
        <Form.Row className='align-items-center justify-content-center'>
          <Col xs='auto'>
            <h4> Create New Category</h4>
          </Col>
          <Col xs='auto'>
            <Form.Label htmlFor='inlineFormInputGroup' srOnly>
              
            </Form.Label>
            <InputGroup className='mb-2'>
              <InputGroup.Prepend>
                <InputGroup.Text>C</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl name="name" type="text" placeholder='Categories' onChange={handleEditChange}/>
            </InputGroup>
          </Col>
          <Col xs='auto'>
            <Button type='button' onClick={handleNew} className='mb-2'>
              +
            </Button>
          </Col>
        </Form.Row>
      </Form>
    )
}
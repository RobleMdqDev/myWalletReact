import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, InputGroup, Col, FormControl, Button, Table } from 'react-bootstrap';


function Categories (props) {

	
	return (
    <>
      <h1>CATEGORIES</h1>

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
                <InputGroup.Text><strong>></strong></InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id='inlineFormInputGroup' placeholder='Categories' />
            </InputGroup>
          </Col>
          <Col xs='auto'>
            <Button type='submit' className='mb-2'>
              +
            </Button>
          </Col>
        </Form.Row>
      </Form>
	  
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>            
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Comida</td>
            <td>
              <Button block variant='danger'>
                Delete
              </Button>
            </td>
            <td>
              <Button block variant='info'>
                Edit
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

const mapStateToProps = (state) =>{
	return {token: state}
}

export default connect(mapStateToProps, null)(Categories);


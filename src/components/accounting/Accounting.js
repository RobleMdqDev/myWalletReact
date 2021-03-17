import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, Form, Col, Row, Container, Table } from "react-bootstrap";


function Accounting (props) {
  return (
    <>
      <h1>ACCOUNTING</h1>
      <Container>
        <Form className='bg-dark p-4 text-light'>
          <Form.Row>
            <Form.Group as={Col} controlId='formGridState'>
              <Form.Label>Operation</Form.Label>
              <Form.Control as='select' defaultValue='Choose...'>
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId='formGridState'>
              <Form.Label>Categories</Form.Label>
              <Form.Control as='select' defaultValue='Choose...'>
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridState'>
              <Form.Label>Date</Form.Label>
              <Form.Control placeholder='Content' />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId='formGridAddress1'>
            <Form.Label>Content</Form.Label>
            <Form.Control placeholder='Content' />
          </Form.Group>

          <Form.Group controlId='formGridAddress2'>
            <Form.Label>Amount</Form.Label>
            <Form.Control placeholder='Apartment, studio, or floor' />
          </Form.Group>

          <br />
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Container>
      <Row>
        <Col>
          <Table striped bordered hover variant='dark' className='mt-3'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Concept</th>
                <th>Amount</th>
                <th>Category</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2/10/2020</td>
                <td>Hamburguesas</td>
                <td>$500</td>
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
        </Col>
        <Col>
          <Table striped bordered hover variant='dark' className='mt-3'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Concept</th>
                <th>Amount</th>
                <th>Category</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2/10/2020</td>
                <td>Hamburguesas</td>
                <td>$500</td>
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
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) =>{
	return {token: state}
}

export default connect(mapStateToProps, null)(Accounting);


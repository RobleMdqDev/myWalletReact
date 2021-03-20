import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';


const BalanceSheet = ()=>{

    const token = localStorage.getItem("ACCESS_TOKEN");
	const userId = localStorage.getItem("USER_ID");

    const [tableListC, setTableListC] = useState();
    const [tableListD, setTableListD] = useState();

    const [total, setTotal] = useState(0)

    const [date, setDate] = useState({
        since: "2020-01-01",
        until: "2030-12-31"
    })

    const handleEditChange = (e)=>{
        setDate({
            ...date,
            [e.target.name]: e.target.value
        })
        if (date.since >= date.until) {
            Swal.fire(
                'Error!',
                "Wrong date",           
                'error'            
            )
            setDate({
                since: "2020-01-01",
                until: "2030-12-31"
            })       
        }
        console.log(date);
    }

    useEffect(() => {
        async function getAccounting () { 
            
            await axios.get(`//localhost:8000/accounting/list/${"DEBIT"}&${userId}` , {
                  headers: {
                    'Authorization': token
                  }
                })
                .then((res) => {
                  setTableListD(res.data.response)
                })
                .catch((error) => {
        Swal.fire(
          'Error!',
          error.response.data.message,           
          'error'            
        )
                });
      await axios.get(`//localhost:8000/accounting/list/${"CREDIT"}&${userId}` , {
                  headers: {
                    'Authorization': token
                  }
                })
                .then((res) => {
                  setTableListC(res.data.response)
                })
                .catch((error) => {
        Swal.fire(
          'Error!',
          error.response.data.message,           
          'error'            
        )
                });
            }
    
        getAccounting ();
    
    },[date]);
    
   
    useEffect(()=>{
        
        if (tableListC && tableListD ) {
            let creditAux = 0;
            let debitAux = 0;

            tableListC.filter(item => (date.since <= item.date) && (item.date <= date.until)).map(item => creditAux += item.amount);
            tableListD.filter(item => (date.since <= item.date) && (item.date <= date.until)).map(item => debitAux += item.amount);

            setTotal(creditAux - debitAux);        
        }

    },[tableListC, tableListD]);

    
    return (
      <Card className='bg-light m-3' style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Balance Sheet</Card.Title>
          <Card.Text>
            <h3>{total}</h3>
          </Card.Text>
          <Form.Group as={Col} controlId='formDate'>
              <Form.Label>Since</Form.Label>
              <Form.Control placeholder='Content' name='since' type='date' value={date.since} onChange={(e)=>{handleEditChange(e)}} />
            </Form.Group>
            <Form.Group as={Col} controlId='formDate2'>
              <Form.Label>Until</Form.Label>
              <Form.Control placeholder='Content' name='until' type='date' value={date.until} onChange={(e)=>{handleEditChange(e)}}/>
            </Form.Group>
        </Card.Body>
      </Card>
    );
}

export default BalanceSheet
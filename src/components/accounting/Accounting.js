import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { Col, Row, Container} from "react-bootstrap";
import TableList from '../table/TableList';
import Swal from 'sweetalert2';
import NewAccounting from './NewAccounting';


export default function Accounting (props) {

  const token = localStorage.getItem("ACCESS_TOKEN");
		const userId = localStorage.getItem("USER_ID");
		
		const [reload, setReload] = useState(0)
				
		const [tableListC, setTableListC] = useState();
    const [tableListD, setTableListD] = useState();
			
    const handleReload = ()=>{
			setReload(reload+1);
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
		
		},[reload])	
	

  return (
    <>
      <h1>ACCOUNTING</h1>
      <Container>
        <NewAccounting userId={userId} handleReload={handleReload} />
      </Container>

<br/>

      <Row>
        <Col>
            <h2>Income</h2>
            <TableList tableList={tableListC} handleReloadHome={handleReload} />
        </Col>
        
        <Col>
        <h2>Expenses</h2>
            <TableList tableList={tableListD} handleReloadHome={handleReload} />
        </Col>
      </Row>
    </>
  );
}

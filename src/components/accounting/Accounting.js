import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { Col, Row, Container, Tabs, Tab, Card, ListGroup, FormLabel} from "react-bootstrap";
import TableList from '../table/TableList';
import Swal from 'sweetalert2';
import NewAccounting from './NewAccounting';
import SelectCategory from '../selectcategory/SelectCategory';
import BalanceSheet from '../balancesheet/BalanceSheet';


export default function Accounting (props) {

    const token = localStorage.getItem("ACCESS_TOKEN");
		const userId = localStorage.getItem("USER_ID");

    const [key, setKey] = useState('DEBIT');
    
    const handleTabs = (e)=>{
			setKey(e);						
		}
		
		const [reload, setReload] = useState(0)
		
    const [tableListCat, setTableListCat] = useState([]);
		const [tableListC, setTableListC] = useState();
    const [tableListD, setTableListD] = useState();
			
    const handleReload = ()=>{
			setReload(reload+1);
		} 

    const [field, setField] = useState({     
      name:"",
      category_id: ""
     
    })
  
    const handleEditChange = (e) => {
      // document.querySelector("select").firstChild.textContent()
      console.log(e.target.firstChild.getAttribute("valueName"));
      setField({
        ...field,        
        [e.target.name]: e.target.value			
      });	
      console.log(field);
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
    
    useEffect(() => {
			async function getAccounting () { 
				
				await axios.get(`//localhost:8000/accounting/category/${field.category_id}&${userId}` , {
					  headers: {
						'Authorization': token
					  }
					})
					.then((res) => {
					  setTableListCat(res.data.response)
					})
					.catch((error) => {
            Swal.fire(
              'Error!',
              error.response.data.message,           
              'error'            
            )
					});
      }      
      if (field.category_id) {
        getAccounting ();
      }            
			
		
		},[field, reload])	
	

  return (
    <>
      <h1>ACCOUNTING</h1>
      <Container fluid className="justify-content-md-center">
        <Row>
          <Col md={9}>
            <NewAccounting userId={userId} handleReload={handleReload} />
          </Col>
          <Col md={2}>
            <BalanceSheet />
          </Col>
        </Row>
      </Container>

      <br />

      <Tabs
        id='controlled-tab-example'
        activeKey={key}
        onSelect={(e) => handleTabs(e)}>
        <Tab eventKey='DEBIT' title='Expenses'>
          <TableList tableList={tableListD} handleReloadHome={handleReload} />
        </Tab>
        <Tab eventKey='CREDIT' title='Income'>
          <TableList tableList={tableListC} handleReloadHome={handleReload} />
        </Tab>
        <Tab eventKey='CATEGORY' title='Category'>
        <br/>
          <FormLabel><strong>Select Category: </strong></FormLabel>
          <SelectCategory handleEditChange={handleEditChange} field={field} token={token} />
          <br/>
          <TableList tableList={tableListCat} handleReloadHome={handleReload} />
        </Tab>
      </Tabs>
    </>
  );
}

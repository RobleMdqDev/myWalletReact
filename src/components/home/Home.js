import React, {useEffect, useState} from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';
import './home.css';

import TableList from '../table/TableList';


 
export default function Home (props) {	
		
		const token = localStorage.getItem("ACCESS_TOKEN");
		const userId = localStorage.getItem("USER_ID");

		const [key, setKey] = useState('DEBIT');
		const pg = 10;
		
		const [reload, setReload] = useState(0)
				
		const [tableList, setTableList] = useState();
			
		
		const handleTabs = (e)=>{
			setKey(e);						
		}

		const handleReloadHome = ()=>{
			setReload(reload+1);
		} 
				
		useEffect(() => {
			async function getAccounting () { 
				
				await axios.get(`//localhost:8000/accounting/list/${key}&${userId}&${pg}` , {
					  headers: {
						'Authorization': token
					  }
					})
					.then((res) => {
					  setTableList(res.data.response)
					})
					.catch((error) => {
					  console.error(error)
					});
				}
			getAccounting ();
			console.log({reloadHome: reload})
		},[key, reload])	
	
		return (
				<>
				
						<h1>HOME</h1>
							
											
								<Tabs 
									id="controlled-tab-example"
									activeKey={key}
									onSelect={(e) => handleTabs(e)}
								>
									<Tab eventKey="DEBIT" title="DEBIT">
									<TableList tableList={tableList} handleReloadHome={handleReloadHome}/>								
								</Tab>
								<Tab eventKey="CREDIT" title="CREDIT">
									<TableList tableList={tableList} handleReloadHome={handleReloadHome}/>
								
								</Tab>
								
							</Tabs>
										
					
							
				</>
			)
}

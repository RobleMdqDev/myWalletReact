
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import RowTableList from "./RowTableList";

const TableList = ({tableList, handleReloadHome})=>{
  	
  const [tableListHtml, setTableListHtml] = useState();   
   
  function handleReload(){
    handleReloadHome();
    
  }

  useEffect(() => {
    
    if(tableList !== undefined){
      const tableListAux = tableList.map((list, index) => (
        <tr key={index}>
          <RowTableList key={list.id} list={list} handleReload={handleReload}/>						
        </tr>
      ));
      setTableListHtml(tableListAux);
      }
  },[tableList])

    return(

      <Table striped bordered hover variant="dark">
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
        {tableListHtml}									
      </tbody>
    </Table>		
    )

}

export default TableList
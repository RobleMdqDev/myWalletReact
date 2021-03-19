
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import RowTableListCategories from "./RowTableListCategories";

const TableListCategories = ({tableList, handleReloadCategories})=>{
  	
  const [tableListHtml, setTableListHtml] = useState();   
   
  function handleReload(){
    handleReloadCategories();
    
  }

  useEffect(() => {
    
    if(tableList !== undefined){
      const tableListAux = tableList.map((list, index) => (
        <tr key={index}>
          <RowTableListCategories key={list.id} list={list} handleReload={handleReload}/>						
        </tr>
      ));
      setTableListHtml(tableListAux);
      }
  },[tableList])

    return(

      <Table responsive="md" striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Category Name</th>          
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

export default TableListCategories
import React, {useEffect, useState} from 'react';
import axios from 'axios';


import TableListCategories from './TableListCategories';
import NewCategory from './NewCategory';
import Swal from 'sweetalert2';


export default function Categories (props) {

	const token = localStorage.getItem("ACCESS_TOKEN");
	
  
  const [reload, setReload] = useState(0)
				
  const [tableList, setTableList] = useState();

  const handleReloadCategories = ()=>{
    setReload(reload+1);
  } 
       

    useEffect(() => {
        async function getTableList () { 
            
            await axios.get(`//localhost:8000/category` , {
                headers: {
                'Authorization': token
                }
            }).then((res) => {
                setTableList(res.data.response)
            }).catch((error) => {
              Swal.fire(
                'Error!',
                error.response.data.message,           
                'error'            
              )
            });

        };
        
        getTableList ();

    },[reload]);


	return (
    <>
      <h1>CATEGORIES</h1>

      <NewCategory handleReloadCategories={handleReloadCategories} />
	  
      <TableListCategories tableList={tableList} handleReloadCategories={handleReloadCategories} />
    </>
  );
}

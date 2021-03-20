import axios from 'axios';
import React, { useState} from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2';

import SelectCategory from '../selectcategory/SelectCategory';

const RowTableList = ({list, handleReload})=>{
 

  const token = localStorage.getItem("ACCESS_TOKEN");
  
  const [field, setField] = useState({
    date: list.date,
    concept: list.concept,
    amount: list.amount,
    category: list.name,
    type: list.type,
    category_id: list.category_id,
    user_id: list.user_id
  })

  const handleEditChange = (e) => {
    console.log(e.target.name);
		setField({
			...field,
			[e.target.name]: e.target.value			
		});	
    console.log(field);
	}

  const handleDelete = (e) => {
    e.preventDefault()		   
    
      async function deleteAccounting () {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
          if (result.isConfirmed) {
            axios({
              method: 'delete',
              url: `//localhost:8000/accounting/` + e.target.value,
              headers: {'Authorization': token},
            }).then((res)=>{
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            })
            .catch((error) => {                 
              Swal.fire(
                'Error!',
                error.response.data.message,           
                'error'            
              )
              								 
            });
            handleReload();
          }
          })					
      }
    deleteAccounting ();
  }

  

  const handleEdit = async (e) => {
		e.preventDefault();			
		async function putAccounting() { 
				await axios({
				    method: 'put',
				    url: `//localhost:8000/accounting/`+list.id,
				    data: field,
				    headers: {'Authorization': token}
				    })
				.then((res) => {
          Swal.fire(
            'Success!',
            'Your file has been edited.',
            'success'
            )
            handleReload();
				})
				.catch((error) => {
          Swal.fire(
            'Error!',
            error.response.data.message,           
            'error'            
          )
				});
		}
		putAccounting ();		
	};
    

    return (
        <>
          <td id="dateList"> <input type="date" name="date" onChange={handleEditChange} value={(field.date).slice(-24, 10)} /></td>
          <td id="conceptList"><input type="text" name="concept" onChange={handleEditChange} value={field.concept}/></td>
          <td id="amountList"><input type="text" name="amount" onChange={handleEditChange} value={field.amount}/></td>
          <td id="categorList"><SelectCategory handleEditChange={handleEditChange} field={field} token={token} /></td>    						
          
          <td><Button block variant="danger" onClick={(e)=>handleDelete(e)} value={list.id}>Delete</Button></td>
          <td><Button block variant="info"  onClick={(e)=>handleEdit(e)} value ={list.id}>Edit</Button></td>
        </>
    )

}

export default RowTableList
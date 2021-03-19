import axios from 'axios';
import React, { useState} from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2';

const RowTableListCategories = ({list, handleReload})=>{
 

  const token = localStorage.getItem("ACCESS_TOKEN");
  
  const [field, setField] = useState({
    id: list.id,
    name: list.name    
  })

  const handleDelete = (e) => {
    e.preventDefault()		   
    
      async function deleteCategories () {
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
              url: `//localhost:8000/category/` + e.target.value,
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
    deleteCategories ();
  }

  const handleEditChange = (e) => {
    console.log(e.target.name);
		setField({
			...field,
			[e.target.name]: e.target.value			
		});	
    console.log(field);
	}

  const handleEdit = async (e) => {
		e.preventDefault();			
		async function putAccounting() { 
				await axios({
				    method: 'put',
				    url: `//localhost:8000/category/`+list.id,
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
          <td id="conceptList"><input type="text" name="id" onChange={handleEditChange} value={field.id} disabled/> </td>          
          <td id="categorList"><input type="text" name="name" onChange={handleEditChange} value={field.name}/></td>    						
          
          <td><Button block variant="danger" onClick={(e)=>handleDelete(e)} value={list.id}>Delete</Button></td>
          <td><Button block variant="info"  onClick={(e)=>handleEdit(e)} value ={list.id}>Edit</Button></td>
        </>
    )

}

export default RowTableListCategories
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const SelectCategory = ({handleEditChange, field, token}) => {

    const [categories, setCategories] = useState()

    useEffect(() => {
        async function getCategories () { 
            
            await axios.get(`//localhost:8000/category` , {
                headers: {
                'Authorization': token
                }
            }).then((res) => {
                setCategories(res.data.response)
            }).catch((error) => {
                Swal.fire(
                    'Error!',
                    error.response.data.message,           
                    'error'            
                  )
            });

        };
        
        getCategories ();

    },[]);
    
    if (categories) {
        return(
        <select className="form-control" name="category_id" onChange={(e)=>{handleEditChange(e)}}>
            <option value={field.category_id} >{field.category}</option>
            {categories.map((category, index) => <option key={index} value={category.id} >{category.name}</option>)}
        </select>
        )
    }
    return (
        
        <select name="name" onChange={(e)=>{handleEditChange(e)}}>
            <option value={field.id}>{field.category}</option>
            
        </select>
        
    ); 
    
}

export default SelectCategory;
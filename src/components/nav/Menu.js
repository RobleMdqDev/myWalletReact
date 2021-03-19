import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

import "./menu.css";

export default function Menu () {

	const userName = "Welcome "+localStorage.getItem("USER");

	const salirLog = ()=>{
        Swal.fire({
            title: 'Cerrar la sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Salir!'
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                setTimeout(()=>{
                    window.location.href = '/';
                },500);
            }
          }) 
    }

	return(
		
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Navbar.Brand><h1>My Wallet</h1></Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto" >
						
							<Link className="links" to ={"/"}>					
								Home						   
							</Link>
						<br/>
						
							<Link className="links" to ={"/categories"}>
								Categories					   
							</Link>
						<br/>
						
							<Link className="links" to ={"/accounting"}>
								Accounting					   
							</Link>
						<br/>			
					</Nav>	
					<NavDropdown  title={userName} id="collasible-nav-dropdown">
						<NavDropdown.Item onClick={salirLog}>Exit</NavDropdown.Item>
					</NavDropdown>				
				</Navbar.Collapse>
			</Navbar>
	);

}

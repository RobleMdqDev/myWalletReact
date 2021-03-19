import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/header/Header';
import Home from './components/home/Home';
import Categories from './components/categories/Categories';
import Accounting from './components/accounting/Accounting';
import { Container } from 'react-bootstrap';




export default function Router (){


	return(

		<BrowserRouter>

			<Header />

				<Container fluid className="mt-3">
					<Switch>
						
						<Route exact path="/" component={Home} />						
						<Route  path="/categories" component={Categories} />
						<Route  path="/accounting" component={Accounting} />
						<Route component={Error} />

					</Switch>
				</Container>			
		
		</BrowserRouter>
	);	
}


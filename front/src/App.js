import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Home from './components/HomePage/Home';
import NotFound from './components/NotFound/NotFound';
import Products from './components/ProductsPage/Products';

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  };


  componentWillMount(){
    }




  render() {
    return (
      <Router>
				<Header/>
					<Switch>
						<Route exact  path="/" component={Home} />
            <Route exact  path="/products" component={Products} />
            <Route
              exact
              path="/products/:type"
              component={Products}
            />
            <Route component={NotFound}/>
				</Switch>
      </Router>
    );
  }
}

export default App;

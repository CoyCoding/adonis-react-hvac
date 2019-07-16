import React, {Component} from 'react';
///import NotFound from './components/NotFound/NotFound';
import GridItem from './GridItem';
import './ProductsDisplayGrid.scss';
import Filters from './Filters/Filters';
import Pagination from 'react-router-pagination';
import Loading from '../../Utils/Loading/Loading';
import axios from 'axios';

class ProductsDisplayGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelection: '',
      products: undefined,
      call: '',
      productCount: ''
    };
  };

  getAllProducts () {
    var self = this;
    const queryString = this.getFilterQueries(this.props.queries)
    setTimeout(function() {
    axios.get(`/api/v1/getProductsByType${queryString}`)
        .catch(error => console.log(error))
        .then(response =>
          self.setState({
          products: response.data.result,
          productCount: response.data.count
        }))
    }, 1000)
  }

  getFilterQueries(queries){
    let queryString = `?type=${this.state.currentSelection}&pageNum=${this.props.page}&limit=${this.props.limit}`;
    Object.keys(queries).map(key=>{
      if(queries[key]){
        queryString += `&${key}=${queries[key]}`
      }
    })
    return queryString;
  }

  componentWillMount(){
    //on mount if exact route wasn't /products render with
    //minimized pictures
    this.setState({
      currentSelection: this.props.selectedType,
    }, ()=> {
      this.getAllProducts();
    })
  }

  componentWillReceiveProps(newprops){
    //this handles forward and backwards movement routing browser
    if(this.state.currentSelection !== newprops.selectedType || true){
      this.setState({
        currentSelection: newprops.selectedType,
        products: undefined
      }, ()=> {
        this.getAllProducts()
      })
    }
  }

  isLoaded(){
    return this.state.products
  }

  getPageInfo(){
    return {path: '/products/:type/:pageNumber/:offset', params: {type: this.state.currentSelection, offset: this.props.limit}}
  }

  handleFilter = async (submitEvent) =>{
    submitEvent.preventDefault();
    console.log('yes')
  }

  getTotalPages(){
    return Math.ceil(this.state.productCount/this.props.limit)
  }

  test(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  render(){

    return (
      <>
      <div className="product-grid-wrapper">
        <Filters currentSelection={this.state.currentSelection}/>
        <DisplayGrid productSelected={this.props.productSelected} products={this.state.products} history={this.props.history}/>

      </div>
      {this.isLoaded() ? <Pagination match={this.getPageInfo()} onClick={this.test}totalPages={this.getTotalPages()} pageNumber={this.props.page} spread={12/2} /> : <></>}
      </>
    );
  }

}


function DisplayGrid(props) {
  return props.products ?   <div id="product-section">
      <div id="product-grid" >
        <GridItem productSelected={props.productSelected} products={props.products} history={props.history} />
      </div>
    </div> : <Loading/>

  }

export default ProductsDisplayGrid;

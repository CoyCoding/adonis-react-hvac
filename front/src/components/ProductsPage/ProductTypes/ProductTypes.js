import React, {Component} from 'react';
///import NotFound from './components/NotFound/NotFound';
import './ProductTypes.scss';
class ProductTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: undefined,
      selectedType: '',
      fadeClass: ''
    };
  };

  componentWillMount(){
    //on mount if exact route wasn't /products render with
    //minimized pictures
    if(this.props.selectedType){
      this.setState({
        fadeClass: 'fade'
      })
    }
  }

  componentWillReceiveProps(props){
    //depending on the selected category props changing set fadeClass
    //this handles forward and backwards movement routing browser
    if(!props.selectedType){
      this.setState({
        fadeClass: ''
      })
    }else{
      this.setState({
        fadeClass: 'fade'
      })
    }
  }

  selection(value){
    //when a selection is made set fadeClass and push new location in history
    this.setState({
      fadeClass: 'fade'
    })
    this.props.history.push(`/products/${value}`)
  }

render(){
  return (
    <div className="product-type-grid">
      <div className={`gas bg-img ${this.state.fadeClass} ${(this.props.selectedType === 'gas' )? 'selected': ''}`} onClick={()=> this.selection('gas')}>
        <div className="type">Gas Fireplaces</div>
      </div>
      <div className={`wood bg-img ${this.state.fadeClass} ${(this.props.selectedType === 'wood' )? 'selected': ''}` }onClick={()=> this.selection('wood')}>
        <div className="type">Wood Fireplaces</div>
      </div>
      <div className={`electric bg-img ${this.state.fadeClass}  ${(this.props.selectedType === 'electric' )? 'selected': ''}` }onClick={()=> this.selection('electric')}>
        <div className="type">Electric Fireplaces</div>
      </div>
      <div className={`outdoors bg-img ${this.state.fadeClass}  ${(this.props.selectedType === 'outdoors' )? 'selected': ''}`} onClick={()=> this.selection('outdoors')}>
        <div className="type">Outdoor Fireplaces</div>
      </div>
    </div>
  );
}


}

export default ProductTypes;

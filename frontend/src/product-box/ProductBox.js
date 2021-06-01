import shippingIcon from '../assets/ic_shipping.png';
import Col from 'react-bootstrap/Col';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom'
import './ProductBox.css';

function ProductBox(props){  
    let history = useHistory();
    let product = props.product;

    function goToProduct(){
        console.log(product);
        history.push('/items/' + product.id);
    }

    return (
    <Col md={{ span: 10, offset: 1}} className="BoxContainer" >
        <Col md={3} className="p-16 f-left">
            <img className="ImageBox" 
                 alt="productImage"
                 onClick={goToProduct}
                 src={product.picture}/>
        </Col>
        <Col md={4} className="f-left w-100">
            <div className="PriceLabel">
                <NumberFormat value={product.price.amount} 
                              displayType={'text'} 
                              thousandSeparator={'.'} 
                              decimalSeparator={','}
                              prefix={'$'} />
                {product.free_shipping && <img className="ShippingIcon" alt="shippingIcon" src={shippingIcon} />}
                <label className="LocationLabel">{product.location}</label>
            </div>
            <div className="DescriptionLabel" 
                 onClick={goToProduct}>
                {product.title} <br/>
                {product.condition === "new" ? 'Nuevo' : 'Usado'}
            </div> 
        </Col>
    </Col>
)}

export default ProductBox;  
import SearchBox from '../search-box/SearchBox';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import './ItemDetail.css';

function ItemDetail(props) {
    const pageParams = useParams();
    const [product, setProduct] = useState({
        author: {},
        categories: [],
        item: {}
    });

    useEffect(() => {
        fetch("http://localhost:3001/api/items/" + pageParams.id, {
            "method": "GET"
            })
            .then(response => response.json())
            .then((data) => { setProduct(data);})
            .catch(err => { console.log(err); 
            })
    }, [pageParams.id])

    return (
        <div>
            <SearchBox />
            <Container className="Breadcrumb">
                <Col md={{ span: 10, offset: 1}}>
                    {product.categories.join(" > ")}
                </Col>
            </Container>
            <Container className="mb-32">
                <Col md={{ span: 10, offset: 1}} className="ItemContainer" >
                    <Container className="d-flex">                    
                        <Col md={8} className="p-16 f-left">
                            <img className="Image" 
                                alt = "productImage"
                                src={product.item.picture}/>
                        </Col>
                        <Col md={4} className="f-left mt-32 pl-16">
                            <label clasName="ConditionLabel">{product.item.condition === "new" ? 'Nuevo' : 'Usado'} - {product.item.sold_quantity} vendidos</label>
                            <label className="TitleLabel"> {product.item.title}</label>
                            <label className="PriceLabel">
                                <NumberFormat value={product.item.price ? product.item.price.amount : "-"} 
                                    displayType={'text'} 
                                    thousandSeparator={'.'} 
                                    decimalSeparator={','}
                                    prefix={'$'} />
                            </label>
                            <div className="mt-32 pr-32">
                                <Button variant="primary" className="ComprarButton">Comprar</Button>
                            </div>
                            
                        </Col>                    
                    </Container>
                    <Container className="d-flex">                    
                        <Col md={8} className="pl-32">
                            <label className="LabelDescription">Descripcion del producto</label>
                            <label className="LabelProductDescription">{product.item.description}</label>
                        </Col>
                    </Container>
                </Col>
            </Container>
        </div>
    )}

    export default ItemDetail;
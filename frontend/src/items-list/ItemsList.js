import SearchBox from '../search-box/SearchBox';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import ProductBox from '../product-box/ProductBox';
import queryString from 'query-string'
import {useState, useEffect} from 'react';

function ItemsList(props){
    const queryParams = queryString.parse(props.location.search);
    const [values, setValues] = useState({
        author: {},
        categories: [],
        items: []
      });
    
    useEffect(() => {
        fetch("http://localhost:3001/api/items?q=" + queryParams.search, {
            "method": "GET"
            })
            .then(response => response.json())
            .then((data) => { setValues(data);})
            .catch(err => { console.log(err); 
            })
    }, [queryParams.search])

    return (
        <div>
            <SearchBox searchTerm={queryParams.search} />
            <Container className="Breadcrumb">
                <Col md={{ span: 10, offset: 1}}>
                    {values.categories.join(" > ")}
                </Col>
            </Container>
            <Container className="mb-32">
        {values.items.map((product) => (
            <ProductBox product={product} />
    ))}
    </Container>
        </div>
    )
}

export default ItemsList;

import './SearchBox.css';
import meliLogo from '../assets/Logo_ML.png';
import searchLogo from '../assets/ic_Search.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState} from 'react';
import { useHistory } from 'react-router-dom';

function SearchBox(props) {    
    let history = useHistory();
    const [search, setSearch] = useState('');
    
    if(search === ''){
        setSearch(props.searchTerm);
    }
    
    function handleKeyDown(event) {
        if (event.key === 'Enter' && search !== '') {
            filterResults();
        }
    }

    function filterResults() {
        if (search !== ''){
            history.push('/items?search=' + search);
        }
    }

    function goHome(){
        history.push('/');
    }

  return (
    <div>
      <header className="App-header">
        <Container>
              <Row>
                  <Col md={{ span: 1, offset: 1}}>
                      <img className="Logo" src={meliLogo} alt="logo" height='30px' 
                           onClick={goHome} />
                  </Col>
                  <Col md={8} className="m-13">
                      <input type="text" className="Buscador" 
                             value={search} onChange={(e) => {setSearch(e.target.value)}}
                             onKeyDown={handleKeyDown}
                             placeholder="Nunca dejes de buscar"/>
                    <button className="SearchButton" onClick={filterResults}>
                        <img src={searchLogo} alt="busqueda" className="SearchIcon"/>
                    </button>
                  </Col>
              </Row>
          </Container>
      </header>
      <div className="App">
      </div>
    </div>
  );
}

export default SearchBox;

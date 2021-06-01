import SearchBox from './search-box/SearchBox';
import ItemsList from './items-list/ItemsList';
import ItemDetail from './item-detail/ItemDetail';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    return (
        <Router>
        <div>
          <Switch>
              <Route exact path='/' component={SearchBox} />
              <Route path='/items/:id' component={ItemDetail} />
              <Route path='/items' component={ItemsList} />
          </Switch>
        </div>
      </Router>
    )
}

export default App

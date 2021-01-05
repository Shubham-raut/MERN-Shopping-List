import React, { useEffect } from 'react';

import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';

import { useDispatch } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { loadUser } from './actions/authActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <ItemModal />
        <ShoppingList />
      </Container>
    </div>
  );
}

export default App;

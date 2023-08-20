import { Routes, Route } from 'react-router-dom';
import Search from './Pages/SearchBar';
import Home from './Pages/Home';
import Block from './Pages/Block';
import Transaction from './Pages/Transaction';
import Address from './Pages/Address';
import './styles/App.css'


function App() {

  return (
    <>
      {/* <NavBar/> */}
      <Search />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Block/:input' element={<Block />} />
        <Route path='/Transaction/:input' element={<Transaction />} />
        <Route path='/Address/:input' element={<Address />} />
      </Routes>
    </>
  );
};

export default App;

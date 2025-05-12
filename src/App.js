import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './components/Game/Game';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </Router>
  )

}

export default App;

// can implement DB stuff w/ users, ID, username, password, email, high-scores, etc.
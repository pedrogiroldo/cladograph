import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
import Home from './pages/home/Home';
import './App.css';
import AddTraitsPage from './pages/addTraits/AddTraitsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addTraits" element={<AddTraitsPage />} />
      </Routes>
    </Router>
  );
}

import { useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { homeButton, navbar } from './styles';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={navbar}>
      <div>Logo</div>
      <AiOutlineHome
        onClick={() => navigate('/')}
        size="2.5em"
        color="#1976D2"
        style={homeButton}
      />
    </div>
  );
}

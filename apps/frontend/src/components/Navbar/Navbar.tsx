import { AiOutlineHome } from "react-icons/ai";
import { homeButton, navbar } from "./styles";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <div style={navbar}>
      <div>Logo</div>
      <AiOutlineHome
        onClick={() => router.replace("/")}
        size="2.5em"
        color="#1976D2"
        style={homeButton}
      />
    </div>
  );
}

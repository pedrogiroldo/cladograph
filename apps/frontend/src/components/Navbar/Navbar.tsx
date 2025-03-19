import { AiOutlineHome } from "react-icons/ai";
import { homeButton, logo, navbar } from "./styles";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  printMode?: boolean | undefined;
}

export default function Navbar(props: Props) {
  const router = useRouter();

  if (!props.printMode) {
    return (
      <div style={navbar}>
        <Image
          alt="Cladograph logo"
          src={"/cladographLogo.png"}
          width={5000}
          height={2500}
          style={logo}
          onClick={() => router.replace("/")}
        />
        <AiOutlineHome
          onClick={() => router.replace("/")}
          size="2.5em"
          color="#1976D2"
          style={homeButton}
        />
      </div>
    );
  } else if (props.printMode) {
    <div style={navbar}>
      <Image
        alt="Cladograph logo"
        src={"/cladographLogo.png"}
        width={5000}
        height={2500}
        style={logo}
        onClick={() => router.replace("/")}
      />
    </div>;
  }
}

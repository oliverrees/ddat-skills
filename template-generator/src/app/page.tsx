import { FaGithub } from "react-icons/fa";
import { ConfigureRole } from "./components/ConfigureRole";
import { Container } from "./components/Container";
import { processData } from "./lib/processData";
import Link from "next/link";
import SFIA_DDAT from "../data/sfia-ddat.json";



export default async function Home() {
  const data = SFIA_DDAT;
  

  return (
    <Container>
      <ConfigureRole data={data} />
      <div>
        <Link
          href="https://github.com/oliverrees/ddat-skills/tree/main"
          target="_blank"
          className="text-blue-600 text-2xl fixed bottom-0 right-0 p-4"
        >
          <FaGithub />
        </Link>
      </div>
    </Container>
  );
}

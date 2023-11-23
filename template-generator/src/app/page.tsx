import { FaGithub } from "react-icons/fa";
import { ConfigureRole } from "./components/ConfigureRole";
import { Container } from "./components/Container";
import { processData } from "./lib/processData";
import Link from "next/link";

const getData = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/oliverrees/ddat-skills/main/skills.json"
  );
  const data = await res.json();
  return data;
};

export default async function Home() {
  const data = await getData();
  const processedData = processData(data);

  return (
    <Container>
      <ConfigureRole processedData={processedData} />
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

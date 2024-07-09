import HttpClient from "./HttpClient";

const phylogeneticTreeScriptsClient = new HttpClient(
  `${process.env.NEXT_PUBLIC_API_URL}/phylogenetic-tree-scripts`
);

export default async function generateNewick(props) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/phylogenetic-tree-scripts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    }
  ).then((res) => res);
  return response.text();
}

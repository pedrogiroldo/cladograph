import { DescendantObjectsArray } from "@/models/descendantsTypes";
import { ExternalGroup } from "@/models/externalGroupTypes";
import { TraitObjectsArray } from "@/models/traitsTypes";

interface Props {
  traits: TraitObjectsArray;
  externalGroup: ExternalGroup;
  descendants: DescendantObjectsArray;
}

export default class PhylogeneticTreeScriptRequests {
  private baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/phylogenetic-tree-scripts`;

  public async generateNewick(props: Props, accessToken: string | undefined) {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(props),
    }).then((res) => res);
    return response.text();
  }
}

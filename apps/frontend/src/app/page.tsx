"use client";
/* eslint-disable react/jsx-no-bind */
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, TextField } from "@mui/material";
import Tree from "../components/Tree/Tree";
import { TraitObjectsArray } from "../models/traitsTypes";
import { getTraits } from "../scripts/cacheManager/traitsCRUD";
import defaultNewick from "./defaultTree";
import { ExternalGroup } from "../models/externalGroupTypes";
import { getExternalGroup } from "../scripts/cacheManager/externalGroupCRUD";
import { DescendantObjectsArray } from "../models/descendantsTypes";
import {
  getDescendants,
  saveDescendants,
} from "../scripts/cacheManager/descendantsCRUD";
import {
  getTreeNewick,
  saveTreeNewick,
} from "../scripts/cacheManager/treeNewickCRUD";
import styles from "./styles.module.css";
import { FaRegUserCircle } from "react-icons/fa";
import { userButton } from "./userButtonStyles";
import Requests from "@/requests/requests";
import StorageManager from "@/utils/storageManager/storageManager.util";
import UpdateTraitsWithItsDescendants from "@/scripts/updateTraitsWithItsDescendants/updateTraitsWithItsDescendants";

const requests = new Requests();

interface treeResponse {
  newick: string;
  descendants: DescendantObjectsArray;
}

export default function Home() {
  const [cachedTraits, setCachedTraits] = useState<
    TraitObjectsArray | undefined
  >(undefined);
  const [cachedExternalGroup, setCachedExternalGroup] = useState<
    ExternalGroup | undefined
  >(undefined);
  const [cachedDescendants, setCachedDescendants] = useState<
    DescendantObjectsArray | undefined
  >(undefined);

  const router = useRouter();

  const [nwkInputValue, setNwkInputValue] = useState("");

  const setNwkInputValueFunc = (e: any) => {
    setNwkInputValue(e.target.value);
  };

  const [activeNwkOnTree, setActiveNwkOnTree] = useState("");

  function updateTree() {
    setActiveNwkOnTree(nwkInputValue);
  }

  function hasSavedData() {
    if (
      cachedTraits !== undefined &&
      cachedExternalGroup !== undefined &&
      cachedDescendants !== undefined
    ) {
      return true;
    } else return false;
  }

  useEffect(() => {
    if (!StorageManager.Tokens.isSaved()) {
      router.replace("/login");
    }

    setCachedTraits(getTraits());
    setCachedExternalGroup(getExternalGroup());
    setCachedDescendants(getDescendants());
    const cachedNewick = getTreeNewick();
    if (cachedNewick !== undefined) {
      setActiveNwkOnTree(cachedNewick);
    } else {
      setActiveNwkOnTree(defaultNewick);
    }
  }, [router]);

  return (
    <div className={styles.Home}>
      <div className={styles.treeArea}>
        <Tree newick={activeNwkOnTree} printMode={false} />
      </div>
      <div className={styles.optionsArea}>
        <div className={styles.topArea}>
          <div className={styles.nwkInputAndButton}>
            <TextField
              variant="standard"
              className={styles.nwkInput}
              type="text"
              placeholder="Insira um newick aqui"
              onChange={setNwkInputValueFunc}
            />
            <Button
              id={styles.generateNwkButton}
              onClick={updateTree}
              variant="outlined"
            >
              Gerar
            </Button>
          </div>
          <Button
            id={styles.templateButton}
            size="large"
            onClick={() => router.replace("/templates")}
            variant="contained"
          >
            Templates
          </Button>
          <FaRegUserCircle
            onClick={() => router.replace("/user")}
            size="2.5em"
            color="#1976D2"
            style={userButton}
          />
        </div>
        <div className={styles.comparatorArea}>
          <h1 id={styles.comparatorTitle}>Comparador</h1>
          <ButtonGroup
            className={styles.buttonGroup}
            variant="outlined"
            size="large"
            orientation="vertical"
          >
            <Button onClick={() => router.replace("/addTraits")}>
              Adicionar características
            </Button>

            <Button onClick={() => router.replace("/addExternalGroup")}>
              Adicionar grupo ext.
            </Button>
            <Button onClick={() => router.replace("/addDescendants")}>
              Adicionar descendentes
            </Button>
            <Button
              onClick={async () => {
                if (hasSavedData()) {
                  const response: treeResponse =
                    await requests.phylogeneticTreeScriptRequests.generateNewick(
                      {
                        //@ts-ignore already verified on hasSavedData function
                        traits: cachedTraits,
                        //@ts-ignore already verified on hasSavedData function
                        externalGroup: cachedExternalGroup,
                        //@ts-ignore already verified on hasSavedData function
                        descendants: cachedDescendants,
                      }
                    );
                  setActiveNwkOnTree(response.newick);
                  saveTreeNewick(response.newick);
                  saveDescendants(response.descendants);

                  new UpdateTraitsWithItsDescendants();
                } else {
                  // eslint-disable-next-line no-console
                  console.error("Missing data!");
                }
              }}
            >
              Gerar árvore
            </Button>
          </ButtonGroup>
          <Button
            onClick={async () => {
              if (hasSavedData()) {
                const response: treeResponse =
                  await requests.phylogeneticTreeScriptRequests.generateNewick({
                    //@ts-ignore already verified on hasSavedData function
                    traits: cachedTraits,
                    //@ts-ignore already verified on hasSavedData function
                    externalGroup: cachedExternalGroup,
                    //@ts-ignore already verified on hasSavedData function
                    descendants: cachedDescendants,
                  });
                setActiveNwkOnTree(response.newick);
                saveTreeNewick(response.newick);
                saveDescendants(response.descendants);

                new UpdateTraitsWithItsDescendants();
                console.log(getTraits());
                console.log(getDescendants());

                router.replace("/teachingMaterial");
              } else {
                // eslint-disable-next-line no-console
                console.error("Missing data!");
              }
            }}
            variant="contained"
            disabled={hasSavedData() ? false : true}
            className={styles.teachingMaterialButton}
          >
            Material didático
          </Button>
        </div>
      </div>
    </div>
  );
}

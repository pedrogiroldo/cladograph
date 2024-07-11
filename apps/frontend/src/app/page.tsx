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
import { getDescendants } from "../scripts/cacheManager/descendantsCRUD";
import {
  getTreeNewick,
  saveTreeNewick,
} from "../scripts/cacheManager/treeNewickCRUD";
import styles from "./page.module.css";
import generateNewick from "../requests/phylogeneticTreeScript.requests.js";
import { FaRegUserCircle } from "react-icons/fa";
import { userButton } from "./userButtonStyles";
import Requests from "@/requests/requests";
import StorageManager from "@/utils/storageManager/storageManager.util";

const requests = new Requests();

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

  useEffect(() => {
    setCachedTraits(getTraits());
    setCachedExternalGroup(getExternalGroup());
    setCachedDescendants(getDescendants());
    const cachedNewick = getTreeNewick();
    if (cachedNewick !== undefined) {
      setActiveNwkOnTree(cachedNewick);
    } else {
      setActiveNwkOnTree(defaultNewick);
    }
  }, []);

  return (
    <div className={styles.Home}>
      <div className={styles.treeArea}>
        <Tree newick={activeNwkOnTree} />
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
              id="generateNwkButton"
              onClick={updateTree}
              variant="contained"
            >
              Gerar
            </Button>
          </div>
          <Button
            id="templateButton"
            size="large"
            onClick={() => router.replace("/templates")}
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
          <h1 id="comparatorTitle">Comparador</h1>
          <ButtonGroup variant="outlined" size="large" orientation="vertical">
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
                if (
                  cachedTraits !== undefined &&
                  cachedExternalGroup !== undefined &&
                  cachedDescendants !== undefined
                ) {
                  console.log(StorageManager.Token.getAccess());
                  const newick: string =
                    await requests.phylogeneticTreeScriptRequests.generateNewick(
                      {
                        traits: cachedTraits,
                        externalGroup: cachedExternalGroup,
                        descendants: cachedDescendants,
                      },
                      StorageManager.Token.getAccess()
                    );
                  console.log(newick);
                  setActiveNwkOnTree(newick);
                  saveTreeNewick(newick);
                } else {
                  // eslint-disable-next-line no-console
                  console.error("Missing data!");
                }
              }}
            >
              Gerar árvore
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

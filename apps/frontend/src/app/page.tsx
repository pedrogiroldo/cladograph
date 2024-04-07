"use client";
/* eslint-disable react/jsx-no-bind */
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, TextField } from "@mui/material";
import Tree from "../components/Tree/Tree";
import { TraitObjectsArray } from "../models/traitsTypes";
import { getTraits } from "../scripts/cacheManager/traitsCRUD";
import defaultNewick from "./defaultTree";
import generateNewick from "../scripts/phylogeneticTreesScripts/generateNewick";
import { ExternalGroup } from "../models/externalGroupTypes";
import { getExternalGroup } from "../scripts/cacheManager/externalGroupCRUD";
import { DescendantObjectsArray } from "../models/descendantsTypes";
import { getDescendants } from "../scripts/cacheManager/descendantsCRUD";
import {
  getTreeNewick,
  saveTreeNewick,
} from "../scripts/cacheManager/treeNewickCRUD";
import styles from "./page.module.css";

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
            id="apiButton"
            size="large"
            onClick={() => router.replace("/templates")}
          >
            Templates
          </Button>
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
              onClick={() => {
                if (
                  cachedTraits !== undefined &&
                  cachedExternalGroup !== undefined &&
                  cachedDescendants !== undefined
                ) {
                  const newick = generateNewick({
                    traits: cachedTraits,
                    externalGroup: cachedExternalGroup,
                    descendants: cachedDescendants,
                  });
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
          {/* <Grid container>
            <Grid item xs={6}>
              <div className="comparasionInfoButtons">
                <Button
                  variant="contained"
                  size="medium"
                  fullWidth
                  id="comparasionInfoButtonId"
                >
                  Visualizar carac.
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  fullWidth
                  id="comparasionInfoButtonId"
                >
                  Visualizar grupo ext.
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  fullWidth
                  id="comparasionInfoButtonId"
                >
                  Visualizar descendentes
                </Button>
              </div>
            </Grid> */}
          {/* <Grid item xs={6}>
              <div className="comparasionInfoContainer">
                <Grid container>
                  <Grid item xs={6}>
                    <div>Descendentes:</div>
                  </Grid>
                  <Grid item xs={6}>
                    <div>5</div>
                  </Grid>
                  <Grid item xs={6}>
                    <div>Características:</div>
                  </Grid>
                  <Grid item xs={6}>
                    <div>5</div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid> */}
        </div>
      </div>
    </div>
  );
}

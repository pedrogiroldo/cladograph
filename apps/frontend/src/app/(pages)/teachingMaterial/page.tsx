"use client";
import Tree from "@/components/Tree/Tree";
import styles from "./styles.module.css";
import { TraitObjectsArray } from "@/models/traitsTypes";
import { ExternalGroup } from "@/models/externalGroupTypes";
import { DescendantObjectsArray } from "@/models/descendantsTypes";
import { useEffect, useState } from "react";
import { getTreeNewick } from "@/scripts/cacheManager/treeNewickCRUD";
import { getDescendants } from "@/scripts/cacheManager/descendantsCRUD";
import { getExternalGroup } from "@/scripts/cacheManager/externalGroupCRUD";
import { getTraits } from "@/scripts/cacheManager/traitsCRUD";
import { useRouter } from "next/navigation";
import StorageManager from "@/utils/storageManager/storageManager.util";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function TeachingMaterial() {
  const router = useRouter();

  const [activeNwkOnTree, setActiveNwkOnTree] = useState("");

  const [cachedTraits, setCachedTraits] = useState<
    TraitObjectsArray | undefined
  >(undefined);
  const [cachedExternalGroup, setCachedExternalGroup] = useState<
    ExternalGroup | undefined
  >(undefined);
  const [cachedDescendants, setCachedDescendants] = useState<
    DescendantObjectsArray | undefined
  >(undefined);

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
    }
  }, []);

  return (
    <>
      {console.log(cachedDescendants)}
      <div className={styles.main}>
        <div>
          <div className={styles.treeArea}>
            <Tree newick={activeNwkOnTree} />
          </div>
          <TableContainer component={Paper} style={{ marginTop: "10vh" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Descendentes</TableCell>
                  <TableCell align="right">Sinapomorfias</TableCell>
                  <TableCell align="right">Plesiomorifias</TableCell>
                  <TableCell align="right">Apomorfias</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cachedDescendants
                  ? cachedDescendants.map((descendant) => (
                      <TableRow
                        key={descendant.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {descendant.descendantName}
                        </TableCell>
                        <TableCell align="right">
                          {descendant.synapomorphies}
                        </TableCell>
                        <TableCell align="right">
                          {descendant.plesiomorphies}
                        </TableCell>
                        <TableCell align="right">
                          {descendant.apomorphies}
                        </TableCell>
                      </TableRow>
                    ))
                  : void 0}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

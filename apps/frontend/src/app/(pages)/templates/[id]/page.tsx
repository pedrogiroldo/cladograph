"use client";

import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import image from "./imageExample.jpg";
import ItemAndValue from "../../../../components/ItemAndValue/ItemAndValue";
import { loremIpsum } from "../../../../components/TemplateItem/loremIpsum";
import { Avatar, Rating } from "@mui/material";
import Tree from "../../../../components/Tree/Tree";
import Image from "next/image";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  return (
    <div className={styles.main}>
      <nav className={styles.nav}>
        <div className={styles.arrowLeft}>
          <FaArrowLeft
            onClick={() => router.replace("/templates")}
            size="2em"
            color="#1976D2"
          />
        </div>
      </nav>
      <div className={styles.infoArea}>
        <div className={styles.header}>
          <div className={styles.coverFrame}>
            <Image src={image} alt="bat" className={styles.coverImage} />
          </div>
          <div className={styles.leftSide}>
            <ItemAndValue item="Nome" value="Morcego" />
            {/* <ItemAndValue
              item="Descrição"
              value={(() => {
                const maxLength = 80;
                let trimmedText = loremIpsum.substring(0, maxLength);
                if (loremIpsum.length > maxLength) {
                  trimmedText += '...';
                }
                return trimmedText;
              })()}
            /> */}
            <ItemAndValue
              item="Autor"
              value={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ width: 30, height: 30 }} />{" "}
                  <div style={{ marginLeft: "0.5vw" }}>Pedro Giroldo</div>
                </div>
              }
            />
            <Rating size="large" defaultValue={2.5} precision={0.5} />
          </div>
        </div>
        <div className={styles.description}>
          <h2>Descrição:</h2>
          <div>{loremIpsum}</div>
        </div>
        <div className={styles.tree}>
          <h2>Árvore filogenética:</h2>
          <Tree
            newick={
              "(((Desmodus rotundus, Glossophaga soricina), Artibeus jamaicensis), (Pteropus vampyrus, Myotis lucifugus));"
            }
          />
        </div>
        <div className={styles.traitsTable}></div>
      </div>
    </div>
  );
}

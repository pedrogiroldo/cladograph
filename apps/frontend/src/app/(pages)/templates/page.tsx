"use client";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Navbar from "../../../components/Navbar/Navbar";
import TemplateItem from "../../../components/TemplateItem/TemplateItem";
import styles from "./styles.module.css";

export default function Page() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <div className={styles.main}>
        <h1 className={styles.title}>Templates</h1>
        <div className={styles.gridArea}>
          <Grid container spacing={4}>
            <Grid xs={4}>
              <TemplateItem />
            </Grid>
            <Grid xs={4}>
              <TemplateItem />
            </Grid>
            <Grid xs={4}>
              <TemplateItem />
            </Grid>
            <Grid xs={4}>
              <TemplateItem />
            </Grid>
            <Grid xs={4}>
              <TemplateItem />
            </Grid>
            <Grid xs={4}>
              <TemplateItem />
            </Grid>
            <Grid xs={4}>
              <TemplateItem />
            </Grid>
            <Grid xs={4}>
              <TemplateItem />
            </Grid>
            <Grid xs={4}>
              <TemplateItem />
            </Grid>
            <Grid xs={4}>
              <TemplateItem />
            </Grid>
            <Grid xs={4}>
              <TemplateItem />
            </Grid>
            <Grid xs={4}>
              <TemplateItem />
            </Grid>
            <Grid xs={4}>
              <TemplateItem />
            </Grid>
            <Grid xs={4}>
              <TemplateItem />
            </Grid>
            <Grid xs={4}>
              <TemplateItem />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

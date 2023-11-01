/**
 * @todo Trocar nomenclatura ancestral
 */

/* eslint-disable react/jsx-no-bind */
import { useState } from 'react';
import { Button, ButtonGroup, Grid, TextField } from '@mui/material';
import Tree from '../../components/Tree/Tree';
import './style.css';

const defaultNewick =
  '(((EELA:0.150276,CONGERA:0.213019):0.230956,(EELB:0.263487,CONGERB:0.202633):0.246917):0.094785,((CAVEFISH:0.451027,(GOLDFISH:0.340495,ZEBRAFISH:0.390163):0.220565):0.067778,((((((NSAM:0.008113,NARG:0.014065):0.052991,SPUN:0.061003,(SMIC:0.027806,SDIA:0.015298,SXAN:0.046873):0.046977):0.009822,(NAUR:0.081298,(SSPI:0.023876,STIE:0.013652):0.058179):0.091775):0.073346,(MVIO:0.012271,MBER:0.039798):0.178835):0.147992,((BFNKILLIFISH:0.317455,(ONIL:0.029217,XCAU:0.084388):0.201166):0.055908,THORNYHEAD:0.252481):0.061905):0.157214,LAMPFISH:0.717196,((SCABBARDA:0.189684,SCABBARDB:0.362015):0.282263,((VIPERFISH:0.318217,BLACKDRAGON:0.109912):0.123642,LOOSEJAW:0.3971):0.287152):0.140663):0.206729):0.222485,(COELACANTH:0.558103,((CLAWEDFROG:0.441842,SALAMANDER:0.299607):0.135307,((CHAMELEON:0.771665,((PIGEON:0.150909,CHICKEN:0.172733):0.082163,ZEBRAFINCH:0.099172):0.272338):0.014055,((BOVINE:0.167569,DOLPHIN:0.15745):0.104783,ELEPHANT:0.166557):0.367205):0.050892):0.114731):0.295021):0;';

export default function Home() {
  const [nwkInputValue, setNwkInputValue] = useState('');

  const setNwkInputValueFunc = (e: any) => {
    setNwkInputValue(e.target.value);
  };

  const [activeNwkOnTree, setActiveNwkOnTree] = useState(defaultNewick);

  function updateTree() {
    setActiveNwkOnTree(nwkInputValue);
  }

  return (
    <div className="Home">
      <div className="treeArea">
        <Tree newick={activeNwkOnTree} />
      </div>
      <div className="optionsArea">
        <div className="topArea">
          <div className="nwkInputAndButton">
            <TextField
              variant="standard"
              className="nwkInput"
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
          <Button id="apiButton" size="large">
            Templates
          </Button>
        </div>
        <div className="comparatorArea">
          <h1 id="comparatorTitle">Comparador</h1>
          <ButtonGroup variant="outlined" size="medium">
            <Button>Adicionar características</Button>
            <Button>Adicionar grupo ext.</Button>
            <Button>Adicionar descendente</Button>
            <Button>Gerar árvore</Button>
          </ButtonGroup>
          <Grid container>
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
            </Grid>
            <Grid item xs={6}>
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
          </Grid>
        </div>
      </div>
    </div>
  );
}

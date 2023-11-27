/* eslint-disable react/jsx-no-bind */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup, TextField } from '@mui/material';
import Tree from '../../components/Tree/Tree';
import './style.css';
import { TraitsObject } from '../../../models/traitsTypes';
import { getTraits } from '../../../scripts/cacheManager/traitsCRUD';
import defaultNewick from './defaultTree';

export default function Home() {
  const [alreadyAddedTraits, setAlreadyAddedTraits] = useState(false);

  useEffect(() => {
    const cachedTraits: TraitsObject | undefined = getTraits();
    if (cachedTraits === undefined) {
      setAlreadyAddedTraits(false);
    } else if (!cachedTraits[0]) {
      setAlreadyAddedTraits(false);
    } else if (cachedTraits[0]) {
      setAlreadyAddedTraits(true);
    }
  }, [alreadyAddedTraits]);

  const navigate = useNavigate();

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
          <ButtonGroup variant="outlined" size="large" orientation="vertical">
            {alreadyAddedTraits === true ? (
              <Button onClick={() => navigate('/addTraits')}>
                Editar características
              </Button>
            ) : (
              <Button onClick={() => navigate('/addTraits')}>
                Adicionar características
              </Button>
            )}
            <Button onClick={() => navigate('/addExternalGroup')}>
              Adicionar grupo ext.
            </Button>
            <Button>Adicionar descendente</Button>
            <Button>Gerar árvore</Button>
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

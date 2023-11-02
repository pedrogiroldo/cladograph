import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import TraitsListItem from '../../components/TraitsListItem/TraitsListItem';
import {
  addTraitButton,
  addTraitsActionArea,
  inputs,
  main,
  saveButton,
} from './styles';
import { Traits } from '../../../models/traitsTypes';
import {
  getTraits,
  saveTraits,
} from '../../../scripts/cacheManager/traitsCRUD';
import Navbar from '../../components/Navbar/Navbar';

export default function AddTraitsPage() {
  const [traits, setTraits] = useState<Traits>([]); // Use state to manage traits

  useEffect(() => {
    const cachedTraits: Traits | undefined = getTraits();
    if (cachedTraits === undefined) return;
    setTraits(cachedTraits);
  }, []);

  const [inputValue, setInputValue] = useState('');
  const setInputValueFunc = (e: any) => {
    setInputValue(e.target.value);
  };

  const addInputValueToTraitsArray = () => {
    if (inputValue.trim() !== '') {
      // Check for non-empty input
      setTraits([inputValue, ...traits]); // Update traits using setTraits
      setInputValue(''); // Reset inputValue
    }
  };

  const deleteTraitFromArray = (trait: string) => {
    const updatedTraits = traits.filter((item) => item !== trait);
    setTraits(updatedTraits);
  };

  const editTraitFromArray = (oldTrait: string, newTrait: string) => {
    const updatedTraits = traits.map((item) =>
      item === oldTrait ? newTrait : item,
    );
    setTraits(updatedTraits);
  };

  const [isSaved, setIsSaved] = useState(false);

  const saveTraitsInSessionStorage = () => {
    setIsSaved(true);
    saveTraits(traits);
  };

  return (
    <div style={main}>
      <Navbar />
      <div style={addTraitsActionArea}>
        <div style={inputs}>
          <TextField
            label="Insira uma característica"
            variant="filled"
            size="small"
            onChange={setInputValueFunc}
            value={inputValue}
          />
          <Button
            variant="contained"
            style={addTraitButton}
            onClick={addInputValueToTraitsArray}
          >
            Adicionar
          </Button>
        </div>
        <div>
          {traits.map((trait) => {
            return (
              <div key={trait}>
                <TraitsListItem
                  value={trait}
                  trashFunc={() => deleteTraitFromArray(trait)}
                  pencilFunc={editTraitFromArray}
                />
              </div>
            );
          })}
        </div>
        {isSaved ? (
          <Button
            variant="contained"
            color="success"
            onClick={() => saveTraitsInSessionStorage()}
            style={saveButton}
          >
            Salvar
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={() => saveTraitsInSessionStorage()}
            style={saveButton}
          >
            Salvar
          </Button>
        )}
      </div>
      {/* <Button onClick={() => console.log(traits)}>log</Button> */}
    </div>
  );
}

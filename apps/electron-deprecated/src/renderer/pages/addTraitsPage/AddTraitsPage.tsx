/**
 * @todo revisar código depois de escrever
 */

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
import {
  getTraits,
  saveTraits,
} from '../../../scripts/cacheManager/traitsCRUD';
import Navbar from '../../components/Navbar/Navbar';
import { Trait, TraitsObject } from '../../../models/traitsTypes';

export default function AddTraitsPage() {
  const [traits, setTraits] = useState<TraitsObject>([]); // Use state to manage traits

  useEffect(() => {
    const cachedTraits: TraitsObject | undefined = getTraits();
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

      const newTrait: Trait = {
        // adcionar verificação de id
        id: 1,
        traitName: inputValue,
        lastTraitName: undefined,
        active: true,
      };

      setTraits([newTrait, ...traits]); // Update traits using setTraits
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
              <div key={trait.id}>
                <TraitsListItem
                  value={trait.traitName}
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
      {/* testing button */}
      {/* <Button onClick={() => console.log(traits)}>log</Button> */}
    </div>
  );
}

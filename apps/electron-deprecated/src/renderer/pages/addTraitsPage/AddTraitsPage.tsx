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

      // pick the last trait to use its id
      const lastTraitAdded = traits[0];

      const lastTraitAddedId = lastTraitAdded ? lastTraitAdded.id + 1 : 1; // autoincrement id system

      const newTrait: Trait = {
        // adcionar verificação de id
        id: lastTraitAddedId,
        traitName: inputValue,
        lastTraitName: undefined,
        active: true,
      };

      setTraits([newTrait, ...traits]); // Update traits using setTraits
      setInputValue(''); // Reset inputValue
    }
  };

  const deleteTraitFromArray = (traitId: number) => {
    const newTraits = traits.map((trait) => {
      if (trait.id === traitId) {
        return { ...trait, active: false };
      }
      return trait;
    });

    setTraits(newTraits);
  };

  const editTraitFromArray = (traitId: number, newTraitName: string) => {
    const updatedTraits = traits.map((trait) => {
      if (trait.id === traitId) {
        return {
          ...trait,
          traitName: newTraitName,
          lastTraitName: trait.traitName,
        };
      }
      return trait;
    });
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
            if (trait.active === true) {
              return (
                <div key={trait.id}>
                  <TraitsListItem
                    id={trait.id}
                    value={trait.traitName}
                    trashFunc={() => deleteTraitFromArray(trait.id)}
                    pencilFunc={editTraitFromArray}
                  />
                </div>
              );
            }
            return undefined;
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

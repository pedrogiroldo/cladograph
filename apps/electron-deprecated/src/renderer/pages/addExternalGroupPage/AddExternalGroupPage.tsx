import { useEffect, useState } from 'react';
import { Button, FormControlLabel, FormGroup, TextField } from '@mui/material';
import BpCheckbox from '../../components/BpCheckbox/BpCheckbox';
import Navbar from '../../components/Navbar/Navbar';
import {
  actionArea,
  addTraitButton,
  checkButton,
  externalGroupTraits,
  inputs,
  main,
  saveButton,
} from './styles';
import { TraitsObject } from '../../../models/traitsTypes';
import {
  getTraits,
  saveTraits,
} from '../../../scripts/cacheManager/traitsCRUD';
import { ExternalGroup } from '../../../models/externalGroupTypes';
import {
  getExternalGroup,
  saveExternalGroup,
} from '../../../scripts/cacheManager/externalGroupCRUD';

export default function AddExternalGroupPage() {
  const [traits, setTraits] = useState<TraitsObject>([]);
  const [externalGroup, setExternalGroup] = useState<ExternalGroup>({});
  const [
    traitsExternalGroupRelationsArray,
    setTraitsExternalGroupRelationsArray,
  ] = useState<string[][] | undefined>(undefined);

  useEffect(() => {
    const cachedTraits: TraitsObject | undefined = getTraits();
    if (cachedTraits === undefined) return;

    const initialExternalGroup: ExternalGroup = {};
    cachedTraits.forEach((trait) => {
      initialExternalGroup[trait] = false; // Initialize all traits with false value
    });

    setTraits(cachedTraits);
    setExternalGroup(initialExternalGroup);

    const cachedExternalGroup = getExternalGroup();
    if (cachedExternalGroup !== undefined) {
      setExternalGroup(cachedExternalGroup);
    }
  }, []);

  const handleTraitChange = (traitId: number) => {
    // setExternalGroup((prevState) => ({
    //   ...prevState,
    //   [trait]: !prevState[trait], // Toggles the trait value
    // }));
    const newTraitsExternalGroupRelationsArray = traitsExternalGroupRelationsArray.
  };

  const [inputValue, setInputValue] = useState('');
  const setInputValueFunc = (e: any) => {
    setInputValue(e.target.value);
  };

  const addInputValueToTraitsArray = () => {
    if (inputValue.trim() !== '') {
      // Check for non-empty input
      const newTraits = [inputValue, ...traits];
      setTraits(newTraits);

      // Atualizando externalGroup com a nova característica
      setExternalGroup((prevState) => {
        return { [inputValue]: false, ...prevState };
      });
      setInputValue(''); // Reset inputValue
    }
  };

  const [isSaved, setIsSaved] = useState(false);

  const saveTraitsAndExternalGroupInSessionStorage = () => {
    setIsSaved(true);
    saveTraits(traits);
    saveExternalGroup(externalGroup);
  };

  return (
    <div style={main}>
      <Navbar />
      <div style={actionArea}>
        <h1 style={externalGroupTraits}>Características do Grupo Externo:</h1>
        <div style={inputs}>
          <TextField
            label="Adicionar características:"
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
        <FormGroup>
          {traits.map((trait) => (
            <FormControlLabel
              key={trait}
              control={
                <BpCheckbox
                  checked={!!externalGroup[trait]} // Checking if the trait exists in externalGroup
                  onChange={() => handleTraitChange(trait)}
                  style={checkButton}
                />
              }
              label={trait}
            />
          ))}
        </FormGroup>
      </div>
      {isSaved ? (
        <Button
          variant="contained"
          color="success"
          onClick={() => saveTraitsAndExternalGroupInSessionStorage()}
          style={saveButton}
        >
          Salvar
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={() => saveTraitsAndExternalGroupInSessionStorage()}
          style={saveButton}
        >
          Salvar
        </Button>
      )}
      {/* <Button onClick={() => console.log(externalGroup)}>ver</Button> */}
    </div>
  );
}

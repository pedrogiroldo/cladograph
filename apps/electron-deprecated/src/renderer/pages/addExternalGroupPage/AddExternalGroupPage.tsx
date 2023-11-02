import { useEffect, useState } from 'react';
import { Button, FormControlLabel, FormGroup, TextField } from '@mui/material';
import BpCheckbox from '../../components/BpCheckbox/BpCheckbox';
import Navbar from '../../components/Navbar/Navbar';
import {
  actionArea,
  addTraitButton,
  externalGroupTraits,
  inputs,
  main,
  saveButton,
} from './styles';
import { Traits } from '../../../models/traitsTypes';
import {
  getTraits,
  saveTraits,
} from '../../../scripts/cacheManager/traitsCRUD';
import { ExternalGroup } from '../../../models/externalGroupTypes';

export default function AddExternalGroupPage() {
  const [traits, setTraits] = useState<Traits>([]);
  const [selectedTraits, setSelectedTraits] = useState<ExternalGroup>({});

  useEffect(() => {
    const cachedTraits: Traits | undefined = getTraits();
    if (cachedTraits === undefined) return;
    const initialExternalGroup: ExternalGroup = {};
    cachedTraits.forEach((trait) => {
      initialExternalGroup[trait] = false; // Initialize all traits with false value
    });
    setTraits(cachedTraits);
    setSelectedTraits(initialExternalGroup);
  }, []);

  const handleTraitChange = (trait: string) => {
    setSelectedTraits((prevState) => ({
      ...prevState,
      [trait]: !prevState[trait], // Toggles the trait value
    }));
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

      // Atualizando selectedTraits com a nova característica
      setSelectedTraits((prevState) => {
        return { [inputValue]: false, ...prevState };
      });
      setInputValue(''); // Reset inputValue
    }
  };

  const [isSaved, setIsSaved] = useState(false);

  const saveTraitsInSessionStorage = () => {
    setIsSaved(true);
    saveTraits(traits);
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
                  checked={!!selectedTraits[trait]} // Checking if the trait exists in selectedTraits
                  onChange={() => handleTraitChange(trait)}
                />
              }
              label={trait}
            />
          ))}
        </FormGroup>
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
        <Button onClick={() => console.log(selectedTraits)}>ver</Button>
      </div>
    </div>
  );
}

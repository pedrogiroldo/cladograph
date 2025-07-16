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
import { TraitObjectsArray } from '../../../models/traitsTypes';
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
  const [traits, setTraits] = useState<TraitObjectsArray>([]);
  const [externalGroup, setExternalGroup] = useState<ExternalGroup>({});

  useEffect(() => {
    const cachedTraits: TraitObjectsArray | undefined = getTraits();
    if (cachedTraits !== undefined) {
      setTraits(cachedTraits);
    }

    const cachedExternalGroup = getExternalGroup();
    if (cachedExternalGroup !== undefined) {
      setExternalGroup(cachedExternalGroup);
    }
  }, []);

  /**
   *
   * @param traitId - id of the trait to be changed
   * @param remove - this boolean says if the trait is to be added or removed
   */
  const handleTraitChange = (traitId: number, remove: boolean | undefined) => {
    if (!remove) {
      let alreadyAddedTraitsInExternalGroup = externalGroup.traitsIds;
      if (!alreadyAddedTraitsInExternalGroup) {
        alreadyAddedTraitsInExternalGroup = [];
      }
      if (externalGroup && alreadyAddedTraitsInExternalGroup) {
        const newExternalGroup: ExternalGroup = {
          traitsIds: [...alreadyAddedTraitsInExternalGroup, traitId],
        };
        setExternalGroup(newExternalGroup);
      }
    } else if (remove === true) {
      const alreadyAddedTraitsInExternalGroup = externalGroup.traitsIds;
      const indexOfTraitToBeDeleted =
        alreadyAddedTraitsInExternalGroup?.indexOf(traitId);
      if (
        externalGroup &&
        alreadyAddedTraitsInExternalGroup &&
        (indexOfTraitToBeDeleted || indexOfTraitToBeDeleted === 0)
      ) {
        alreadyAddedTraitsInExternalGroup.splice(indexOfTraitToBeDeleted, 1);
        setExternalGroup({ traitsIds: alreadyAddedTraitsInExternalGroup });
      }
    }
  };

  const [inputValue, setInputValue] = useState('');
  const setInputValueFunc = (e: any) => {
    setInputValue(e.target.value);
  };

  const addInputValueToTraitsArray = () => {
    // Check for non-empty input
    if (inputValue.trim() !== '') {
      const lastTraitAdded = traits[0];
      const lastTraitAddedId = lastTraitAdded ? lastTraitAdded.id + 1 : 1; // autoincrement id system

      const newTraitObjectsArray: TraitObjectsArray = [
        {
          id: lastTraitAddedId, // autoincrement system for those ids
          traitName: inputValue,
          lastTraitName: undefined,
          active: true,
        },
        ...traits,
      ];
      setTraits(newTraitObjectsArray);

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
          {traits.map((trait) => {
            if (trait.active === true) {
              return (
                <FormControlLabel
                  key={trait.id}
                  control={
                    <BpCheckbox
                      checked={externalGroup.traitsIds?.includes(trait.id)} // Checking if the trait exists in externalGroup traits array
                      onChange={() =>
                        handleTraitChange(
                          trait.id,
                          externalGroup.traitsIds?.includes(trait.id),
                        )
                      }
                      style={checkButton}
                    />
                  }
                  label={trait.traitName}
                />
              );
            }
            return null;
          })}
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

import { useEffect, useState } from 'react';
import { Button, FormControlLabel, TextField } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import styles from './styles.module.css';
import {
  Descendant,
  DescendantObjectsArray,
} from '../../../models/descendantsTypes';
import {
  getDescendants,
  saveDescendants,
} from '../../../scripts/cacheManager/descendantsCRUD';
import { TraitObjectsArray } from '../../../models/traitsTypes';
import {
  getTraits,
  saveTraits,
} from '../../../scripts/cacheManager/traitsCRUD';
import BpCheckbox from '../../components/BpCheckbox/BpCheckbox';
import DescendantListItem from '../../components/DescendantListItem/DescendantListItem';

export default function AddDescendantsPage() {
  // constants:

  const [inputValue, setInputValue] = useState('');
  const setInputValueFunc = (e: any) => {
    setInputValue(e.target.value);
  };

  const [newTraitInputValue, setNewTraitInputValue] = useState<string>('');
  const setNewTraitInputValueFunc = (e: any) => {
    setNewTraitInputValue(e.target.value);
  };
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [descendantObjectsArray, setDescendantObjectsArray] =
    useState<DescendantObjectsArray>([]);
  const [traitObjectsArray, setTraitObjectsArray] = useState<TraitObjectsArray>(
    [],
  );

  useEffect(() => {
    // get the cached descendants object array
    const cachedDescendantObjectsArray: DescendantObjectsArray | undefined =
      getDescendants();
    if (cachedDescendantObjectsArray) {
      setDescendantObjectsArray(cachedDescendantObjectsArray);
    }

    // get the cached traits object array
    const cachedTraitsObject: TraitObjectsArray | undefined = getTraits();
    if (cachedTraitsObject) {
      setTraitObjectsArray(cachedTraitsObject);
    }
  }, []);

  function createDescendant(descendantName: string) {
    if (inputValue.trim() !== '') {
      const lastDescendantAdded = descendantObjectsArray[0];
      const lastDescendantAddedId = lastDescendantAdded
        ? lastDescendantAdded.id + 1
        : 1; // autoincrement id system

      const newDescendant: Descendant = {
        id: lastDescendantAddedId,
        descendantName,
        traitsIds: [],
        active: true,
      };

      // save new descendant in the array
      setDescendantObjectsArray([newDescendant, ...descendantObjectsArray]);
      setInputValue(''); // Reset inputValue
    }
  }

  // const handleTraitChange = (traitId: number, descendantId: number) => {
  //   const descendantThatWillBeChanged = descendantObjectsArray.find(
  //     (descendant) => descendant.id === descendantId,
  //   );
  //   if (descendantThatWillBeChanged) {
  //     const alreadyAddedTraitsInDescendant =
  //       descendantThatWillBeChanged.traitsIds;
  //     const newDescendant: Descendant = {
  //       id: descendantThatWillBeChanged.id,
  //       descendantName: descendantThatWillBeChanged.descendantName,
  //       traitsIds: [...alreadyAddedTraitsInDescendant, traitId],
  //       active: descendantThatWillBeChanged.active,
  //     };

  //     const descendantIndex = descendantObjectsArray.findIndex(
  //       (descendant) => descendant === descendantThatWillBeChanged,
  //     );

  //     const newDescendantObjectsArray = descendantObjectsArray;
  //     newDescendantObjectsArray[descendantIndex] = newDescendant;

  //     setDescendantObjectsArray(newDescendantObjectsArray);
  //   }
  // };

  /**
   * Handles the change of traits for a descendant.
   * @param traitId - Id of the trait
   * @param descendantId - Id of the descendant to be changed
   * @param remove - Boolean indicating whether the trait is to be added or removed
   */
  const handleTraitChange = (
    traitId: number,
    descendantId: number,
    remove: boolean | undefined,
  ) => {
    const descendantToChange = descendantObjectsArray.find(
      (descendant) => descendant.id === descendantId,
    );

    if (descendantToChange) {
      const { traitsIds } = descendantToChange;

      if (!remove) {
        const newTraitsIds = traitsIds ? [...traitsIds, traitId] : [traitId];
        const newDescendant = {
          ...descendantToChange,
          traitsIds: newTraitsIds,
        };
        const descendantIndex = descendantObjectsArray.findIndex(
          (descendant) => descendant.id === descendantToChange.id,
        );
        const newDescendantObjectsArray = [...descendantObjectsArray];
        newDescendantObjectsArray[descendantIndex] = newDescendant;
        setDescendantObjectsArray(newDescendantObjectsArray);
      } else if (remove === true) {
        if (traitsIds) {
          const indexOfTraitToBeDeleted = traitsIds.indexOf(traitId);

          if (indexOfTraitToBeDeleted !== -1) {
            const newTraitsIds = [...traitsIds];
            newTraitsIds.splice(indexOfTraitToBeDeleted, 1);

            const newDescendant = {
              ...descendantToChange,
              traitsIds: newTraitsIds,
            };
            const descendantIndex = descendantObjectsArray.findIndex(
              (descendant) => descendant.id === descendantToChange.id,
            );

            const newDescendantObjectsArray = [...descendantObjectsArray];
            newDescendantObjectsArray[descendantIndex] = newDescendant;

            setDescendantObjectsArray(newDescendantObjectsArray);
          }
        }
      }
    }
  };

  const saveTraitsAndDescendantsInSessionStorage = () => {
    setIsSaved(true);
    saveTraits(traitObjectsArray);
    saveDescendants(descendantObjectsArray);
  };

  const addInputValueToTraitsArray = () => {
    // Check for non-empty input
    if (newTraitInputValue.trim() !== '') {
      const lastTraitAdded = traitObjectsArray[0];
      const lastTraitAddedId = lastTraitAdded ? lastTraitAdded.id + 1 : 1; // autoincrement id system

      const newTraitObjectsArray: TraitObjectsArray = [
        {
          id: lastTraitAddedId, // autoincrement system for those ids
          traitName: newTraitInputValue,
          lastTraitName: undefined,
          active: true,
        },
        ...traitObjectsArray,
      ];
      setTraitObjectsArray(newTraitObjectsArray);

      setNewTraitInputValue(''); // Reset inputValue
    }
  };

  const deleteDescendantFromArray = (descendantId: number) => {
    const newDescendants = descendantObjectsArray.map((descendant) => {
      if (descendant.id === descendantId) {
        return { ...descendant, active: false };
      }
      return descendant;
    });

    setDescendantObjectsArray(newDescendants);
  };

  const editDescendantFromArray = (
    descendantId: number,
    newDescendantName: string,
  ) => {
    const updatedDescendants = descendantObjectsArray.map(
      (descendant: Descendant) => {
        if (descendant.id === descendantId) {
          return {
            ...descendant,
            descendantName: newDescendantName,
          };
        }
        return descendant;
      },
    );
    setDescendantObjectsArray(updatedDescendants);
  };

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.inputs}>
          <div className={styles.newDescendantInput}>
            <TextField
              label="Nome do descendente:"
              variant="standard"
              size="small"
              onChange={setInputValueFunc}
              value={inputValue}
            />
            <div className={styles.addDescendantButton}>
              <Button
                onClick={() => createDescendant(inputValue)}
                variant="contained"
                style={{ height: '100%' }}
              >
                Adicionar
              </Button>
            </div>
          </div>
          <div className={styles.newTraitInput}>
            <TextField
              label="Adicionar características:"
              variant="standard"
              size="small"
              onChange={setNewTraitInputValueFunc}
              value={newTraitInputValue}
            />
            <div>
              <Button
                variant="contained"
                style={{ marginLeft: '2vw', height: '100%' }}
                onClick={addInputValueToTraitsArray}
              >
                Adicionar
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.descendantsContainer}>
          <h1 className={styles.title}>Descendentes:</h1>
          <div className={styles.descendantsContainerActionArea}>
            <div className={styles.descendantsArea}>
              {descendantObjectsArray.map((descendant: Descendant) => {
                if (descendant.active === true) {
                  return (
                    <div className={styles.descendantsItems}>
                      <DescendantListItem
                        id={descendant.id}
                        value={descendant.descendantName}
                        trashFunc={() =>
                          deleteDescendantFromArray(descendant.id)
                        }
                        pencilFunc={editDescendantFromArray}
                      />
                      {traitObjectsArray.map((trait) => {
                        if (trait.active === true) {
                          return (
                            <FormControlLabel
                              key={descendant.id + trait.id}
                              control={
                                <BpCheckbox
                                  checked={descendant.traitsIds?.includes(
                                    trait.id,
                                  )} // Checking if the trait exists in externalGroup traits array
                                  onChange={() =>
                                    handleTraitChange(
                                      trait.id,
                                      descendant.id,
                                      descendant.traitsIds?.includes(trait.id),
                                    )
                                  }
                                />
                              }
                              label={trait.traitName}
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                  );
                }
                return null;
              })}
            </div>
            {isSaved ? (
              <Button
                variant="contained"
                color="success"
                onClick={() => saveTraitsAndDescendantsInSessionStorage()}
                style={{ marginTop: '2vh' }}
              >
                Salvar
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => saveTraitsAndDescendantsInSessionStorage()}
                style={{ marginTop: '2vh' }}
              >
                Salvar
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* <Button onClick={() => console.log(descendantObjectsArray)}>ver</Button> */}
    </>
  );
}

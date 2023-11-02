import { useEffect, useState } from 'react';
import { FormControlLabel, FormGroup } from '@mui/material';
import BpCheckbox from '../../components/BpCheckbox/BpCheckbox';
import Navbar from '../../components/Navbar/Navbar';
import { actionArea, externalGroupTraits, main } from './styles';
import { Traits } from '../../../models/traitsTypes';
import { getTraits } from '../../../scripts/cacheManager/traitsCRUD';
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

  return (
    <div style={main}>
      <Navbar />
      <div style={actionArea}>
        <h1 style={externalGroupTraits}>Características do Grupo Externo:</h1>
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
        {/* <Button onClick={() => console.log(selectedTraits)}>ver</Button> */}
      </div>
    </div>
  );
}

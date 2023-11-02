import { useEffect, useState } from 'react';
import { FormControlLabel, FormGroup } from '@mui/material';
import BpCheckbox from '../../components/BpCheckbox/BpCheckbox';
import Navbar from '../../components/Navbar/Navbar';
import { main } from './styles';
import { Traits } from '../../../models/traitsTypes';
import { getTraits } from '../../../scripts/cacheManager/traitsCRUD';

export default function AddExternalGroupPage() {
  const [traits, setTraits] = useState<Traits>([]);

  useEffect(() => {
    const cachedTraits: Traits | undefined = getTraits();
    if (cachedTraits === undefined) return;
    setTraits(cachedTraits);
  }, []);

  return (
    <div style={main}>
      <Navbar />
      <FormGroup>
        {traits.map((trait) => (
          <FormControlLabel control={<BpCheckbox />} label={trait} />
        ))}
      </FormGroup>
    </div>
  );
}

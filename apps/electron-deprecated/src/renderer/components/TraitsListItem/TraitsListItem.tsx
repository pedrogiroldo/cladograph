import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import { FaPencilAlt, FaTrashAlt, FaCheck } from 'react-icons/fa';
import {
  main,
  pencilButton,
  traitTextField,
  trashButton,
  saveButton,
} from './styles';

interface Props {
  value: string;
  trashFunc: any;
  pencilFunc: any;
}

export default function TraitsListItem(props: Props) {
  const { value, trashFunc, pencilFunc } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    pencilFunc(value, editedValue); // Aqui você pode executar a função para salvar o valor editado
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(event.target.value);
  };

  return (
    <div style={main}>
      {isEditing ? (
        <>
          <TextField
            value={editedValue}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            style={traitTextField}
          />
          <IconButton onClick={handleSaveClick} style={saveButton}>
            <FaCheck color="green" />
          </IconButton>
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            value={value}
            variant="outlined"
            size="small"
            style={traitTextField}
            InputProps={{
              readOnly: true,
            }}
          />
          <IconButton onClick={handleEditClick} style={pencilButton}>
            <FaPencilAlt color="#1976D2" />
          </IconButton>
        </div>
      )}
      <IconButton onClick={trashFunc} style={trashButton}>
        <FaTrashAlt color="#1976D2" />
      </IconButton>
    </div>
  );
}

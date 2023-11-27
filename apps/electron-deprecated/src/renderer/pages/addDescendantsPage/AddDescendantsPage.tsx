import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import styles from './styles.module.css';

export default function AddDescendantsPage() {
  const [inputValue, setInputValue] = useState('');
  const setInputValueFunc = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.descendantsContainer}>
          <h1 className={styles.title}>Descendentes:</h1>
          <div className={styles.descendantsContainerActionArea}>
            <div className={styles.input}>
              <TextField
                label="Nome do descendente:"
                variant="filled"
                size="small"
                onChange={setInputValueFunc}
                value={inputValue}
              />
              <div className={styles.addDescendantButton}>
                <Button variant="contained" style={{ height: '100%' }}>
                  Adicionar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

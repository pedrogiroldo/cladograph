import CSS from 'csstype';

export const main: CSS.Properties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
};

export const navbar: CSS.Properties = {
  display: 'flex',
  width: '100%',
  height: '10%',
  flexDirection: 'row',
};

export const homeButton: CSS.Properties = {
  marginRight: '4vw',
  marginLeft: 'auto',
  marginTop: '2vh',
  cursor: 'pointer',
};

export const addTraitsActionArea: CSS.Properties = {
  width: '100%',
  height: '90vh',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

export const inputs: CSS.Properties = {
  display: 'flex',
  marginBottom: '2vh',
};

export const addTraitButton: CSS.Properties = {
  marginLeft: '2vw',
};

export const saveButton: CSS.Properties = {
  marginTop: '2vh',
};

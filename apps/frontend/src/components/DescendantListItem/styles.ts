import CSS from 'csstype';

export const main: CSS.Properties = {
  marginTop: '2vh',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
};

export const traitTextField: CSS.Properties = {};

export const pencilButton: CSS.Properties = {
  marginLeft: '2vw',
  marginRight: '2vw',
  cursor: 'pointer',
};

export const trashButton: CSS.Properties = {
  cursor: 'pointer',
};
export const saveButton: CSS.Properties = pencilButton;

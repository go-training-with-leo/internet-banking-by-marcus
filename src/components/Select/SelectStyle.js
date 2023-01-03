const colourStyles = {
  singleValue: (base) => ({
    ...base,
    color: '#fff',
  }),
  option: () => ({
    color: '#fff',
    background: '#111111',
  }),
  control: (base, state) => ({
    ...base,
    background: '#111111',
    boxShadow: state.isFocused ? null : null,
    borderColor: '#111111',
    '&:hover': {
      borderColor: 'none',
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: 'white',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 0,
    marginTop: 0,
    boxShadow: '0 8px 8px -4px red',
    width: 'max-content',
    minWidth: '100%',
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
};

export default colourStyles;

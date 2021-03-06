import chroma from 'chroma-js';

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

export const dotStyles = {
  control: (styles, {isFocused, isSelected, isActive, isHover}) => ({ ...styles,
    backgroundColor: 'white',
    ':hover': {
      borderColor: 'lightblue'
    }
  }),
  option: (styles, { data, value, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
      fontWeight: 700,
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),

      },
    };
  },
  input: styles => ({ ...styles}),
  placeholder: styles => ({ ...styles }),
  singleValue: (styles, { data, value }) => ({ ...styles, ...dot(data.color), fontWeight: 700, height: 18}),

};


export const normalStyles={
  option: (styles)=>{
    return {...styles, fontWeight: 700}
  },
  singleValue: (styles) => ({ ...styles, fontWeight: 700, height: 18 }),
}

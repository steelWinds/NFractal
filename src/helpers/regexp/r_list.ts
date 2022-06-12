const re = {
  LSystemExp: new RegExp(/([A-Z](\((\b\d[\d,.\s]*\b)?\))?|\[|\]|\+|\-)/, 'gm'),
  LSystemCharCmd: new RegExp(/([A-Z])/, 'gm'),
  Numbers: new RegExp(/(\d+(?:\.\d+)?)/, 'gmi'),
};

export default re;

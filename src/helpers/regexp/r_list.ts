const re = {
  LSystemExp: new RegExp(/((.)(\((\b\d[\d,.\s]*\b)?\))?|\[|\]|\+|\-)/, 'gm'),
  LSystemCharCmd: new RegExp(/(.)/, 'gm'),
  Numbers: new RegExp(/(\d+(?:\.\d+)?)/, 'gmi'),
};

export default re;

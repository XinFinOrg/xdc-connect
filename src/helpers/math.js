export const MinOf = (x, y) => {
  return parseFloat(x) < parseFloat(y) ? parseFloat(x) : parseFloat(y);
};

export const MaxOf = (x, y) => {
  return parseFloat(x) < parseFloat(y) ? parseFloat(y) : parseFloat(x);
};

export const Random = (min, max) => {
  return min + Math.random() * (max - min);
};

export const RandomInt = (min, max) => {
  return Math.round(min + Math.random() * (max - min));
};

export const ToDoubleDigit = (x) => {
  x = `${x}`;
  if (x.length === 1) return `0${x}`;
  return x;
};

export const AddMultiplier = (amount) => {
  const multiplier = Math.pow(10, 18);

  return RemoveExpo(parseFloat(amount) * multiplier);
};

export const RemoveMultiplier = (amount) => {
  const multiplier = Math.pow(10, 18);

  return parseFloat(amount) / multiplier;
};

export const IsHex = (n) => {
  const re = /[0-9A-Fa-f]{6}/g;

  if (re.test(n)) {
    return true;
  } else {
    return false;
  }
};

/* eslint-disable no-useless-escape */

export const RemoveExpo = (x) => {
  var data = String(x).split(/[eE]/);
  if (data.length === 1) return data[0];

  var z = "",
    sign = x < 0 ? "-" : "",
    str = data[0].replace(".", ""),
    mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + "0.";
    while (mag++) z += "0";
    return z + str.replace(/^\-/, "");
  }
  mag -= str.length;
  while (mag--) z += "0";
  return str + z;
};

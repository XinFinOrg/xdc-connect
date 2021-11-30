export const ObjToArr = (obj) => Object.keys(obj).map((key) => obj[key]);

export const FilterStructResp = (obj) =>
  Object.keys(obj)
    .filter((e, i) => {
      if (i < Object.keys(obj).length / 2) return false;
      return true;
    })
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});

export const IsJson = (abi) => {
  try {
    JSON.parse(abi);
  } catch (e) {
    return false;
  }
  return true;
};

export const WithTimeout = (cb, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    let int = setTimeout(() => {
      reject("timeout");
    }, timeout);

    cb()
      .then((resp) => {
        clearTimeout(int);
        resolve(resp);
      })
      .catch(reject);
  });
};

Object.defineProperty(Object.prototype, "partialMatch", {
  value: function (fields) {
    for (let key of Object.keys(fields)) {
      if (Object.keys(this).includes(key)) {
        if (this[key] === fields[key]) continue;
        return false;
      } else {
        return false;
      }
    }
    return true;
  },
});

Object.defineProperty(Array.prototype, "includesPartial", {
  value: function (fields) {
    for (let i = 0; i < this.length; i++) {
      const obj = this[i];
      console.log("objobj", obj);
      if (obj.partialMatch(fields)) {
        return i;
      }
    }
    return null;
  },
});

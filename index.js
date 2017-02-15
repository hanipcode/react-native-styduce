// const styles = {
//   container: {
//     backgroundColor: 'White',
//   },
//   header: {
//     __heading: {
//       __span: {

//       }
//     },
//     __logo: {

//     },
//     $$active: {

//     },
//     backgroundColor: {

//     },
//   },
// };

// // semisal
// a = {
//   prop1: item,
//   __block: {
//     prop2: item,
//   }
// }
// //menjadi
// style = {
//   a: {
//     prop1: item
//   },
//   a__block: {
//     prop2: item
//   }
// }
function hasUnderscore(Obj) {
  for (keys in Obj) {
    if (keys.slice(0,2) === '__') {
      return true;
    }
  }
  return false;
}

function hasDobleDollar(Obj) {
  for (keys in Obj) {
    if (keys.slice(0,2) === '$$') {
      return true;
    }
  }
  return false;
}

function getStyleProperty(Obj) {
  const result = {}
  for (keys in Obj) {
    if(keys.slice(0,2) !== '__' && keys.slice(0,2) !== '$$') {
      result[keys] = Obj[keys];
    }
  }
  return result;
}

function combineWithInheritedStyle(parent, current) {
  console.log(current);
  return Object.assign(current, getStyleProperty(parent));
}

function processChild(childStyleObj, objName) { 
  const objKeys = Object.keys(childStyleObj);
  //this is for the non child or the style we need
  // example backgroundColor, marginTop etc
  const mainObj = {};
  // Let's check and test if there are child style
  const result = objKeys.reduce((initial, keyName, index) => {
    const addedClass = {};
    if (!(childStyleObj[keyName] instanceof Object)) {
      mainObj[objName] = {[keyName] : childStyleObj[keyName]};
      return initial;
    } else if ((childStyleObj[keyName] instanceof Object) && keyName.slice(0,2) === "__") {
      addedClass[objName+keyName] = childStyleObj[keyName];
      if (hasUnderscore(childStyleObj[keyName])) {
        return processChild(childStyleObj[keyName], objName+keyName);
      }
      if (hasDobleDollar(childStyleObj[keyName])) {
        return processChild(childStyleObj[keyName], objName+keyName);
      }
      return Object.assign(initial, addedClass);
    } else if ((childStyleObj[keyName] instanceof Object) && keyName.slice(0,2) === "$$") {
      addedClass[objName+keyName] = combineWithInheritedStyle(childStyleObj, childStyleObj[keyName]);
      if (hasDobleDollar(childStyleObj[keyName])) {
        return processChild(childStyleObj[keyName], objName+keyName);
      }
      return Object.assign(initial, addedClass);
    }
  },{});
  return Object.assign({}, mainObj, result);
}

function createStyleObject(styleObj) {
  const keys = Object.keys(styleObj);
  const resultStyle = {}
  const result = keys.forEach((value) => {
    Object.assign(resultStyle, processChild(styleObj[value], value));
  });
  return resultStyle;
}

module.exports = {
  createStyle: (styleObj) => createStyleObject(styleObj),
};

// const example = {
//   container: {
//     backgroundColor: "blue",
//     __heading: {
//       backgroundColor: "dark",
//       __yuhu: {
//         backgroundColor: "green",
//         __4thlevel: {
//           backgroundColor: "Weeee",
//         }
//       }
//     },
//     __content: {
//       backgroundColor: "NaN",
//     },
//   },
//   header: {
//     backgroundColor: 'light',
//     __logo: {
//       backgroundColor: 'yellow',
//       $$active: {
//         width: 100,
//       },
//     },
//     $$active: {
//       height: 70,
//     },
//   },
// };

// console.log(createStyleObject(example));
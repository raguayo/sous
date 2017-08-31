// const unitRegex = new RegExp("^(" + unitArr.join("|") + ")(s?)$");

// function convertQuantityToNumber(quantity) {
//   if (typeof quantity === 'string') {
//     const index = quantity.indexOf('/');
//     if (index === 1) {
//       quantity = +quantity[index - 1] / +quantity[index + 1];
//     } else if (index === -1) {
//       quantity = Number.parseFloat(quantity);
//     } else {
//       quantity = Number.parseFloat(quantity) + (+quantity[index - 1] / +quantity[index + 1]);
//     }
//   }
//   return quantity;
// }

// function convertToOz(unit, quantity, ingName) {
//   if (unit === 'OZ') return [unit, quantity];
//   if (unit === 'CT') {
//     // convert 'CT' to 'OZ' depending on ing
//     quantity *= conversionTableBtwnCountOz[ingName][unit];
//   } else if (unit === 'BUNCH') {
//     // convert 'BUNCH' to 'OZ' depending on ing
//     quantity *= conversionTableBtwnBunchOz[ingName][unit];
//   } else if (unit === 'DOZ') {
//     // convert 'DOZ' to 'OZ' depending on ing
//     quantity *= conversionTableBtwnDozOz[ingName][unit];
//   } else {
//     // will this even need to happen?
//     console.log('Last if: ', unit, quantity, ingName);
//     return [unit, quantity];
//   }
//   return ['OZ', quantity];
// }

// function convertOzToDBUnit(unit, quantity, dbUnit, ingName) {
//   if (dbUnit === 'OZ') return [unit, quantity];
//   if (dbUnit === 'CT') {
//     quantity /= conversionTableBtwnCountOz[ingName][dbUnit];
//   } else if (dbUnit === 'BUNCH') {
//     quantity /= conversionTableBtwnBunchOz[ingName][dbUnit];
//   } else if (dbUnit === 'DOZ') {
//     quantity /= conversionTableBtwnDozOz[ingName][dbUnit];
//   } else {
//     quantity /= conversionTableBtwnOzDBUnits[dbUnit];
//   }
//   return [dbUnit, quantity];
// }

// function mapUnitToDB(recipeUnit, recipeQuantity, dbObj) {
//   const recipeToDBObj = hashRecipeUnitToDBUnit[recipeUnit];
//   if (!recipeToDBObj) {
//     console.log('Error: Unit not found in DB ' + recipeUnit);
//     return [null, null]; // hanlde this error better
//   }
//   let newUnit = recipeToDBObj.dbUnit;
//   let newQuantity = recipeQuantity * recipeToDBObj.conversion;
//   // console.log('Butter?: ', dbObj.name, newQuantity, dbObj.unitMeasure)
//   console.log(recipeToDBObj)
//   // handle if the newUnit and peapod unit don't match
//   if (newUnit !== dbObj.unitMeasure) {
//     // convert to oz
//     [newUnit, newQuantity] = convertToOz(newUnit, newQuantity, dbObj.name);
//     // convert to db units
//     [newUnit, newQuantity] = convertOzToDBUnit(newUnit, newQuantity, dbObj.unitMeasure, dbObj.name);
//   }
//   return [newUnit, newQuantity];
// }

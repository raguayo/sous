// make unit regex
const unitArr = ['tablespoon', 'teaspoon', 'cup', 'clove', 'package', 'can', 'pound', 'cube', 'bottle', 'pinch', 'square'];

const unitRegex = new RegExp("^(" + unitArr.join("|") + ")(s?)$");

function parseIngredientElements(ingElementArr) {
  const ingSentenceArr = [...ingElementArr].map((ingNode) => {
    const ingText = ingNode.textContent;
    if (ingText && ingText !== 'Add all ingredients to list') return ingText;
    return null;
  }).filter(text => !!text);

  const ingObjArr = ingSentenceArr.map((sentence) => {
    const wordArr = sentence.split(' ');
    const quantityArr = [wordArr.shift()];
    const splitIdx = wordArr.findIndex(word => word.search(unitRegex) !== -1) + 1;
    const ingObj = {
      quantity: quantityArr.concat(wordArr.slice(0, splitIdx)).join(' '),
      name: wordArr.slice(splitIdx).join(' '),
    }
    return ingObj;
  })

  return ingObjArr;
  // ingredients.forEach((ingSentence) => {
  //   const ingQuantity = [];
  //   const ingName = [];
  //   const ingWordArr = ingSentence.split(' ');

  //   // find the unit word
  //   // before that is quantity
  //   // after that is name



  //   ingQuantity.push(ingWordArr[0]);

  //   const shouldBeInQuantity = true;
  //   let index = 1;

  //   while (shouldBeInQuantity) {
  //     const currentWord = ingWordArr[index];
  //     if (/^\(.+\)$/i.search(currentWord) !== -1) {
  //       ingQuantity.push(ingWordArr[index]);
  //       index += 1;
  //     } else if (!isNaN(currentWord) || /^\d+\/\d+$/.search(currentWord) !== -1) {
  //       ingQuantity.push(ingWordArr[index]);
  //       index += 1;
  //     } else if () {

  //     } else {
  //       shouldBeInQuantity = false;
  //       ingName = ingWordArr.slice(index);
  //     }
  //   }
  // })

  // interate through text
  // split into words
  // take first word and put into quantity array
  // check second word
    // if it has ( ) around it, put into quantity array
      // check next index for quantity
    // if it's a number or a fraction put into quantity arry
      // check next index for quantity
    // if it matches a unit put it into quantity array
  // put the rest into the ingredient arr
}

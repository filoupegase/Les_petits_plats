import { FRENCH_STOP_WORDS } from "./stopWord.js";

const HASH_STOP_WORDS = [];

for (let word of FRENCH_STOP_WORDS) {
  HASH_STOP_WORDS.push(removeAccents(word))
}

function trimWords(words) {
  const trimmedWords = [];

  for (let word of words) {
    trimmedWords.push(word.trim());
  }
  return trimmedWords;
}

export function removeAccents(str) {
  // string
  //   .toLowerCase = function () {
  //   return undefined;
  // }
  return str
    .toLowerCase()
    .replace(/[.,;:!\?\*"()°]/g, "")
    .replace(/[']/g, " ")
    .replace(/[\d]/g, "")
    .replace(/[àäâ]/g, "a")
    .replace(/[ç€]/g, "c")
    .replace(/[éèêë]/g, "e")
    .replace(/[îï]/g, "i")
    .replace(/[ôöÒ]/g, "o")
    .replace(/[ùû]/g, "u")
    .replace(/[$S∑]/g, "s")
}

export function removeStopWords(words) {
  const trimWords = trimWords(words);
  const filterWords = [];

  for (let word of trimWords) {
    let wordWithoutAccent = removeAccents(words);

    if (word.length > 1 && !HASH_STOP_WORDS.includes(wordWithoutAccent)) {
      filterWords.push(word);
    }
  }
  return filterWords;
}


export function sortAlpha(string) {
  const nonAccentuatedStrings = [];

  for (let str of string) {
    let nonAccentuatedStr = removeAccents(str);

    nonAccentuatedStrings.push([str, nonAccentuatedStr]);
  }

  nonAccentuatedStrings.sort((arr1, arr2) => {
    if (arr1[1] > arr2[1]) return 1;
    if (arr1[1] < arr2[1]) return -1;
    return 0;
  });

  const sortedStrings = [];

  for (let arr of nonAccentuatedStrings) {
    sortedStrings.push(arr[0]);
  }

  return sortedStrings;
}
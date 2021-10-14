import { FRENCH_STOP_WORDS } from "./stopWords.js";

const STOP_WORDS = [];

for (let word of FRENCH_STOP_WORDS) {
  STOP_WORDS.push(keepOnlyLettersAndRemoveAccents(word));
}

function trimWords(words) {
  const trimmedWords = [];

  for (let word of words) {
    trimmedWords.push(word.trim());
  }

  return trimmedWords;
}

export function capitalizeFirstChar(str) {
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * @param {string} string
 * @returns {string}
 */
export function keepOnlyLettersAndRemoveAccents(string) {
  return string
    .toLowerCase()
    .replace(/[.,;:!?*+"=/()°]/g, "")
    .replace(/[']/g, " ")
    .replace(/[\d]/g, "")
    .replace(/[àäâ]/g, "a")
    .replace(/[ç€]/g, "c")
    .replace(/[éèêë]/g, "e")
    .replace(/[îï]/g, "i")
    .replace(/[ôöÒ]/g, "o")
    .replace(/[ùû]/g, "u")
    .replace(/[$S∑]/g, "s");
}


export function removeStopWords(words) {
  const trimmedWords = trimWords(words);
  const filteredWords = [];

  for (let word of trimmedWords) {
    let wordWithoutAccent = keepOnlyLettersAndRemoveAccents(word);

    if (word.length > 1 && !STOP_WORDS.includes(wordWithoutAccent)) {
      filteredWords.push(word);
    }
  }

  return filteredWords;
}


export function sortAlphabetically(strings) {
  const nonAccentuatedStrings = [];

  for (let str of strings) {
    let nonAccentuatedStr = keepOnlyLettersAndRemoveAccents(str);

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

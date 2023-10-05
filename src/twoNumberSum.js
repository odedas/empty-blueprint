/** two-number-sum
 name: two number sum
 category: array
 difficulty: easy
 sample input:
  array: [3, 5, -4, 8, 11, 1, -1, 6],
  targetSum: 10
 correct answer:  
*/

const twoNumberSumV1 = ({ array, targetSum }) => {
  let keepSearch = true;
  const answer = [];
  for (let i = 0; i <= array.length - 1 && keepSearch; i++) {
    for (let j = i + 1; j <= array.length - 1 && keepSearch; j++) {
      if (array[i] + array[j] === targetSum) {
        answer.push(array[i]);
        answer.push(array[j]);
        keepSearch = false;
      }
    }
  }
  return answer;
};

const twoNumberSumV2 = ({ array, targetSum }) => {
  let answer = [];
  let l = 0;
  let r = array.length - 1;
  array.sort((a, b) => a - b);
  while (l < r) {
    if (array[l] + array[r] === targetSum) {
      answer = [array[l], array[r]];
      l = r;
    }
    if (array[l] + array[r] > targetSum) {
      r -= 1;
    } else {
      l += 1;
    }
  }
  return answer;
};

const twoNumberSumV3 = ({ array, targetSum }) => {
  const hash = new Set();
  let answer = [];
  for (let index = 0; index <= array.length - 1; index++) {
    const element = targetSum - array[index];
    if (!hash.has(element)) {
      hash.add(array[index]);
    } else {
      answer = [array[index], element];
    }
  }
  return answer;
};

/*
const input = {
  array: [3, 5, -4, 8, 11, 1, -1, 6],
  targetSum: 10
};

const test = twoNumberSumV2; // twoNumberSumV3; // twoNumberSumV1;

const answer = test(input);
if (answer.length === 2 && answer[0] + answer[1] === input.targetSum) {
  console.log('good');
} else {
  console.log('error', answer);
}
*/

module.exports = {
  twoNumberSumV1,
  twoNumberSumV2,
  twoNumberSumV3
};

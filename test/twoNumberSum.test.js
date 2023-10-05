const { twoNumberSumV1, twoNumberSumV2, twoNumberSumV3 } = require('../src/twoNumberSum'); // Replace with the correct path to your functions file

describe('twoNumberSum Functions', () => {
  const testCases = [
    {
      name: 'twoNumberSumV1',
      function: twoNumberSumV1
    },
    {
      name: 'twoNumberSumV2',
      function: twoNumberSumV2
    },
    {
      name: 'twoNumberSumV3',
      function: twoNumberSumV3
    }
  ];

  const testInputs = [
    {
      array: [3, 5, -4, 8, 11, 1, -1, 6],
      targetSum: 10
    },
    {
      array: [4, 6],
      targetSum: 10
    },
    {
      array: [4, 6, 1],
      targetSum: 5
    }
    // Add more test cases as needed
  ];

  testCases.forEach(({ name, function: twoNumberSum }) => {
    describe(name, () => {
      testInputs.forEach((input, index) => {
        it(`should find two numbers from input case ${index + 1} that sum to the target`, () => {
          const result = twoNumberSum(input);
          expect(input.array.includes(result[0])).toBe(true);
          expect(input.array.includes(result[1])).toBe(true);
          expect(result[0] + result[1]).toBe(input.targetSum);
        });
      });

      it('should return an empty array when no two numbers from the array sum to the target', () => {
        const input = {
          array: [1, 2, 3, 4, 5],
          targetSum: 20
        };
        const result = twoNumberSum(input);
        expect(result).toEqual([]);
      });

      it('should return an empty array when the input array is empty', () => {
        const input = {
          array: [],
          targetSum: 10
        };
        const result = twoNumberSum(input);
        expect(result).toEqual([]);
      });

      it('should return an empty array when the input array has only one element', () => {
        const input = {
          array: [5],
          targetSum: 5
        };
        const result = twoNumberSum(input);
        expect(result).toEqual([]);
      });

      it('should return an empty array when no two numbers from the array sum to the target with negative numbers', () => {
        const input = {
          array: [-1, -2, -3, -4, -5],
          targetSum: 10
        };
        const result = twoNumberSum(input);
        expect(result).toEqual([]);
      });

      /*
      it('should handle input with large numbers', () => {
        const input = {
          array: [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER - 1],
          targetSum: Number.MAX_SAFE_INTEGER * 2 - 1
        };
        const result = twoNumberSum(input);
        expect(result).toEqual([Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER - 1]);
      });
      */
    });
  });
});

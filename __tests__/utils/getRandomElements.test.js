import { getRandomElements } from "../../utils/getRandomElements";

describe("getRandomElements", () => {
  test("should return an array, not any other data type", () => {
    const result = getRandomElements([1, 2, 3], 1);
    expect(Array.isArray(result)).toBe(true);
  });

  test("should return unique elements", () => {
    const result = getRandomElements([1, 2, 3, 4, 5], 5);
    expect(result.length).toBe(5);
  });

  test("should return one element when the numberOfElementsToPick is not provided", () => {
    const result = getRandomElements([1, 2]);
    expect(result.length).toBe(1);
  });

  test("should return an empty array when the first argument is an empty array", () => {
    const result = getRandomElements([], 3);
    expect(result.length).toBe(0);
  });

  test("should throw an error when the first argument is not an array.", () => {
    expect(() => getRandomElements(1, 1)).toThrow(TypeError);
    expect(() => getRandomElements({ test: 1 }, 1)).toThrow(TypeError);
  });

  test("should throw an error when the second argument is invalid.", () => {
    expect(() => getRandomElements([1, 2], "abc")).toThrow(TypeError);
    expect(() => getRandomElements([1, 2], 1.1)).toThrow(TypeError);
    expect(() => getRandomElements([1, 2], -1)).toThrow(RangeError);
  });
});

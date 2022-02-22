const ex = require("../exercise1");

describe("fizzBuzz", () => {
  it("show throw an error if not a number", () => {
    const args = ["hi", null, [0, 1], undefined, false, {}];
    args.forEach((arg) => {
      expect(() => {
        ex.fizzBuzz(arg);
      }).toThrow();
    });
  });

  it("should return FizzBuzz if the input is a multiple of three AND five", () => {
    let res = ex.fizzBuzz(15);
    expect(res).toBe("FizzBuzz");
  });

  it("should return Fizz if the input is only a multiple of three", () => {
    let res = ex.fizzBuzz(3);
    expect(res).toBe("Fizz");
  });

  it("should return Buzz if the input is only a multiple of five", () => {
    let res = ex.fizzBuzz(5);
    expect(res).toBe("Buzz");
  });

  it("should return the input if it's not a multiple of three or five, but is a number", () => {
    let res = ex.fizzBuzz(7);
    expect(res).toBe(7);
  });
});

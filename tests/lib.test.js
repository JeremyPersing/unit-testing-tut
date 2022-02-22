const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

//num
describe("absolute", () => {
  it("should return a postive number on positive input", () => {
    const res = lib.absolute(1);
    expect(res).toBe(1);
  });

  it("should return a postive number on negative input", () => {
    const res = lib.absolute(-1);
    expect(res).toBe(1);
  });

  it("should return 0 on 0", () => {
    const res = lib.absolute(0);
    expect(res).toBe(0);
  });
});

//str
describe("greet", () => {
  it("should return greeting message", () => {
    const res = lib.greet("Mosh");
    expect(res).toContain("Mosh");
  });
});

//arr
describe("getCurrencies", () => {
  it("shoulde return supported currencies", () => {
    const res = lib.getCurrencies();

    expect(res).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});

// obj
describe("getProduct", () => {
  let res = lib.getProduct(1);
  // toEqual =  must match schema
  expect(res).toEqual({ id: 1, price: 10 });

  // toMatchObject = just needs fields id & price
  expect(res).toMatchObject({ id: 1, price: 10 });

  expect(res).toHaveProperty("id", 1);
});

// execeptions
describe("registerUser", () => {
  it("should throw if username if falsy", () => {
    const args = [null, undefined, "", 0, NaN, false];
    args.forEach((arg) => {
      expect(() => {
        lib.registerUser(arg);
      }).toThrow();
    });
  });

  it("should return a user object if valid username is passed", () => {
    let res = lib.registerUser("mosh");

    expect(res).toMatchObject({ username: "mosh" });
    expect(res.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("should apply 10% discount if customer has more than 10 points", () => {
    db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer");
      return { id: customerId, points: 20 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    // const mockFunction = jest.fn();
    // mockFunction.mockReturnValue(1);
    // mockFunction.mockResolveValue(1);
    // mockFunction.mockRejectedValue(new Error('...'))
    // const result = await mockFunction();

    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe("a");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});

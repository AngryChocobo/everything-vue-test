test("should throw a error", () => {
  function throw1() {
    throw new Error("123");
  }
  expect(() => throw1()).toThrow();
  expect(() => throw1()).toThrow("123");
  expect(() => throw1()).toThrow(Error);
});

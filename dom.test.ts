describe("dom", () => {
  beforeEach(() => {
    document.body.innerHTML = `
  <button>Click me</button>
  <p id="demo"></p>
  `;
  });
  test("should trigger click event", () => {
    expect(document.querySelector("#demo")?.textContent).toBe("");
    const button = document.querySelector("button");
    button?.addEventListener("click", () => {
      const p = document.querySelector("#demo");
      if (p) {
        p.innerHTML = "Hello World";
      }
    });
    button?.click();
    expect(document.querySelector("#demo")?.textContent).toBe("Hello World");
  });
});

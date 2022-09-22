describe("promise & async", () => {
  function fetchData() {
    return new Promise((res) => {
      res("peanut butter");
    });
  }

  function fetchDataWithError() {
    return new Promise((res, rej) => {
      rej("123");
    });
  }
  test("the data is peanut butter", () => {
    return fetchData().then((data) => {
      expect(data).toBe("peanut butter");
    });
  });

  test("the data is peanut butter", async () => {
    const data = await fetchData();
    expect(data).toBe("peanut butter");
  });

  test("the fetch fails with an error", async () => {
    expect.assertions(1);
    try {
      await fetchDataWithError();
    } catch (e) {
      expect(e).toMatch("123");
    }
  });
});

describe("callback", () => {
  test("the data is peanut butter", (done) => {
    function fetchData(cb: any) {
      cb(null, "peanut butter");
    }
    function callback(error: any, data: any) {
      if (error) {
        done(error);
        return;
      }
      try {
        expect(data).toBe("peanut butter");
        done();
      } catch (error) {
        done(error);
      }
    }

    fetchData(callback);
  });
});

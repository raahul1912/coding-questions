const { countAges } = require('./age-counting');
const { describe, it, expect } = require('@jest/globals');


describe("Age Counting", () => {
  it("should count ages >= 50", async () => {
    const result = await countAges(50);
    expect(result >= 0);
  });
});

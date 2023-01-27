import { describe, expect, it } from "vitest";
import { stringBUSD } from "../src/utils/stringBUSD";

describe("stringBUSD", () => {
  const termination = "BUSD";
  const coin = "BTC";
  const coin2 = "BTCETHADA";
  it("if coin does NOT end with BUSD should return the same that it was given", () => {
    expect(stringBUSD(coin)).toBe(coin);
    expect(stringBUSD(coin2)).toBe(coin2);
  });
  it("if coin ends with BUSD should delete it", () => {
    expect(stringBUSD(`${coin}${termination}`)).toBe(coin);
    expect(stringBUSD(`${coin2}${termination}`)).toBe(coin2);
  });
});

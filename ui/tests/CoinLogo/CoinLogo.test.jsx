import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { CoinLogo } from "../../src/components/CoinLogo/CoinLogo";

describe("CoinLogo", () => {
  afterEach(cleanup);

  it("should render img with size sm", () => {
    render(<CoinLogo coin={"BTC"} size={"sm"} />);
    screen.findByAltText("BTC");
  });
  it("should render img with size md", () => {
    render(<CoinLogo coin={"BTC"} size={"md"} />);
    screen.findByAltText("BTC");
  });
  it("should render img with size lg", () => {
    render(<CoinLogo coin={"BTC"} size={"lg"} />);
    screen.findByAltText("BTC");
  });
  it("should render img with size xl", () => {
    render(<CoinLogo coin={"BTC"} size={"xl"} />);
    screen.findByAltText("BTC");
  });
});
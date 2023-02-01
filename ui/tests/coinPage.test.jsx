import { cleanup, render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { options, appName } from '../src/components/Navbar/Navbar'
import { CoinPage } from "../src/pages/CoinPage/CoinPage";


const coin = "BTC";

describe("MainPage", () => {
  afterEach(cleanup);

  it("should render", () => {
    render(<CoinPage />);
  });

  it("should render coin name", () => {
    render(<CoinPage name={coin} />);
    screen.getByText(coin);
  });

  it("should render coin price", () => {
    render(<CoinPage name={coin} />);
    screen.getByTestId(`${coin}Price`);
  });

  it("should render coin image", () => {
    render(<CoinPage name={coin} />);
    screen.getByAltText(coin);
  });

  it("should render navbar elements", () => {
    render(<CoinPage name={coin} />);
    options.forEach((option) => screen.getByText(option));
    screen.getByText(appName);
  });

  it("should render coin graph", () => {
    render(<CoinPage name={coin} />);
    screen.getByTestId(`${coin}Graph`);
  });
});

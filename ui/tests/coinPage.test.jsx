import { cleanup, render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { options, appName } from "../src/components/Navbar/Navbar";
import { CoinPage } from "../src/pages/CoinPage/CoinPage";

const coinName = "BTC";

describe("CoinPage", () => {
  vi.mock("react-router-dom", () => {
    const useParams = vi.fn();
    const coinName = "BTC";
    useParams.mockReturnValue({
      coin: coinName,
    });
    return {
      useParams,
    };
  });

  afterEach(cleanup);

  it("should render", () => {
    render(<CoinPage />);
  });

  it("should render coin name", () => {
    render(<CoinPage />);
    screen.getByText(coinName);
  });

  it("should render coin price", () => {
    render(<CoinPage />);
    screen.getByTestId(`${coinName}Price`);
  });

  it("should render coin image", () => {
    render(<CoinPage />);
    screen.getByAltText(coinName);
  });

  it("should render navbar elements", () => {
    render(<CoinPage />);
    options.forEach((option) => screen.getByText(option));
    screen.getByText(appName);
  });

  it("should render coin graph", () => {
    render(<CoinPage />);
    screen.getByTestId(`${coinName}Graph`);
  });
});

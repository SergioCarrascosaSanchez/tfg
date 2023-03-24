import { cleanup, render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { CoinPage } from "../../src/pages/CoinPage/CoinPage";
import { coinErrorMessage } from "../../src/pages/CoinPage/CoinPage"

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

  vi.mock("../../src/hooks/useGetPrice", () => {
    const useGetPrice = vi.fn();
    useGetPrice.mockReturnValueOnce({
      loading: false,
      error: true,
      statusCode: 400,
      data: [],
    });
    useGetPrice.mockReturnValueOnce({
      loading: false,
      error: true,
      statusCode: 500,
      data: [],
    });
    useGetPrice.mockReturnValue({
      loading: false,
      error: true,
      statusCode: 502,
      data: [],
    });
    return {
      useGetPrice,
    };
  });

  afterEach(cleanup);

  it("should render coin name, coin image and error when status code is 400", () => {
    render(<CoinPage />);
    screen.getByText(coinName);
    screen.getByAltText(coinName);
    screen.getByText(coinErrorMessage);
  });

  it("should render coin name, coin image and error when status code is 500", () => {
    render(<CoinPage />);
    screen.getByText(coinName);
    screen.getByAltText(coinName);
    screen.getByText(coinErrorMessage);
  });

  it("should render coin name, coin image and error when status code is 502", () => {
    render(<CoinPage />);
    screen.getByText(coinName);
    screen.getByAltText(coinName);
    screen.getByText(coinErrorMessage);
  });
});

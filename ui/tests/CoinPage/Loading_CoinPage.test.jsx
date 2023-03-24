import { cleanup, render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { CoinPage } from "../../src/pages/CoinPage/CoinPage";

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
    useGetPrice.mockReturnValue({
      loading: true,
      error: false,
      statusCode: null,
      data: [],
    });
    return {
      useGetPrice,
    };
  });

  afterEach(cleanup);

  it("should render coin name, coin image and spinner", () => {
    render(<CoinPage />);
    screen.getByText(coinName);
    screen.getByAltText(coinName);
    screen.getByRole("progressbar");
  });
});
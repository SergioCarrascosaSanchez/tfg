import { cleanup, render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { CoinChartCard } from "../../src/components/CoinChartCard/CoinChartCard";

const name = "BTCBUSD";

describe("CoinChartCard Loading", () => {
  vi.mock("../../src/hooks/useGetPrice", () => {
    const useGetPrice = vi.fn();
    useGetPrice.mockReturnValue({
      loading: true,
      error: false,
      statusCode: null,
      data: {},
    });
    return {
      useGetPrice,
    };
  });

  afterEach(cleanup);

  it("should render card and spinner", () => {
    render(<CoinChartCard name={name} time="30m" />);
    screen.getByRole("listitem");
    screen.getByRole("progressbar");
  });
});

import { cleanup, render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import {
  CoinChartCard,
  CoinChartCardErrorMessage,
} from "../../src/components/CoinChartCard/CoinChartCard";

const name = "BTCBUSD";

describe("CoinChartCard Error", () => {
  vi.mock("../../src/hooks/useGetPrice", () => {
    const useGetPrice = vi.fn();
    useGetPrice.mockReturnValue({
      loading: false,
      error: true,
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
    screen.getByText(`${CoinChartCardErrorMessage}${name}`);
    expect(() => screen.getByRole("progressbar")).toThrow(
      'Unable to find an accessible element with the role "progressbar"'
    );
  });
});

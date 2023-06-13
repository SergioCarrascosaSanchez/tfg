import { cleanup, render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { CoinChartCard } from "../../src/components/CoinChartCard/CoinChartCard";

const name = "BTCBUSD";

describe("CoinChartCard Loading", () => {
  vi.mock("../../src/hooks/useGetPrice", () => {
    const useGetPrice = vi.fn();
    useGetPrice.mockReturnValue({
      loading: false,
      error: false,
      statusCode: 200,
      data: [
        22802.9, 22811.49, 22814.62, 22821.45, 22818.67, 22817.43, 22819.52,
        22823.07, 22821.71, 22826.45, 22832.09, 22830.3, 22827.1, 22828.79,
        22831.16, 22832.04, 22827.97, 22828.28, 22821.34, 22825.13, 22828.02,
        22827.76, 22831.62, 22837.08, 22835.22, 22826.74, 22823.56, 22822.2,
        22825.87, 22827.64, 22828.32, 22836.73, 22832.9, 22838.93, 22837.37,
        22844.58, 22842.36, 22849.69, 22850.38, 22845.91, 22851.97, 22852.85,
        22844.98, 22851.59, 22851.59, 22847.88, 22853.3, 22853.4, 22849.49,
        22844.0,
      ],
    });
    return {
      useGetPrice,
    };
  });

  afterEach(cleanup);

  it("should render image, price and graph", () => {
    render(<CoinChartCard name={name} time="30m" />);
    screen.getByText(name);
    screen.getByRole("img", { name: `${name}` });
    screen.getByText("22844$");
    expect(screen.queryAllByText("Cantidad").length).toBe(0)
    screen.getByTestId(`${name}Graph`);
  });

  it("should render image, price, graph and quantity", () => {
    render(<CoinChartCard name={name} time="30m" quantity="1000" />);
    screen.getByText(name);
    screen.getByRole("img", { name: `${name}` });
    screen.getByText("22844$");
    screen.getByText("Cantidad: 1000");
    screen.getByTestId(`${name}Graph`);
  });
});

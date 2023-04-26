import { cleanup, render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { GroupOfCoinChartCard } from "../../src/components/GroupOfCoinChartCard/GroupOfCoinChartCard";

describe("CoinChartCard Loading", () => {

  vi.mock("react-router-dom", async () => {
    return {
      ...vi.importMock("react-router-dom"),
      Link: ({ children, to }) => <a href={to}>{children}</a>,
    };
  });

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

  it("should render image, price and graph for each coin with size sm", () => {
    const coins = [
      {
        coin: "BTC",
        quantity:10
      },
      {
        coin: "ADA",
        quantity:13
      },
      {
        coin: "ETH",
        quantity:0.2
      },
    ]
    render(<GroupOfCoinChartCard coins={coins} size={"sm"} quantity={false} />);
    screen.getByText("BTC");
    screen.getByRole("img", { name: `${"BTC"}` });
    expect(screen.queryAllByText("Cantidad: 10").length).toBe(0)
    screen.getByTestId(`${"BTC"}Graph`);

    screen.getByText("ETH");
    screen.getByRole("img", { name: `${"ETH"}` });
    expect(screen.queryAllByText("Cantidad: 13").length).toBe(0)
    screen.getByTestId(`${"ETH"}Graph`);

    screen.getByText("ADA");
    screen.getByRole("img", { name: `${"ADA"}` });
    expect(screen.queryAllByText("Cantidad: 0.2").length).toBe(0)
    screen.getByTestId(`${"ADA"}Graph`);

    expect(screen.queryAllByText("22844").length).toBe(3)
    
  });

  it("should render image, price and graph for each coin with size lg", () => {
    const coins = [
      {
        coin: "BTC",
        quantity:10
      },
      {
        coin: "ADA",
        quantity:13
      },
      {
        coin: "ETH",
        quantity:0.2
      },
    ]
    render(<GroupOfCoinChartCard coins={coins} size={"lg"} quantity={false} />);
    screen.getByText("BTC");
    screen.getByRole("img", { name: `${"BTC"}` });
    expect(screen.queryAllByText("Cantidad: 10").length).toBe(0)
    screen.getByTestId(`${"BTC"}Graph`);

    screen.getByText("ETH");
    screen.getByRole("img", { name: `${"ETH"}` });
    expect(screen.queryAllByText("Cantidad: 13").length).toBe(0)
    screen.getByTestId(`${"ETH"}Graph`);

    screen.getByText("ADA");
    screen.getByRole("img", { name: `${"ADA"}` });
    expect(screen.queryAllByText("Cantidad: 0.2").length).toBe(0)
    screen.getByTestId(`${"ADA"}Graph`);

    expect(screen.queryAllByText("22844").length).toBe(3)
    
  });

  it("should render image, price, graph and quantity for each coin with size sm", () => {
    const coins = [
      {
        coin: "BTC",
        quantity:10
      },
      {
        coin: "ADA",
        quantity:13
      },
      {
        coin: "ETH",
        quantity:0.2
      },
    ]
    render(<GroupOfCoinChartCard coins={coins} size={"sm"} quantity={true} />);
    screen.getByText("BTC");
    screen.getByRole("img", { name: `${"BTC"}` });
    screen.getByText("Cantidad: 10")
    screen.getByTestId(`${"BTC"}Graph`);

    screen.getByText("ETH");
    screen.getByRole("img", { name: `${"ETH"}` });
    screen.getByText("Cantidad: 13")
    screen.getByTestId(`${"ETH"}Graph`);

    screen.getByText("ADA");
    screen.getByRole("img", { name: `${"ADA"}` });
    screen.getByText("Cantidad: 0.2")
    screen.getByTestId(`${"ADA"}Graph`);

    expect(screen.queryAllByText("22844").length).toBe(3)
    
  });

  it("should render image, price, graph and quantity for each coin with size lg", () => {
    const coins = [
      {
        coin: "BTC",
        quantity:10
      },
      {
        coin: "ADA",
        quantity:13
      },
      {
        coin: "ETH",
        quantity:0.2
      },
    ]
    render(<GroupOfCoinChartCard coins={coins} size={"lg"} quantity={true} />);
    screen.getByText("BTC");
    screen.getByRole("img", { name: `${"BTC"}` });
    screen.getByText("Cantidad: 10")
    screen.getByTestId(`${"BTC"}Graph`);

    screen.getByText("ETH");
    screen.getByRole("img", { name: `${"ETH"}` });
    screen.getByText("Cantidad: 13")
    screen.getByTestId(`${"ETH"}Graph`);

    screen.getByText("ADA");
    screen.getByRole("img", { name: `${"ADA"}` });
    screen.getByText("Cantidad: 0.2")
    screen.getByTestId(`${"ADA"}Graph`);

    expect(screen.queryAllByText("22844").length).toBe(3)
    
  });
});

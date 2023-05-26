import { cleanup, render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { StudentTitles } from "../../../src/components/StudentDashboard/StudentDashboard";
import { UserPage } from "../../../src/pages/UserPage/UserPage";
import { chartError } from "../../../src/components/DoughnutChart/DoughnutChart";

const studentName = "Sergio";

describe("UserPage rendering StudentDashBoard", () => {
  vi.mock("react-router-dom", async () => {
    return {
      ...vi.importMock("react-router-dom"),
      useParams: vi.fn().mockReturnValue({ user: "Sergio" }),
      Link: ({ children, to }) => <a href={to}>{children}</a>,
    };
  });

  vi.mock("../../../src/hooks/useGetUserData", () => {
    const useGetUserData = vi.fn();
    useGetUserData.mockReturnValue({
      loading: false,
      error: false,
      statusCode: 200,
      data: {
        username: "Sergio",
        role: "STUDENT",
        balance: 1000.0,
        portfolio: [
          {
            coin: "BTC",
            quantity: 10,
          },
          {
            coin: "ETH",
            quantity: 2,
          },
        ],
        tradeHistory: []
      },
    });
    return {
      useGetUserData,
    };
  });

  vi.mock("../../../src/hooks/useGetListOfPrices", () => {
    const useGetListOfPrices = vi.fn();
    useGetListOfPrices.mockReturnValue({
      loading: false,
      error: true,
      statusCode: 400,
      data: {},
    });
    return {
      useGetListOfPrices,
    };
  });

  vi.mock("../../../src/hooks/useGetPrice", () => {
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

  it("should render student name and balance", () => {
    render(<UserPage />);
    screen.getByText(studentName);
    screen.getByText(`${StudentTitles.Balance}1000$`);
  });

  it("should render student investments", () => {
    render(<UserPage />);
    screen.getByText(StudentTitles.Investments);
    screen.getByText("BTC");
    screen.getByText("ETH");
    screen.getByTestId(`BTCGraph`);
    screen.getByTestId(`ETHGraph`);
    screen.getByText(StudentTitles.Portfolio);
    screen.getByText(chartError);
    screen.getAllByText(StudentTitles.History)
  });
});

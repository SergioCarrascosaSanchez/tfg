import { describe, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { TeacherPage } from "../../src/pages/TeacherPage/TeacherPage";
import { options, appName } from "../../src/components/Navbar/Navbar";

const teacherName = "Sergio";

describe("TeacherPage", () => {
  vi.mock("react-router-dom", () => {
    const useParams = vi.fn();
    const teacherName = "Sergio";
    useParams.mockReturnValue({
      teacher: teacherName,
    });
    return {
      useParams,
    };
  });

  vi.mock("../../src/hooks/useGetUserData", () => {
    const useGetUserData = vi.fn();
    useGetUserData.mockReturnValue({
      loading: false,
      error: false,
      statusCode: 200,
      data: [
        {
          username: "UserTest2",
          balance: 238.5,
          portfolio: [
            {
              coin: "BTC",
              quantity: 3.2,
            },
            {
              coin: "ADA",
              quantity: 129.7,
            },
          ],
          tradeHistory: [
            {
              type: "BUY",
              coin: "ADA",
              quantity: 129.7,
              price: 0.2,
              justification: "justification sample",
              chartData: [1.2, 1.9, 1.2, 1.9, 1.2, 1.9, 1.2, 1.9],
              date: "2023-03-17 08:14:38",
            },
            {
              type: "SELL",
              coin: "BTC",
              quantity: 1.0,
              price: 12.2,
              justification: "justification sample",
              chartData: [1.2, 1.9, 1.2, 1.9, 1.2, 1.9, 1.2, 1.9],
              date: "2023-03-17 08:14:13",
            },
            {
              type: "BUY",
              coin: "BTC",
              quantity: 4.2,
              price: 10.1,
              justification: "justification sample",
              chartData: [1.2, 1.9, 1.2, 1.9, 1.2, 1.9, 1.2, 1.9],
              date: "2023-03-17 08:14:13",
            },
          ],
        },
        {
          username: "UserTest3",
          balance: 20337.5,
          portfolio: [
            {
              coin: "BTC",
              quantity: 1.2,
            },
            {
              coin: "ADA",
              quantity: 2.3,
            },
          ],
          tradeHistory: [
            {
              type: "BUY",
              coin: "ADA",
              quantity: 2.3,
              price: 0.2,
              justification: "justification sample",
              chartData: [1.2, 1.9, 1.2, 1.9, 1.2, 1.9, 1.2, 1.9],
              date: "2023-03-17 08:14:38",
            },
            {
              type: "BUY",
              coin: "BTC",
              quantity: 1.2,
              price: 10.2,
              justification: "justification sample",
              chartData: [1.2, 1.9, 1.2, 1.9, 1.2, 1.9, 1.2, 1.9],
              date: "2023-03-17 08:14:13",
            },
          ],
        },
      ],
    });
    return {
      useGetUserData,
    };
  });

  afterEach(cleanup);

  it("should render navbar", () => {
    render(<TeacherPage />);
    options.forEach((option) => screen.getByText(option));
    screen.getByText(appName);
  });

  it("should render ...", () => {
  });
});

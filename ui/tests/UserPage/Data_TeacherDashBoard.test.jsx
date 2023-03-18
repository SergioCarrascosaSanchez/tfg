import { cleanup, render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { options, appName } from "../../src/components/Navbar/Navbar";
import {
  UserPage,
} from "../../src/pages/UserPage/UserPage";

const teacherName = "Sergio";

describe("UserPage rendering TeacherDashBoard", () => {
  vi.mock('react-router-dom', async () => {
    return {
      ...vi.importMock('react-router-dom'),
      useParams: vi.fn().mockReturnValue({user: "Sergio"}),
      Link: ({ children, to }) =>
        <a href={to}>{children}</a>,
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

  it("should render teacher name", () => {
    render(<UserPage />);
    screen.getByText(teacherName);
  });

  it("should render navbar elements", () => {
    render(<UserPage />);
    options.forEach((option) => screen.getByText(option));
    screen.getByText(appName);
  });
});

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { options, appName } from "../../src/components/Navbar/Navbar";
import { TeacherDashboardTitle } from "../../src/components/TeacherDashboard/TeacherDashboard";
import { UserPage } from "../../src/pages/UserPage/UserPage";
import {NoTradesMessage} from "../../src/components/StudentTradingInfo/StudentTradingInfo"

const teacherName = "Sergio";

describe("UserPage rendering TeacherDashBoard", () => {
  vi.mock("react-router-dom", async () => {
    return {
      ...vi.importMock("react-router-dom"),
      useParams: vi.fn().mockReturnValue({ user: "Sergio" }),
      Link: ({ children, to }) => <a href={to}>{children}</a>,
    };
  });

  vi.mock("../../src/hooks/useGetUserData", () => {
    const useGetUserData = vi.fn();
    useGetUserData.mockReturnValue({
      loading: false,
      error: false,
      statusCode: 200,
      data: {
        username: "Sergio",
        role: "TEACHER",
        studentList: [
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
                justification: "justification sample 1",
                chartData: [1.2, 1.9, 1.2, 1.9, 1.2, 1.9, 1.2, 1.9],
                date: "2023-03-17 08:14:38",
              },
              {
                type: "SELL",
                coin: "BTC",
                quantity: 1.0,
                price: 12.2,
                justification: "justification sample 2",
                chartData: [1.2, 1.9, 1.2, 1.9, 1.2, 1.9, 1.2, 1.9],
                date: "2023-03-17 08:14:13",
              },
              {
                type: "BUY",
                coin: "BTC",
                quantity: 4.2,
                price: 10.1,
                justification: "justification sample 3",
                chartData: [1.2, 1.9, 1.2, 1.9, 1.2, 1.9, 1.2, 1.9],
                date: "2023-03-17 08:14:11",
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
                justification: "justification sample 4",
                chartData: [1.2, 1.9, 1.2, 1.9, 1.2, 1.9, 1.2, 1.9],
                date: "2023-03-17 08:14:39",
              },
              {
                type: "BUY",
                coin: "BTC",
                quantity: 1.2,
                price: 10.2,
                justification: "justification sample 5",
                chartData: [1.2, 1.9, 1.2, 1.9, 1.2, 1.9, 1.2, 1.9],
                date: "2023-03-17 08:14:15",
              },
            ],
          },
          {
            username: "UserTest4",
            balance: 0.0,
            portfolio: [],
            tradeHistory: [],
          },
        ],
      },
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

  it("should render dashboard introduction text", () => {
    render(<UserPage/>)
    screen.getByText(TeacherDashboardTitle);
  })

  it("should render navbar elements", () => {
    render(<UserPage />);
    options.forEach((option) => screen.getByText(option));
    screen.getByText(appName);
  });

  it("should render each student names", () => {
    render(<UserPage />);
    screen.getByText("UserTest2");
    screen.getByText("UserTest3");
  })

  it("should render UserTest2 Info", () => {
    render(<UserPage />);
    screen.getByText("UserTest2");
    screen.getByTestId("UserTest2Avatar");
    screen.getByText("Transacciones: 3");
    fireEvent.click(screen.getByText("UserTest2"))
    screen.getByText("2023-03-17 08:14:38")
    screen.getByText("2023-03-17 08:14:13")
    screen.getByText("2023-03-17 08:14:11")
    expect(screen.queryAllByText("BTC").length).toBe(2)
    expect(screen.queryAllByText("ADA").length).toBe(1)
    expect(screen.queryAllByText("BUY").length).toBe(2)
    expect(screen.queryAllByText("SELL").length).toBe(1)
    screen.getByText("Cantidad: 129.7")
    screen.getByText("Precio: 0.2")
    screen.getByText("justification sample 1")
    screen.getByText("Cantidad: 1")
    screen.getByText("Precio: 12.2")
    screen.getByText("justification sample 2")
    screen.getByText("Cantidad: 4.2")
    screen.getByText("Precio: 10.1")
    screen.getByText("justification sample 3")
    screen.getByTestId("UserTest2TradeChart0")
    screen.getByTestId("UserTest2TradeChart1")
    screen.getByTestId("UserTest2TradeChart2")
    

  })

  it("should render UserTest3 Info", () => {
    render(<UserPage />);
    screen.getByText("UserTest3");
    screen.getByTestId("UserTest3Avatar");
    screen.getByText("Transacciones: 2");
    fireEvent.click(screen.getByText("UserTest3"))
    screen.getByText("2023-03-17 08:14:39")
    screen.getByText("2023-03-17 08:14:15")
    expect(screen.queryAllByText("BTC").length).toBe(1)
    expect(screen.queryAllByText("ADA").length).toBe(1)
    expect(screen.queryAllByText("BUY").length).toBe(2)
    expect(screen.queryAllByText("SELL").length).toBe(0)
    screen.getByText("Cantidad: 2.3")
    screen.getByText("Precio: 0.2")
    screen.getByText("justification sample 4")
    screen.getByText("Cantidad: 1.2")
    screen.getByText("Precio: 10.2")
    screen.getByText("justification sample 5")
    screen.getByTestId("UserTest3TradeChart0")
    screen.getByTestId("UserTest3TradeChart1")
  })

  it("should render UserTest4 Info", () => {
    render(<UserPage />);
    screen.getByText("UserTest4");
    screen.getByTestId("UserTest4Avatar");
    screen.getByText("Transacciones: 0");
    fireEvent.click(screen.getByText("UserTest4"))
    screen.getByText(NoTradesMessage);
  })
});

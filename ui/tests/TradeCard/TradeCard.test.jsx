import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { TradeCard } from "../../src/components/TradeCard/TradeCard";

describe("TradeCard", () => {
  vi.mock("react", async () => {
    const ActualReact = await vi.importActual("react");
    return {
      ...ActualReact,
      useContext: () => ({}),
    };
  });

  vi.mock("../../../src/context/UserContext", () => {
    const UserContext = vi.fn();
    UserContext.mockReturnValue({});
    return {
      UserContext,
    };
  });
  afterEach(cleanup);

  it("should render Sergio trade", () => {
    render(
      <TradeCard
        username="Sergio"
        id={0}
        role="STUDENT"
        trade={{
          id: 0,
          type: "BUY",
          coin: "ADA",
          quantity: 129.7,
          price: 0.2,
          justification: "justification sample 1",
          chartData: [1.2, 1.9, 1.2, 1.9, 1.2, 1.9, 1.2, 1.9],
          date: "2023-03-17 08:14:38",
          feedback: "Buen trabajo 1",
        }}
      />
    );
    screen.getByText("Compra");
    screen.getByText("ADA");
    screen.getByText("Cantidad: 129.7");
    screen.getByText("Precio: 0.2");
    screen.getByText("justification sample 1");
    screen.getByText("2023-03-17 08:14:38")
    screen.getByText("Buen trabajo 1")
    screen.getByTestId("SergioTradeChart0")
    screen.getByTestId("SergioTrade0CoinADA")
  });
});

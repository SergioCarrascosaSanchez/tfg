import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import {
  StudentTradingInfo,
  NoTradesMessage,
} from "../../src/components/StudentTradingInfo/StudentTradingInfo";

describe("StudentTradingInfo", () => {
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

  it("should render message when empty info", () => {
    render(<StudentTradingInfo username="Sergio" info={[]} />);
    screen.getByText(NoTradesMessage);
  });
  it("should render info", () => {
    render(
      <StudentTradingInfo
        username="Sergio"
        info={[
          {
            id: 0,
            type: "BUY",
            coin: "ADA",
            quantity: 129.7,
            price: 0.2,
            justification: "justification sample 1",
            chartData: [1.2, 1.9, 1.2, 1.9, 1.2, 1.9, 1.2, 1.9],
            date: "2023-03-17 08:14:38",
            feedback: "Buen trabajo 1",
          },
        ]}
      />
    );
    screen.getByText("Transacciones de Sergio");
    screen.getByText("Compra");
    screen.getByText("ADA");
    screen.getByText("Cantidad: 129.7");
    screen.getByText("Precio: 0.2$");
    screen.getByText("justification sample 1");
    screen.getByText("2023-03-17 08:14:38");
    screen.getByText("Buen trabajo 1");
  });
});

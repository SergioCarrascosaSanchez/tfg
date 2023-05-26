import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { StudentSummaryCard } from "../../src/components/StudentSummaryCard/StudentSummaryCard";

describe("StudentSummaryCard", () => {
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

  it("should render name and image", () => {
    render(<StudentSummaryCard username="Sergio" tradeHistory={[]} />);
    screen.getByText("Sergio");
    screen.getByTestId("SergioAvatar");
    screen.getByText("S");
    screen.getByText("Transacciones: 0");
  });
  it("should render name and image 2", () => {
    render(<StudentSummaryCard username="Paula" tradeHistory={[]} />);
    screen.getByText("Paula");
    screen.getByTestId("PaulaAvatar");
    screen.getByText("P");
    screen.getByText("Transacciones: 0");
  });

  it("should render number of elements in tradeHistory 1", () => {
    render(<StudentSummaryCard username="Sergio" tradeHistory={[]} />);
    screen.getByText("Sergio");
    screen.getByTestId("SergioAvatar");
    screen.getByText("S");
    screen.getByText("Transacciones: 0");
  });
  it("should render number of elements in tradeHistory 2", () => {
    render(<StudentSummaryCard username="Sergio" tradeHistory={[{}]} />);
    screen.getByText("Sergio");
    screen.getByTestId("SergioAvatar");
    screen.getByText("S");
    screen.getByText("Transacciones: 1");
  });
  it("should render number of elements in tradeHistory 3", () => {
    render(
      <StudentSummaryCard username="Sergio" tradeHistory={[{}, {}, {}, {}]} />
    );
    screen.getByText("Sergio");
    screen.getByTestId("SergioAvatar");
    screen.getByText("S");
    screen.getByText("Transacciones: 4");
  });

  it("should render modal empty title", async () => {
    render(<StudentSummaryCard username="Sergio" tradeHistory={[]} />);
    fireEvent.click(screen.getByText("Sergio"));
    await waitFor(() => {
      screen.getByText("No hay transacciones");
    });
  });
  it("should render modal title", async () => {
    render(
      <StudentSummaryCard
        username="Sergio"
        tradeHistory={[
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
    fireEvent.click(screen.getByText("Sergio"));
    await waitFor(() => {
      screen.getByText("Transacciones de Sergio");
      screen.getByText("Compra");
      screen.getByText("ADA");
      screen.getByText("Cantidad: 129.7");
      screen.getByText("Precio: 0.2");
      screen.getByText("justification sample 1");
      screen.getByText("2023-03-17 08:14:38");
      screen.getByText("Buen trabajo 1");
    });
  });
});

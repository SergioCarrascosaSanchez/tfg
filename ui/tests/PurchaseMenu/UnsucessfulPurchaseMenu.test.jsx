import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { describe, it } from "vitest";
import {
  TradeMenu,
  TradeMenuTitle,
} from "../../src/components/TradeMenu/TradeMenu";

describe("PurchaseMenu", () => {
  vi.mock("../../src/hooks/useBuyCoin", () => {
    const useBuyCoin = vi.fn();
    useBuyCoin.mockReturnValue(function (username, coin, quantity, price){
      return ({ statusCode: 402, error: true });
    });
    return {
      useBuyCoin,
    };
  });

  afterEach(cleanup);

  it("should render error message when unsuccesful purchase", async () => {
    render(<TradeMenu coin={"BTC"} price={1} />);
    screen.getByText(TradeMenuTitle);
    fireEvent.change(screen.getByPlaceholderText("Cantidad"), {
      target: { value: 1 },
    });
    fireEvent.change(screen.getByPlaceholderText("Justificacion"), {
      target: { value: "Test" },
    });
    expect(
      screen.queryByText("Error al ejecutar la transaccion")
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      screen.getByText("Error al ejecutar la transaccion");
    }, { timeout: 2000 });
  });
});

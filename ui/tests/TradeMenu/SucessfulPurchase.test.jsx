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

describe("TradeMenu", () => {
  vi.mock("../../src/hooks/useTradeCoin", () => {
    const useTradeCoin = vi.fn();
    useTradeCoin.mockReturnValue({
      BuyCoin: vi.fn().mockReturnValue({ statusCode: 200, error: false }),
      SellCoin: vi.fn().mockReturnValue({})
    });
    return {
      useTradeCoin,
    };
  });

  afterEach(cleanup);

  it("should render message when succesful purchase", async () => {
    render(<TradeMenu coin={"BTC"} price={1} />);
    screen.getByText(TradeMenuTitle);
    fireEvent.change(screen.getByPlaceholderText("Cantidad"), {
      target: { value: 1 },
    });
    fireEvent.change(screen.getByPlaceholderText("Justificacion"), {
      target: { value: "Test" },
    });
    expect(
      screen.queryByText("Transacción realizada con éxito!")
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId("PurchaseButton"));
    await waitFor(() => {
      screen.getByText("Transacción realizada con éxito!");
    }, { timeout: 2000 });
  });
});

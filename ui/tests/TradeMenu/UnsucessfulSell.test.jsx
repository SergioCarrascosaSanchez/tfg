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
      BuyCoin: vi.fn().mockReturnValue({}),
      SellCoin: vi.fn().mockReturnValue({ statusCode: 400, error: true })
    });
    return {
      useTradeCoin,
    };
  });

  afterEach(cleanup);

  it("should render error message when unsuccesful sell", async () => {
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
    fireEvent.click(screen.getByTestId("SellButton"));
    await waitFor(() => {
      screen.getByText("Error al ejecutar la transaccion");
    }, { timeout: 2000 });
  });
});

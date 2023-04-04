import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import { describe, it } from "vitest";
import {
  TradeMenu,
  TradeMenuTitle,
  TradeMenuNotEnoughError
} from "../../src/components/TradeMenu/TradeMenu";

describe("TradeMenu", () => {
  vi.mock("../../src/hooks/useTradeCoin", () => {
    const useTradeCoin = vi.fn();
    useTradeCoin.mockReturnValue({
      loading: false,
      statusCode: 402, 
      error: true,
      TradeCoin: vi.fn()
    });
    return {
      useTradeCoin,
    };
  });

  afterEach(cleanup);

  it("should render error message when not enough balance or quantity", () => {
    render(<TradeMenu coin={"BTC"} price={1} chartData={[1.0, 2.0, 3.0]}/>);
    screen.getByText(TradeMenuTitle);
    screen.getByPlaceholderText("Justificacion")
    screen.getByPlaceholderText("Cantidad")
    screen.getByText(TradeMenuNotEnoughError)
  });
});

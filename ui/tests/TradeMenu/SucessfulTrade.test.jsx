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
  TradeMenuMessages,
  TradeMenuTexts,
  TradeMenuElements
} from "../../src/components/TradeMenu/TradeMenu";

describe("TradeMenu", () => {
  vi.mock("../../src/hooks/useTradeCoin", () => {
    const useTradeCoin = vi.fn();
    useTradeCoin.mockReturnValue({
      loading: false,
      statusCode: 200,
      error: false,
      TradeCoin: vi.fn(),
    });
    return {
      useTradeCoin,
    };
  });

  afterEach(cleanup);

  it("should render message when succesful trade", () => {
    render(<TradeMenu coin={"BTC"} price={1} chartData={[1.0, 2.0, 3.0]} />);
    screen.getByText(TradeMenuTexts.Title);
    screen.getByPlaceholderText(TradeMenuElements.JustificationPlaceholder)
    screen.getByPlaceholderText(TradeMenuElements.QuantityPlaceholder)
    screen.getByText(TradeMenuMessages.SuccessfulTrade)
  });
});

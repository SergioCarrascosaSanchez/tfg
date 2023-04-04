import {
  cleanup,
  render,
  screen,
  fireEvent,
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
      TradeCoin: vi.fn()
    });
    return {
      useTradeCoin,
    };
  });

  afterEach(cleanup);
  it("should render error when empty quantity", () => {
    render(<TradeMenu coin={"BTC"} price={1} chartData={[1.0, 2.0, 3.0]} />);
    screen.getByText(TradeMenuTexts.Title);
    screen.getByPlaceholderText(TradeMenuElements.QuantityPlaceholder);
    fireEvent.change(
      screen.getByPlaceholderText(TradeMenuElements.JustificationPlaceholder),
      {
        target: { value: "Test" },
      }
    );
    expect(
      screen.queryByText(TradeMenuMessages.IncorrectQuantity)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(TradeMenuMessages.IncorrectJustification)
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId(TradeMenuElements.SellButton));
    expect(
      screen.queryByText(TradeMenuMessages.IncorrectJustification)
    ).not.toBeInTheDocument();
    screen.getByText(TradeMenuMessages.IncorrectQuantity);
  });
  it("should render error when empty justification", () => {
    render(<TradeMenu coin={"BTC"} price={1} chartData={[1.0, 2.0, 3.0]} />);
    screen.getByText(TradeMenuTexts.Title);
    screen.getByPlaceholderText(TradeMenuElements.JustificationPlaceholder);
    fireEvent.change(
      screen.getByPlaceholderText(TradeMenuElements.QuantityPlaceholder),
      {
        target: { value: 1 },
      }
    );
    expect(
      screen.queryByText(TradeMenuMessages.IncorrectJustification)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(TradeMenuMessages.IncorrectQuantity)
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId(TradeMenuElements.SellButton));
    expect(
      screen.queryByText(TradeMenuMessages.IncorrectQuantity)
    ).not.toBeInTheDocument();
    screen.getByText(TradeMenuMessages.IncorrectJustification);
  });
  it("should render two errors when empty justification and empty quantity", () => {
    render(<TradeMenu coin={"BTC"} price={1} chartData={[1.0, 2.0, 3.0]} />);
    screen.getByText(TradeMenuTexts.Title);
    screen.getByPlaceholderText(TradeMenuElements.QuantityPlaceholder);
    screen.getByPlaceholderText(TradeMenuElements.JustificationPlaceholder);
    expect(
      screen.queryByText(TradeMenuMessages.IncorrectJustification)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(TradeMenuMessages.IncorrectQuantity)
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId(TradeMenuElements.SellButton));
    screen.getByText(TradeMenuMessages.IncorrectQuantity);
    screen.getByText(TradeMenuMessages.IncorrectJustification);
  });
});

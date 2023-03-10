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
      SellCoin: vi.fn().mockReturnValue({})
    });
    return {
      useTradeCoin,
    };
  });

  afterEach(cleanup);
  it("should render error when empty quantity", () => {
    render(<TradeMenu coin={"BTC"} price={1} chartData={[1.0, 2.0, 3.0]}/>);
    screen.getByText(TradeMenuTitle);
    screen.getByPlaceholderText("Cantidad");
    fireEvent.change(screen.getByPlaceholderText("Justificacion"), {
      target: { value: "Test" },
    });
    expect(screen.queryByText("Cantidad no valida")).not.toBeInTheDocument();
    expect(
      screen.queryByText("La justificacion es obligatoria")
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId("PurchaseButton"));
    expect(
      screen.queryByText("La justificacion es obligatoria")
    ).not.toBeInTheDocument();
    screen.getByText("Cantidad no valida");
  });
  it("should render error when empty justification", () => {
    render(<TradeMenu coin={"BTC"} price={1} chartData={[1.0, 2.0, 3.0]}/>);
    screen.getByText(TradeMenuTitle);
    screen.getByPlaceholderText("Justificacion");
    fireEvent.change(screen.getByPlaceholderText("Cantidad"), {
      target: { value: 1 },
    });
    expect(
      screen.queryByText("La justificacion es obligatoria")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Cantidad no valida")).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId("PurchaseButton"));
    expect(screen.queryByText("Cantidad no valida")).not.toBeInTheDocument();
    screen.getByText("La justificacion es obligatoria");
  });
  it("should render two errors when empty justification and empty quantity", () => {
    render(<TradeMenu coin={"BTC"} price={1} chartData={[1.0, 2.0, 3.0]}/>);
    screen.getByText(TradeMenuTitle);
    screen.getByPlaceholderText("Cantidad");
    screen.getByPlaceholderText("Justificacion");
    expect(
      screen.queryByText("La justificacion es obligatoria")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Cantidad no valida")).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId("PurchaseButton"));
    screen.getByText("Cantidad no valida");
    screen.getByText("La justificacion es obligatoria");
  });
});

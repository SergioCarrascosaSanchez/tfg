import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { TradeTypeChip } from "../../src/components/TradeTypeChip/TradeTypeChip";

describe("TradeTypeChip", () => {
  afterEach(cleanup);

  it("should render type BUY", () => {
    render(<TradeTypeChip type={"BUY"} />);
    screen.getByText("Compra");
  });

  it("should render type SELL", () => {
    render(<TradeTypeChip type={"SELL"} />);
    screen.getByText("Venta");
  });
});

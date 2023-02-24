import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "vitest";
import {
  PurchaseMenu,
  PurchaseMenuTitle,
} from "../../src/components/PurchaseMenu/PurchaseMenu";
const name = "BTCBUSD";

describe("PurchaseMenu", () => {
  vi.mock("../../src/hooks/useBuyCoin", () => {
    const useBuyCoin = vi.fn();
    useBuyCoin.mockReturnValueOnce({
      error: false,
      statusCode: 402,
    });
    useBuyCoin.mockReturnValue({
      error: false,
      statusCode: 200,
    });
    return {
      useBuyCoin,
    };
  });

  afterEach(cleanup);

  it("should render error message when unsuccesful purchase", () => {
    render(<PurchaseMenu />);
    screen.getByText(PurchaseMenuTitle);
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
    screen.getByText("Error al ejecutar la transaccion");
  });
  
  it("should render message when succesful purchase", () => {
    render(<PurchaseMenu />);
    screen.getByText(PurchaseMenuTitle);
    fireEvent.change(screen.getByPlaceholderText("Cantidad"), {
      target: { value: 1 },
    });
    fireEvent.change(screen.getByPlaceholderText("Justificacion"), {
      target: { value: "Test" },
    });
    expect(
      screen.queryByText("Transacción realizada con éxito!")
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    screen.getByText("Transacción realizada con éxito!");
  });

  it("should render error when empty quantity", () => {
    render(<PurchaseMenu />);
    screen.getByText(PurchaseMenuTitle);
    screen.getByPlaceholderText("Cantidad");
    fireEvent.change(screen.getByPlaceholderText("Justificacion"), {
      target: { value: "Test" },
    });
    expect(screen.queryByText("Cantidad no valida")).not.toBeInTheDocument();
    expect(
      screen.queryByText("La justificacion es obligatoria")
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(
      screen.queryByText("La justificacion es obligatoria")
    ).not.toBeInTheDocument();
    screen.getByText("Cantidad no valida");
  });
  it("should render error when empty justification", () => {
    render(<PurchaseMenu />);
    screen.getByText(PurchaseMenuTitle);
    screen.getByPlaceholderText("Justificacion");
    fireEvent.change(screen.getByPlaceholderText("Cantidad"), {
      target: { value: 1 },
    });
    expect(
      screen.queryByText("La justificacion es obligatoria")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Cantidad no valida")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByText("Cantidad no valida")).not.toBeInTheDocument();
    screen.getByText("La justificacion es obligatoria");
  });
  it("should render two errors when empty justification and empty quantity", () => {
    render(<PurchaseMenu />);
    screen.getByText(PurchaseMenuTitle);
    screen.getByPlaceholderText("Cantidad");
    screen.getByPlaceholderText("Justificacion");
    expect(
      screen.queryByText("La justificacion es obligatoria")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Cantidad no valida")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    screen.getByText("Cantidad no valida");
    screen.getByText("La justificacion es obligatoria");
  });
});

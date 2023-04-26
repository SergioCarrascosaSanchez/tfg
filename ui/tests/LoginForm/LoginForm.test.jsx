import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "vitest";
import {
  LoginForm,
  LoginFormTexts,
  LoginFormErrors,
} from "../../src/components/LoginForm/LoginForm";

describe("CoinChartCard Loading", () => {
  vi.mock("react-router-dom", async () => {
    return {
      ...vi.importMock("react-router-dom"),
      useNavigate: () => {},
    };
  });

  afterEach(cleanup);

  it("should render title, button, labels and inputs", () => {
    render(<LoginForm />);
    screen.getByRole("heading");
    screen.getByRole("button");
    screen.getByPlaceholderText(LoginFormTexts.UsernamePlaceholder);
    screen.getByPlaceholderText(LoginFormTexts.PasswordPlaceholder);
    if (LoginFormTexts.Title === LoginFormTexts.Button) {
      expect(screen.queryAllByText(LoginFormTexts.Title).length).toBe(2);
    } else {
      screen.getByText(LoginFormTexts.Title);
      screen.getByText(LoginFormTexts.Button);
    }
  });
  it("should render error if empty fields", () => {
    render(<LoginForm />);
    expect(screen.queryAllByText(LoginFormErrors.EmptyFields).length).toBe(0)
    fireEvent.click(screen.getByRole("button"))
    screen.getByText(LoginFormErrors.EmptyFields)
  });
  it("should render not error if not empty fields", () => {
    render(<LoginForm />);
    expect(screen.queryAllByText(LoginFormErrors.EmptyFields).length).toBe(0)
    fireEvent.change(
      screen.getByPlaceholderText(LoginFormTexts.UsernamePlaceholder),
      {
        target: { value: "Test" },
      }
    );
    fireEvent.change(
      screen.getByPlaceholderText(LoginFormTexts.PasswordPlaceholder),
      {
        target: { value: "Test" },
      }
    );
    fireEvent.click(screen.getByRole("button"))
    expect(screen.queryAllByText(LoginFormErrors.EmptyFields).length).toBe(0)
  });
});

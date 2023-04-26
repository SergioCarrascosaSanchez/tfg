import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "vitest";
import {
  LoginForm,
  LoginFormTexts,
  LoginFormErrors,
} from "../../src/components/LoginForm/LoginForm";

describe("LoginForm", () => {

  vi.mock("react-router-dom", async () => {
    return {
      ...vi.importMock("react-router-dom"),
      useNavigate: () => {},
    };
  });

  vi.mock("../../src/hooks/useLogin", () => {
    const useLogin = vi.fn();
    useLogin.mockReturnValue({
      loading: false,
      statusCode: 403,
      error: true,
      Login: vi.fn(),
    });
    return {
      useLogin,
    };
  });

  afterEach(cleanup);

  it("should render title, button, labels and inputs and error", () => {
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
    screen.getByText(LoginFormErrors.NotFound)
  });
});

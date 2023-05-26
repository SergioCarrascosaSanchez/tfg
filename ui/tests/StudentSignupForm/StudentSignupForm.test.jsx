import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import {
  StudentSignupForm,
  StudentSignupFormPlaceHolders,
  StudentSignupFormMessages,
} from "../../src/components/StudentSignupForm/StudentSignupForm";

describe("StudentSignupForm", () => {
  afterEach(cleanup);

  it("should render fields, buttons and titles", () => {
    render(<StudentSignupForm />);
    screen.getByText("Nuevo estudiante");
    screen.getByPlaceholderText(StudentSignupFormPlaceHolders.balance);
    screen.getByPlaceholderText(StudentSignupFormPlaceHolders.email);
    screen.getByPlaceholderText(StudentSignupFormPlaceHolders.password);
    screen.getByPlaceholderText(StudentSignupFormPlaceHolders.username);
    screen.getByText("Crear estudiante");
  });

  it("should render error message when empty fields", async () => {
    render(<StudentSignupForm />);
    screen.getByPlaceholderText(StudentSignupFormPlaceHolders.balance);
    screen.getByPlaceholderText(StudentSignupFormPlaceHolders.email);
    screen.getByPlaceholderText(StudentSignupFormPlaceHolders.password);
    screen.getByPlaceholderText(StudentSignupFormPlaceHolders.username);
    fireEvent.click(screen.getByText("Crear estudiante"));
    await waitFor(() => {
        screen.getByText(StudentSignupFormMessages.emptyFields);
      });
  });
});

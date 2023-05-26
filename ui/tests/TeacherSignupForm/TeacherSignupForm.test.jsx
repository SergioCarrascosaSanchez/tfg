import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import {
  TeacherSignupForm,
  TeacherSignupFormPlaceHolders,
  TeacherSignupFormMessages,
} from "../../src/components/TeacherSignupForm/TeacherSignupForm";

describe("TeacherSignupForm", () => {
  afterEach(cleanup);

  it("should render fields, buttons and titles", () => {
    render(<TeacherSignupForm />);
    screen.getByText("Nuevo profesor");
    screen.getByPlaceholderText(TeacherSignupFormPlaceHolders.email);
    screen.getByPlaceholderText(TeacherSignupFormPlaceHolders.password);
    screen.getByPlaceholderText(TeacherSignupFormPlaceHolders.username);
    screen.getByText("Crear profesor");
  });

  it("should render error message when empty fields", async () => {
    render(<TeacherSignupForm />);
    fireEvent.click(screen.getByText("Crear profesor"));
    await waitFor(() => {
      screen.getByText(TeacherSignupFormMessages.emptyFields);
    });
  });
});

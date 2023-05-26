import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import {
  AddStudentToTeacherForm,
  AddStudentToTeacherFormTitle,
  AddStudentToTeacherFormTitleTeacher,
  AddStudentToTeacherFormTitleStudents,
  AddStudentToTeacherFormSubmitButton,
  AddStudentToTeacherSucessfulOperationMessage,
  AddStudentToTeacherUnexpectedErrorOperationMessage,
  AddStudentToTeacherUnsucessfulOperationMessage,
} from "../../src/components/AddStudentToTeacherForm/AddStudentToTeacherForm";

describe("AddStudentToTeacher Form", () => {
  afterEach(cleanup);

  it("should render titles, basic texts, buttons and inputs", () => {
    render(<AddStudentToTeacherForm />);
    screen.getByText(AddStudentToTeacherFormTitle);
    screen.getByText(AddStudentToTeacherFormTitleTeacher);
    screen.getByText(AddStudentToTeacherFormTitleStudents);
    screen.getByText(AddStudentToTeacherFormSubmitButton);
    screen.getByTestId("submitAddStudentsButton")
    screen.getByText("+");
    screen.getByPlaceholderText("Nombre del profesor");
    screen.getByPlaceholderText("Nombre del alumno 1");
    screen.getByPlaceholderText("Nombre del alumno 2");
    screen.getByPlaceholderText("Nombre del alumno 3");
    screen.getByPlaceholderText("Nombre del alumno 4");
    screen.getByPlaceholderText("Nombre del alumno 5");
  });

  it("should add new input when clicking on + button", async () => {
    render(<AddStudentToTeacherForm />);
    expect(screen.queryAllByPlaceholderText("Nombre del alumno 6").length).toBe(
      0
    );
    fireEvent.click(screen.getByText("+"));
    await waitFor(() => {
      screen.queryAllByPlaceholderText("Nombre del alumno 6");
    });
  });

  it("should delete input when clicking on remove button", async () => {
    render(<AddStudentToTeacherForm />);
    screen.queryAllByPlaceholderText("Nombre del alumno 1");
    fireEvent.click(screen.getByTestId("student1RemoveButton"));
    await waitFor(() => {
      expect(
        screen.queryAllByPlaceholderText("Nombre del alumno 1").length
      ).toBe(0);
    });
  });

  it("should render error message for empty fields", async () => {
    render(<AddStudentToTeacherForm />);

    fireEvent.click(screen.getByTestId("submitAddStudentsButton"));

    await waitFor(() => {
      expect(
        screen.getByText("Debes rellenar todos los campos")
      ).toBeInTheDocument();
    });
  });
});

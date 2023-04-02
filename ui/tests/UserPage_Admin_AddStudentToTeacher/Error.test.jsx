import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "vitest";
import { UserPage } from "../../src/pages/UserPage/UserPage";
import {
  AdminDashboardAddStudentToTeacherButtonText,
} from "../../src/components/AdminDashboard/AdminDashboard";
import {
  AddStudentToTeacherUnsucessfulOperationMessage,
  AddStudentToTeacherFormSubmitButton,
  AddStudentToTeacherUnexpectedErrorOperationMessage
} from "../../src/components/AddStudentToTeacherForm/AddStudentToTeacherForm";

describe("UserPage rendering AdminDashboard", () => {
  vi.mock("react-router-dom", async () => {
    return {
      ...vi.importMock("react-router-dom"),
      useParams: vi.fn().mockReturnValue({ user: "Sergio" }),
      Link: ({ children, to }) => <a href={to}>{children}</a>,
    };
  });

  vi.mock("../../src/hooks/useGetUserData", () => {
    const useGetUserData = vi.fn();
    useGetUserData.mockReturnValue({
      loading: false,
      error: false,
      statusCode: 200,
      data: {
        username: "Sergio",
        role: "ADMIN",
      },
    });
    return {
      useGetUserData,
    };
  });

  vi.mock("../../src/hooks/useAddStudentsToTeacher", () => {
    const useAddStudentsToTeacher = vi.fn();
    useAddStudentsToTeacher.mockReturnValueOnce({
      loading: false,
      error: true,
      statusCode: 422,
      addStudentsToUsers: vi.fn()
    });
    useAddStudentsToTeacher.mockReturnValue({
      loading: false,
      error: true,
      statusCode: 404,
      addStudentsToUsers: vi.fn()
    });
    return {
      useAddStudentsToTeacher,
    };
  });

  afterEach(cleanup);
  it("should render message if UnsucessfulOperation 422", () => {
    render(<UserPage />);
    fireEvent.click(
      screen.getByText(AdminDashboardAddStudentToTeacherButtonText)
    );

    fireEvent.change(screen.getByPlaceholderText("Nombre del profesor"), {
      target: { value: "TeacherName" },
    });

    fireEvent.click(
      screen.getByText(AddStudentToTeacherFormSubmitButton)
    );
    screen.getByText("Debes rellenar todos los campos")

    fireEvent.change(screen.getByPlaceholderText("Nombre del alumno 1"), {
      target: { value: "Alumno 1" },
    });

    fireEvent.change(screen.getByPlaceholderText("Nombre del alumno 2"), {
      target: { value: "Alumno 2" },
    });

    fireEvent.change(screen.getByPlaceholderText("Nombre del alumno 3"), {
      target: { value: "Alumno 3" },
    });

    fireEvent.change(screen.getByPlaceholderText("Nombre del alumno 4"), {
      target: { value: "Alumno 4" },
    });

    fireEvent.change(screen.getByPlaceholderText("Nombre del alumno 5"), {
      target: { value: "Alumno 5" },
    });

    fireEvent.click(
      screen.getByText(AddStudentToTeacherFormSubmitButton)
    );
    screen.getByText(AddStudentToTeacherUnsucessfulOperationMessage)
    
  });
  it("should render message if UnsucessfulOperation 404", () => {
    render(<UserPage />);
    fireEvent.click(
      screen.getByText(AdminDashboardAddStudentToTeacherButtonText)
    );

    fireEvent.change(screen.getByPlaceholderText("Nombre del profesor"), {
      target: { value: "TeacherName" },
    });

    fireEvent.click(
      screen.getByText(AddStudentToTeacherFormSubmitButton)
    );
    screen.getByText("Debes rellenar todos los campos")

    fireEvent.change(screen.getByPlaceholderText("Nombre del alumno 1"), {
      target: { value: "Alumno 1" },
    });

    fireEvent.change(screen.getByPlaceholderText("Nombre del alumno 2"), {
      target: { value: "Alumno 2" },
    });

    fireEvent.change(screen.getByPlaceholderText("Nombre del alumno 3"), {
      target: { value: "Alumno 3" },
    });

    fireEvent.change(screen.getByPlaceholderText("Nombre del alumno 4"), {
      target: { value: "Alumno 4" },
    });

    fireEvent.change(screen.getByPlaceholderText("Nombre del alumno 5"), {
      target: { value: "Alumno 5" },
    });

    fireEvent.click(
      screen.getByText(AddStudentToTeacherFormSubmitButton)
    );
    screen.getByText(AddStudentToTeacherUnsucessfulOperationMessage)
    
  });
});

import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "vitest";
import { UserPage } from "../../src/pages/UserPage/UserPage";
import {
  AdminDashboardTitle,
  AdminDashboardAddStudentToTeacherButtonText,
} from "../../src/components/AdminDashboard/AdminDashboard";
import {
  AddStudentToTeacherFormTitle,
  AddStudentToTeacherFormTitleTeacher,
  AddStudentToTeacherFormTitleStudents,
  AddStudentToTeacherFormSubmitButton
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

  afterEach(cleanup);

  it("should render admin name", () => {
    render(<UserPage />);
    screen.getByText(AdminDashboardTitle);
  });
  it("should render form to add student to teacher", () => {
    render(<UserPage />);
    fireEvent.click(
      screen.getByText(AdminDashboardAddStudentToTeacherButtonText)
    );
    screen.getByText(AddStudentToTeacherFormTitle);
    screen.getByText(AddStudentToTeacherFormTitleTeacher);
    screen.getByText(AddStudentToTeacherFormTitleStudents);


    screen.getByTestId("teacherInput")
    screen.getByTestId("student1Input")
    screen.getByTestId("student2Input")
    screen.getByTestId("student3Input")
    screen.getByTestId("student4Input")
    screen.getByTestId("student5Input")
    expect(screen.queryAllByTestId("student6Input").length).toBe(0)

    screen.getByTestId("student1RemoveButton")
    screen.getByTestId("student2RemoveButton")
    screen.getByTestId("student3RemoveButton")
    screen.getByTestId("student4RemoveButton")
    screen.getByTestId("student5RemoveButton")
    expect(screen.queryAllByTestId("student6RemoveButton").length).toBe(0)

    fireEvent.click(
      screen.getByTestId("additionButton")
    );

    screen.getByTestId("student6Input")
    screen.getByTestId("student6RemoveButton")

    fireEvent.click(
      screen.getByTestId("student6RemoveButton")
    );
    expect(screen.queryAllByTestId("student6Input").length).toBe(0)
    expect(screen.queryAllByTestId("student6RemoveButton").length).toBe(0)
    
    screen.getByText(AddStudentToTeacherFormSubmitButton)
    
  });

  it("should render error if any field is missing", () => {
    render(<UserPage />);
    fireEvent.click(
      screen.getByText(AdminDashboardAddStudentToTeacherButtonText)
    );

    fireEvent.click(
      screen.getByText(AddStudentToTeacherFormSubmitButton)
    );
    screen.getByText("Debes rellenar todos los campos")
    
    screen.getByTestId("teacherInput")
    screen.getByTestId("student1Input")
    screen.getByTestId("student2Input")
    screen.getByTestId("student3Input")
    screen.getByTestId("student4Input")
    screen.getByTestId("student5Input")
    
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

    fireEvent.click(
      screen.getByText(AddStudentToTeacherFormSubmitButton)
    );
    screen.getByText("Debes rellenar todos los campos")

    fireEvent.change(screen.getByPlaceholderText("Nombre del alumno 5"), {
      target: { value: "Alumno 5" },
    });

    fireEvent.click(
      screen.getByText(AddStudentToTeacherFormSubmitButton)
    );
    expect(screen.queryAllByText("Debes rellenar todos los campos").length).toBe(0)
    
  });
});

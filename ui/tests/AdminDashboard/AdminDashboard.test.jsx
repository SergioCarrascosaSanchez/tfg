import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import {
  AdminDashboard,
  AdminDashboardTitle,
  AdminDashboardSignupStudentButtonText,
  AdminDashboardSignupTeacherButtonText,
  AdminDashboardAddStudentToTeacherButtonText,
} from "../../src/components/AdminDashboard/AdminDashboard";

describe("AdminDashboard", () => {
  afterEach(cleanup);

  it("should render buttons and title", () => {
    render(<AdminDashboard />);
    screen.getByText(AdminDashboardTitle);
    screen.getByText(AdminDashboardSignupStudentButtonText);
    screen.getByText(AdminDashboardSignupTeacherButtonText);
    screen.getByText(AdminDashboardAddStudentToTeacherButtonText);
  });

  it("should render StudentForm when clicking button", async () => {
    render(<AdminDashboard />);
    fireEvent.click(screen.getByText(AdminDashboardSignupStudentButtonText));
    await waitFor(() => {
      screen.getByText("Nuevo estudiante");
    });
  });

  it("should render TeacherForm when clicking button", async () => {
    render(<AdminDashboard />);
    fireEvent.click(screen.getByText(AdminDashboardSignupTeacherButtonText));
    await waitFor(() => {
      screen.getByText("Nuevo profesor");
    });
  });

  it("should render AddStudentToTeacherForm when clicking button", async () => {
    render(<AdminDashboard />);
    fireEvent.click(
      screen.getByText(AdminDashboardAddStudentToTeacherButtonText)
    );
    await waitFor(() => {
      screen.getByText("Añadir alumnos a un profesor");
    });
  });
});

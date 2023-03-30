import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "vitest";
import { UserPage } from "../../src/pages/UserPage/UserPage";
import {
  AdminDashboardTitle,
  AdminDashboardSignupStudentButtonText,
  AdminDashboardSignupTeacherButtonText,
  AdminDashboardAddStudentToTeacherButtonText,
} from "../../src/components/AdminDashboard/AdminDashboard";

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
  it("should render button for signup a new student", () => {
    render(<UserPage />);
    fireEvent.click(screen.getByText(AdminDashboardSignupStudentButtonText));
    screen.getByText("Estudiante form");
  });
  it("should render button for signup a new teacher", () => {
    render(<UserPage />);
    fireEvent.click(screen.getByText(AdminDashboardSignupTeacherButtonText));
    screen.getByText("Profesor form");
  });
  it("should render button for signup a new user", () => {
    render(<UserPage />);
    fireEvent.click(screen.getByText(AdminDashboardAddStudentToTeacherButtonText))
    screen.getByText("Addition");
  });
});

import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "vitest";
import { UserPage } from "../../src/pages/UserPage/UserPage";
import {
  AdminDashboardTitle,
  AdminDashboardSignupStudentButtonText,
} from "../../src/components/AdminDashboard/AdminDashboard";
import { StudentSignupFormPlaceHolders, StudentSignupFormMessages } from "../../src/components/StudentSignupForm/StudentSignupForm";

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
  vi.mock("../../src/hooks/useSignupUser", () => {
    const useSignupUser = vi.fn();
    useSignupUser.mockReturnValue({
      loading: false,
      error: false,
      statusCode: 200,
      signupUser : vi.fn()
    });
    return {
      useSignupUser,
    };
  });

  afterEach(cleanup);

  it("should render admin name", () => {
    render(<UserPage />);
    screen.getByText(AdminDashboardTitle);
  });
  it("should render button for signup a new student", () => {
    render(<UserPage />);
    screen.getByText(AdminDashboardSignupStudentButtonText)
  }); 
  it("should render student form when clicking on the button", () => {
    render(<UserPage />);
    fireEvent.click(screen.getByText(AdminDashboardSignupStudentButtonText));
    screen.getByText("Nuevo estudiante");
    Object.values(StudentSignupFormPlaceHolders).forEach(placeHolder => {
      screen.getByPlaceholderText(placeHolder)
    })
    screen.getByText("Crear estudiante");
  })
  it("should render error message if any field is empty", () => {
    render(<UserPage />);
    fireEvent.click(screen.getByText(AdminDashboardSignupStudentButtonText));
    fireEvent.click(screen.getByText("Crear estudiante"));
    screen.getByText(StudentSignupFormMessages.emptyFields)
  })
});

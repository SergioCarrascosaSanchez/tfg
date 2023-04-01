import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "vitest";
import { UserPage } from "../../src/pages/UserPage/UserPage";
import {
  AdminDashboardTitle,
  AdminDashboardSignupTeacherButtonText,
} from "../../src/components/AdminDashboard/AdminDashboard";
import {TeacherSignupFormPlaceHolders, TeacherSignupFormMessages} from "../../src/components/TeacherSignupForm/TeacherSignupForm"

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
  it("should render button for signup a new teacher", () => {
    render(<UserPage />);
    screen.getByText(AdminDashboardSignupTeacherButtonText)
  }); 
  it("should render teacher form when clicking on the button", () => {
    render(<UserPage />);
    fireEvent.click(screen.getByText(AdminDashboardSignupTeacherButtonText));
    screen.getByText("Nuevo profesor");
    Object.values(TeacherSignupFormPlaceHolders).forEach(placeHolder => {
      screen.getByPlaceholderText(placeHolder)
    })
    screen.getByText("Crear profesor");
  })
  it("should render error message if any field is empty", () => {
    render(<UserPage />);
    fireEvent.click(screen.getByText(AdminDashboardSignupTeacherButtonText));
    fireEvent.click(screen.getByText("Crear profesor"));
    screen.getByText(TeacherSignupFormMessages.emptyFields)
  })
});

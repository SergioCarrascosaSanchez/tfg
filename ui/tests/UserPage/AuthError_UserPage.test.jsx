import { describe } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { UserPage, AuthorizationError } from "../../src/pages/UserPage/UserPage";

const username = "Sergio";

describe("UserPage", () => {
    vi.mock("react-router-dom", () => {
        const useParams = vi.fn();
        const username = "Sergio";
        useParams.mockReturnValue({
          user: username,
        });
        return {
          useParams,
        };
      });
    
      vi.mock("../../src/hooks/useGetUserData", () => {
        const useGetUserData = vi.fn();
        useGetUserData.mockReturnValue({
          loading: false,
          error: true,
          statusCode: 403,
          data: [],
        });
        return {
          useGetUserData,
        };
      });
    
      afterEach(cleanup);
    
      it("should render error", () => {
        render(<UserPage />);
        screen.getByText(AuthorizationError);
      });
})
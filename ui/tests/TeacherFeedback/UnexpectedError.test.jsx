import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import {
  TeacherFeedback,
  TeacherFeedbackErrors,
} from "../../src/components/TeacherFeedback/TeacherFeedback";

describe("TeacherFeedback", () => {

  afterEach(cleanup);

  vi.mock("../../src/hooks/useUpdateComment", () => {
    const useUpdateComment = vi.fn();
    useUpdateComment.mockReturnValue({
      loading: false,
      statusCode: 400,
      error: true,
      TradeCoin: vi.fn(),
    })
    return {
      useUpdateComment,
    };
  });
  vi.mock('react', async () => {
    const ActualReact = await vi.importActual('react')
    return {
      ...ActualReact,
      useContext: () => ({ })
    }
  })

  vi.mock("../../src/context/UserContext", () => {
    const UserContext = vi.fn();
    UserContext.mockReturnValue({});
    return {
      UserContext,
    };
  })
  

  it("should not render error for failed api call", () => {

    render(<TeacherFeedback comment={""} role={"TEACHER"} />);
    screen.getByText(TeacherFeedbackErrors.UnexpectedError)
  });
});
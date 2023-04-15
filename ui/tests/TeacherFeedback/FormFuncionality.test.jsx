import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import {
  TeacherFeedback,
  TeacherFeedbackErrors,
  TeacherFeedbackElements,
} from "../../src/components/TeacherFeedback/TeacherFeedback";

describe("TeacherFeedback", () => {
  afterEach(cleanup);

  vi.mock("../../src/hooks/useUpdateComment", () => {
    const useUpdateComment = vi.fn();
    useUpdateComment.mockReturnValue({
      loading: false,
      statusCode: null,
      error: false,
      TradeCoin: vi.fn(),
    });
    return {
      useUpdateComment,
    };
  });

  it("should render comment if there is a comment and role is student", () => {
    const comment = "Esto es un comentario";
    render(<TeacherFeedback comment={comment} role={"STUDENT"} />);
    screen.getByText(comment);
  });

  it("should render comment if there is a comment and role is student", () => {
    const comment = "Esto es un comentario";
    render(
      <TeacherFeedback
        comment={comment}
        role={"STUDENT"}
        teacher={"Teacher"}
        student={"Student"}
        tradeId={3}
      />
    );
    screen.getByText(comment);
  });

  it("should render message if there isnt a comment and the role is student", () => {
    const comment = "";
    render(<TeacherFeedback comment={comment} role={"STUDENT"} />);
    screen.getByText(TeacherFeedbackErrors.NoComment);
  });

  it("should render textarea and button if there isnt a comment and the role is teacher", () => {
    const comment = "";
    render(
      <TeacherFeedback
        comment={comment}
        role={"TEACHER"}
        teacher={"Teacher"}
        student={"Student"}
        tradeId={3}
      />
    );
    screen.getByRole("textbox");
    screen.getByRole("button");
    screen.getByText(TeacherFeedbackElements.SubmitButton);
  });

  it("should render error if text area is empty when submit", () => {
    const comment = "";
    render(
      <TeacherFeedback
        comment={comment}
        role={"TEACHER"}
        teacher={"Teacher"}
        student={"Student"}
        tradeId={3}
      />
    );
    expect(
      screen.queryAllByText(TeacherFeedbackErrors.EmptyTextArea).length
    ).toBe(0);
    fireEvent.click(screen.getByRole("button"));
    screen.getByText(TeacherFeedbackErrors.EmptyTextArea);
  });
  it("should not render error if text area is not empty when submit", () => {
    const comment = "";
    render(
      <TeacherFeedback
        comment={comment}
        role={"TEACHER"}
        teacher={"Teacher"}
        student={"Student"}
        tradeId={3}
      />
    );
    expect(
      screen.queryAllByText(TeacherFeedbackErrors.EmptyTextArea).length
    ).toBe(0);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Test" },
    });
    fireEvent.click(screen.getByRole("button"));
    expect(
      screen.queryAllByText(TeacherFeedbackErrors.EmptyTextArea).length
    ).toBe(0);
  });
});

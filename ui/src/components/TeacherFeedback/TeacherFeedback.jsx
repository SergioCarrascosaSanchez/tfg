import { Button, Textarea } from "@mui/joy";
import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { useUpdateComment } from "../../hooks/useUpdateComment";

export const TeacherFeedbackErrors = {
  NoComment: "No hay ningún comentario de profesor aún",
  EmptyTextArea: "No puedes dejar esta sección vacía",
  UnexpectedError: "Ha ocurrido un error"
};

export const TeacherFeedbackElements = {
  SubmitButton: "Enviar comentario",
};

export const TeacherFeedback = ({ comment, role }) => {
  const [newComment, setNewComment] = useState("");
  const [emptyCommentError, setEmptyCommentError] = useState(false);
  const { loading, error, statusCode, UpdateComment } = useUpdateComment();

  const handleSubmit = () => {
    setEmptyCommentError(newComment.length === 0);
    if (newComment.length > 0) {
      UpdateComment()
    }
  };

  return (
    <>
      {comment.length > 0 ? (
        <p>{comment}</p>
      ) : role === "TEACHER" ? (
        <>
          {emptyCommentError && (
            <ErrorMessage
              message={TeacherFeedbackErrors.EmptyTextArea}
              form={true}
            />
          )}
          {error && (
            <ErrorMessage
              message={TeacherFeedbackErrors.UnexpectedError}
              form={true}
            />
          )}
          <Textarea onChange={(e) => setNewComment(e.target.value)} />
          <Button loading={loading} onClick={handleSubmit}>
            {TeacherFeedbackElements.SubmitButton}
          </Button>
        </>
      ) : (
        role === "STUDENT" && <p>{TeacherFeedbackErrors.NoComment}</p>
      )}
    </>
  );
};

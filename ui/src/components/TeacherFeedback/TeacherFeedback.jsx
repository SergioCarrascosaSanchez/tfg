import { Box, Button, Textarea } from "@mui/joy";
import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { useUpdateComment } from "../../hooks/useUpdateComment";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const TeacherFeedbackErrors = {
  NoComment: "No hay ningún comentario de profesor aún",
  EmptyTextArea: "No puedes dejar esta sección vacía",
  UnexpectedError: "Ha ocurrido un error",
};

export const TeacherFeedbackElements = {
  SubmitButton: "Enviar comentario",
};

export const TeacherFeedback = ({ comment, role, student, tradeId }) => {
  const [newComment, setNewComment] = useState("");
  const [emptyCommentError, setEmptyCommentError] = useState(false);
  const { loading, error, statusCode, UpdateComment } = useUpdateComment();

  const contextLoading = useContext(UserContext).loading;

  const handleSubmit = () => {
    setEmptyCommentError(newComment.length === 0);
    if (newComment.length > 0) {
      UpdateComment(
        window.localStorage.getItem("username"),
        student,
        tradeId,
        newComment
      );
    }
  };

  return (
    <Box
      sx={{
        maxWidth: {xs:"100%", md:"80%", lg:"80%", xl:"80%"},
      }}
    >
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
          <Textarea
            minRows={2}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Box size={"xs"} sx={{display:"grid", placeContent:"right", my:1}}>
            <Button loading={loading || contextLoading} onClick={handleSubmit}>
              {TeacherFeedbackElements.SubmitButton}
            </Button>
          </Box>
        </>
      ) : (
        role === "STUDENT" && <p>{TeacherFeedbackErrors.NoComment}</p>
      )}
    </Box>
  );
};

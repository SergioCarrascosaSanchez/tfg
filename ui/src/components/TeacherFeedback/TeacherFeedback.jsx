import { Box, Button, Textarea, Typography } from "@mui/joy";
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

export const TeacherFeedbackTexts = {
  TeacherFeedback: "Comentarios del profesor:",
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
        maxWidth: { xs: "100%", md: "100%", lg: "100%", xl: "100%" },
        marginTop: 3,
      }}
    >
      <p>{TeacherFeedbackTexts.TeacherFeedback}</p>
      {typeof comment === "string" && comment.length > 0 ? (
        <Typography
          textColor="neutral.600"
          level="body"
          component="p"
          sx={{
            textAlign: "justify",
          }}
        >
          {comment}
        </Typography>
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
            minRows={3}
            sx={{
              my: 1,
            }}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Box
            size={"xs"}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "0% 100%",
                md: "75% 25%",
                lg: "75% 25%",
                xl: "77% 23%",
              },
              placeContent: "right",
              my: 1,
            }}
          >
            <Button
              loading={loading || contextLoading}
              onClick={handleSubmit}
              sx={{ gridColumn: 2 }}
            >
              {TeacherFeedbackElements.SubmitButton}
            </Button>
          </Box>
        </>
      ) : (
        role === "STUDENT" && (
          <Typography
            textColor="neutral.600"
            level="body"
            component="p"
          >
            {TeacherFeedbackErrors.NoComment}
          </Typography>
        )
      )}
    </Box>
  );
};

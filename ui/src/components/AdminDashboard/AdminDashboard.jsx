import { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import { AddStudentToTeacherForm } from "../AddStudentToTeacherForm/AddStudentToTeacherForm";

export const AdminDashboardTitle = "Panel de control de usuarios";
export const AdminDashboardSignupStudentButtonText =
  "Dar de alta un estudiante";
export const AdminDashboardSignupTeacherButtonText = "Dar de alta un profesor";
export const AdminDashboardAddStudentToTeacherButtonText =
  "Agregar estudiantes a un profesor";

export const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState("");

  return (
    <>
      <Typography level="display2" component="h1">
        {AdminDashboardTitle}
      </Typography>
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          gap: 6,
          my: 10,
          gridTemplateColumns: "33% 33% 33%",
        }}
      >
        <Button
          size="lg"
          onClick={() => {
            setOpen(true);
            setForm("newStudent");
          }}
        >
          {AdminDashboardSignupStudentButtonText}
        </Button>
        <Button
          size="lg"
          onClick={() => {
            setOpen(true);
            setForm("newTeacher");
          }}
        >
          {AdminDashboardSignupTeacherButtonText}
        </Button>
        <Button
          size="lg"
          onClick={() => {
            setOpen(true);
            setForm("addition");
          }}
        >
          {AdminDashboardAddStudentToTeacherButtonText}
        </Button>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose />
          {form === "newStudent" ? (
            <>Estudiante form</>
          ) : form === "newTeacher" ? (
            <>Profesor form</>
          ) : (
            <AddStudentToTeacherForm/>
          )}
        </ModalDialog>
      </Modal>
    </>
  );
};

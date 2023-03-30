import { useState } from "react";
import { List, Box, Stack, Input, Button } from "@mui/joy";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export const AddStudentToTeacherFormTitle = "Añadir alumnos a un profesor";
export const AddStudentToTeacherFormTitleTeacher = "Nombre del profesor";
export const AddStudentToTeacherFormTitleStudents = "Listado de alumnos";
export const AddStudentToTeacherFormSubmitButton = "Añadir alumnos";

export const AddStudentToTeacherForm = () => {
  const [teacher, setTeacher] = useState("");
  const [count, setCount] = useState(5);
  const [formData, setFormData] = useState({
    student1: "",
    student2: "",
    student3: "",
    student4: "",
    student5: "",
  });
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddField = () => {
    const newField = `student${count + 1}`;
    setCount(count + 1);
    setFormData({ ...formData, [newField]: "" });
  };

  const handleRemoveField = (fieldName) => {
    const newFormData = { ...formData };
    delete newFormData[fieldName];
    setFormData(newFormData);
  };

  return (
    <form
      onSubmit={(event) => {
        setEmptyFieldsError(false);
        event.preventDefault();
        if (teacher === "" || Object.values(formData).includes("")) {
          setEmptyFieldsError(true);
        }
      }}
    >
      <Stack spacing={2} sx={{ p: 6 }}>
        {emptyFieldsError && (
          <ErrorMessage form="true" message="Debes rellenar todos los campos" />
        )}
        <h1>{AddStudentToTeacherFormTitle}</h1>
        <p>{AddStudentToTeacherFormTitleTeacher}</p>
        <Input
          data-testid="teacherInput"
          placeholder={"Nombre del profesor"}
          onChange={(e) => {
            setTeacher(e.target.value);
          }}
        />
        <Box
          sx={{
            display: "grid",
            placeContent: "center",
            my: 10,
            gridTemplateColumns: "91% 9%",
          }}
        >
          <h2>{AddStudentToTeacherFormTitleStudents}</h2>
          <Button
            size="sm"
            type="button"
            onClick={handleAddField}
            data-testid={"additionButton"}
          >
            +
          </Button>
        </Box>
        <List
          sx={{ overflowY: "scroll", overflowX: "hidden", maxHeight: "300px" }}
        >
          {Object.keys(formData).map((fieldName) => (
            <Box key={fieldName} sx={{ my: 1, marginRight: 2 }}>
              <Input
                type="text"
                name={fieldName}
                data-testid={`${fieldName}Input`}
                value={formData[fieldName]}
                placeholder={`Nombre del alumno ${fieldName.substring(
                  fieldName.length - 1
                )}`}
                onChange={handleInputChange}
                endDecorator={
                  <Button
                    type="button"
                    variant="soft"
                    color="danger"
                    size="md"
                    data-testid={`${fieldName}RemoveButton`}
                    onClick={() => handleRemoveField(fieldName)}
                  >
                    <h6>X</h6>
                  </Button>
                }
              />
            </Box>
          ))}
        </List>
        <Button type="submit">{AddStudentToTeacherFormSubmitButton}</Button>
      </Stack>
    </form>
  );
};

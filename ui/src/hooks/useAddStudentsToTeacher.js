import { useState } from "react";

const URL = `${import.meta.env.VITE_USERS_API_URL}`;

export const useAddStudentsToTeacher = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const addStudentsToUsers = (teacher, studentList) => {

    setLoading(true);
    fetch(`${URL}/teacher/${teacher}`, {
      method: "POST",
      body: JSON.stringify({
        studentList: studentList,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setError(false);
          setStatusCode(200);
          setLoading(false);
        } else {
          setError(true);
          setStatusCode(res.status);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err);
      });
  };

  return { loading, error, statusCode, addStudentsToUsers };
};

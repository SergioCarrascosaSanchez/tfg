import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext"

const URL = `${import.meta.env.VITE_USERS_API_URL}`;

export function useUpdateComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const context = useContext(UserContext)
  const refreshUserData = context.GetUserData

  const UpdateComment = (
    teacherUsername,
    studentUsername,
    tradeId,
    feedback
  ) => {
    setLoading(true);
    fetch(`${URL}/teachers/${teacherUsername}/students/${studentUsername}/trades/${tradeId}/feedback`, {
      method: "POST",
      body: JSON.stringify({
        feedback: feedback,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {  
          refreshUserData(false)
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

  return { loading, error, statusCode, UpdateComment };
}

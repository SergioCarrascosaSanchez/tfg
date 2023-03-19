import { UserAvatar } from "../UserAvatar/UserAvatar";

export const TeacherDashboard = ({ data }) => {
  return (
    <>
      <h1>{data.username}</h1>
      {data.studentList.map((student) => (
        <div key={`${student.username}ResumeCard`}>
          <h2>{student.username}</h2>
          <UserAvatar username={student.username} />
          <p>{`Transacciones: ${student.tradeHistory.length}`}</p>
        </div>
      ))}
    </>
  );
};

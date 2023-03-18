import { Avatar } from "@mui/joy";

export const UserAvatar = ({ username }) => {
  const colors = {
    0: "primary",
    1: "danger",
    2: "info",
    3: "success",
    4: "warning",
  };

  const randomColor = () => {
    return colors[username.length % Object.keys(colors).length];
  };

  return (
    <Avatar
      color={randomColor()}
      variant="soft"
      alt={`${username}Avatar`}
      data-testid={`${username}Avatar`}
    >
      {username[0].toUpperCase()}
    </Avatar>
  );
};

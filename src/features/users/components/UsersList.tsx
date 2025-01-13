import { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { fetchUsers, User } from "../usersSlice";
import {
  selectAllUsers,
  selectUsersStatus,
  selectUsersError,
} from "../usersSelectors";

const UsersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const status = useAppSelector(selectUsersStatus);
  const error = useAppSelector(selectUsersError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((user: User) => (
        <li key={user.id}>
          <strong>{user.name}</strong> ({user.username}) - {user.email}
        </li>
      ))}
    </ul>
  );
};

export default UsersList;

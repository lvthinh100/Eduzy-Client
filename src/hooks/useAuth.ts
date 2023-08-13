import { useAppSelector } from "./redux";

export default function useAuth() {
  const user = useAppSelector((state) => state.auth.user);
  return { user };
}

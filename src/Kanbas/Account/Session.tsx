import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Session({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      if (currentUser) {
        dispatch(setCurrentUser(currentUser));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (pending) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

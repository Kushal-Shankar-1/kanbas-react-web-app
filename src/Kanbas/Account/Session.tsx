import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true); // Loading state
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      if (currentUser) {
        dispatch(setCurrentUser(currentUser)); // Update Redux store
      }
    } catch (error) {
      console.error("Error fetching session profile:", error);
    } finally {
      setPending(false); // Allow children to render
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (pending) {
    return <div>Loading...</div>; // Placeholder while fetching
  }

  return children; // Render the application once done
}

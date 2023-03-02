import { AuthError, User, UserResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

function useUserData() {
  const [response, responseSet] = useState<UserResponse | null>()

  const [user, userSet] = useState<User | null>(null)
  const [error, errorSet] = useState<AuthError | null>(null)

  useEffect(() => {
    async function getData() {
      const data = await supabase.auth.getUser();
      if (data?.data?.user) {
        userSet(data.data.user)
      } else {
        errorSet(data.error)
      }
    }
    getData()
  }, [])

  return { user, error };
}

export default useUserData;

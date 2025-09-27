"use server";
import { auth } from "@/lib/auth"


export const signIn = async (email:string, password:string): Promise<{
  success: boolean;
  message: string;
}> => {
    try{
          await auth.api.signInEmail({
        body: {
            email,
            password,
        }
    })
        return {
      success: true,
      message: "Login successful!",
    };
  } catch (err) {
    // Narrow the error type
    if (err instanceof Error) {
      return {
        success: false,
        message: err.message, // string ✅
      };
    }

    return {
      success: false,
      message: "Something went wrong", // fallback ✅
    };
  }
}


export const signUp = async (email: string, password: string, username: string) => {
    try {
       await auth.api.signUpEmail({
        body: {
            email,
            password,
            name: username
        }
    })

        return {
            success: true,
            message: "Signed up successfully."
        }
    } catch (error) {
        const e = error as Error

        return {
            success: false,
            message: e.message || "An unknown error occurred."
        }
    }
}
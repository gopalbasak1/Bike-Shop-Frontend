import { jwtDecode } from "jwt-decode";

// Define the custom type again to ensure TypeScript understands it
interface CustomJwtPayload {
  role?: string; // Add any fields that you expect in the decoded token
}

// Function to decode the token
export const verifyToken = (token: string): CustomJwtPayload | null => {
  try {
    return jwtDecode<CustomJwtPayload>(token); // Decode the token as CustomJwtPayload
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

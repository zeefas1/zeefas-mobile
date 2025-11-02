import axios from "axios";

/**
 * Custom hook to extract error messages from axios errors
 * Handles both string and object error responses
 */
export const useErrorHandler = () => {
  const getErrorMessage = (error: any): string => {
    if (!axios.isAxiosError(error)) {
      return "Something went wrong while processing your request";
    }

    if (!error?.response?.data) {
      return "Something went wrong while processing your request";
    }

    const errorData = error.response.data;

    if (typeof errorData === "string") {
      return errorData;
    }

    if (typeof errorData === "object" && errorData !== null) {
      const data = errorData as any;
      return (
        data.message ||
        data.error ||
        "Something went wrong while processing your request"
      );
    }

    return "Something went wrong while processing your request";
  };

  return { getErrorMessage };
};

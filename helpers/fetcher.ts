import api from "@/helpers/api";
import axios from "axios";

// Utility function to extract error messages from axios errors
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

export const fetcher = async (url: string) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = getErrorMessage(error);
      console.log(message);
      throw new Error(message);
    }
  }
};

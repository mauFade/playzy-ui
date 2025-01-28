import { toast } from "react-hot-toast";

export const showToast = (
  message: string,
  messageType: "success" | "warn" | "error"
) => {
  const messageColors = {
    error: "#d62828",
    warn: "#ffaa00",
    success: "#63f106",
  };

  toast.error(message, {
    duration: 5000,
    style: {
      borderRadius: "8px",
      background: messageColors[messageType],
      color: "#fff",
    },
  });
};

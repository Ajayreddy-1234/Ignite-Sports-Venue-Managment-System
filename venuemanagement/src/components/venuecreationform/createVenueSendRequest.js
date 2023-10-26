import React from "react";

function createVenueSendRequest(formInputs) {
    try {
        const response = fetch("/api/venues", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formInputs),
        });
  
        if (response.ok) {
          const data = response.json();
          console.log("Venue Creation Successful:", data);
          window.location.reload();
          return "success";
        } else {
          const errorData = response.json();
          console.error("Venue Creation failed:", errorData);
          return "error";
        }
    } catch (error) {
      console.error("Venue Creation error:", error);
      return "error";
    }
}
export default createVenueSendRequest;

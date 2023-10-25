import React from "react";

async function createVenueSendRequest(formInputs) {
    try {
        const response = await fetch("/api/venues", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formInputs),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Venue Creation Successful:", data);
          window.location.reload();
        } else {
          const errorData = await response.json();
          console.error("Venue Creation failed:", errorData);
        }
    } catch (error) {
    console.error("Venue Creation error:", error);
    }
}
export default createVenueSendRequest;

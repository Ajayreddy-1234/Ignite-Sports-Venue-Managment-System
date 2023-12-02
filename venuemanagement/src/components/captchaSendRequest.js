import React from "react";

function captchaSendRequest(inputVal, token) {
    try {
        const response = fetch("/api/captcha", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({inputVal, token}),
        });
        
        if (response.ok) {
          const data = response.json();
          console.log("Captcha Success:", data);
          window.location.reload();
          return "success";
        } else {
          const errorData = response.json();
          console.error("Captcha failed:", errorData);
          return "error";
        }
    } catch (error) {
      console.error("Captcha error:", error);
      return "error";
    }
}
export default captchaSendRequest;
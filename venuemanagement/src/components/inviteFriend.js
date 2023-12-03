import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import API_BASE_URL from '../apiConfig';

const InviteFriend = () => {
    const [info, setInfo] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleChange = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        setInfo((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { email } = info;

            const response = await fetch(`${API_BASE_URL}/inviteFriend`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ friendEmail: email }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Successfully sent invite:", data.msg);
                setSuccessMessage("Invite sent successfully. Redirecting to the home page...");
                setShowSuccessMessage(true);

                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            } else {
                const errorData = await response.json();
                console.error("Invite sent failed:", errorData.msg);
            }
        } catch (error) {
            console.error("Error sending invite:", error);
        }
    };

    useEffect(() => {
        if (showSuccessMessage) {
            // Clear the success message and hide it after 3 seconds
            setTimeout(() => {
                setSuccessMessage("");
                setShowSuccessMessage(false);
            }, 10000); // 3000 milliseconds (3 seconds)
        }
    }, [showSuccessMessage]);

    return (
        <div className="inviteFriendBody">
            <div className="inviteFriendContainer">
                <h2>Invite Friend</h2>
                <form className="inviteFriendForm" onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <input
                            name="email"
                            placeholder="Email"
                            value={info.email || ""}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <Button className="inviteFriendButton" buttonStyle="button">
                        Invite Friend
                    </Button>
                </form>
                {showSuccessMessage && (
                    <div className="inviteFriendMessageContainer">
                        <p className="inviteFriendMessage">{successMessage}</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default InviteFriend;

import React from "react";
import { render, fireEvent, waitFor, getByTestId, getAllByText, getByLabelText, getByRole } from "@testing-library/react";
import { screen } from '@testing-library/react';
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

// Mock the useNavigate function
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

test("renders the login form with required elements", () => {
  const { getByText, getByPlaceholderText } = render(<Login />);
  expect(getByPlaceholderText("Email")).toBeInTheDocument();
  expect(getByPlaceholderText("Password")).toBeInTheDocument();
  expect(getByText("Forgot password?")).toBeInTheDocument();
  expect(getByText("Don't have an account?")).toBeInTheDocument();
});

test("submits the form with the correct values", () => {
  const { getByPlaceholderText, getByTestId } = render(<Login />);

  // Fill in the form fields
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "password123" },
  });
  expect(email.value).toBe("test@example.com");
  expect(password.value).toBe("password123");
  // Mock the handleSubmit function
  const handleSubmit = jest.fn();

  // Set the handleSubmit function as the form's onSubmit handler
  const form = getByTestId('loginForm');
  form.onSubmit = handleSubmit;

  // Click the Login button
  const loginButton = getByTestId('loginButton');
  fireEvent.click(loginButton);

  // Verify that handleSubmit was called with the expected values
  waitFor(() => {
    // Verify that handleSubmit was called with the expected values
    expect(console.log).toHaveBeenCalledWith({ email: "test@example.com", password: "password123" });
  });


});
/*test("navigates to the signup page when the 'Sign up' link is clicked", async () => {
  const { getByTestId, history } = render(
      <Login />
  );
//const signUpLink = getByTestId('toSignin');
  // Simulate a click on the "Sign up" link
  fireEvent.click(screen.getByText('Sign up'));

  // Check if the navigation path is correct
  await waitFor(() => expect(location.pathname).toBe("/register"));
});*/

test("submits the form with the correct values", () => {
  const { getByPlaceholderText, getByTestId } = render(<Register />);

  // Fill in the form fields
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Username"), {
    target: { value: "test123" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByPlaceholderText("Phone number"), {
    target: { value: "1231231234" },
  });
  expect(email.value).toBe("test@example.com");
  expect(password.value).toBe("password123");
  expect(username.value).toBe("test123");
  expect(tel.value).toBe("1231231234");
  // Mock the handleSubmit function
  const handleSubmit = jest.fn();

  // Set the handleSubmit function as the form's onSubmit handler
  const form = getByTestId('registerForm');
  form.onSubmit = handleSubmit;

  // Click the Login button
  const loginButton = getByTestId('register');
  fireEvent.click(loginButton);

  // Verify that handleSubmit was called with the expected values
  waitFor(() => {
    // Verify that handleSubmit was called with the expected values
    expect(console.log).toHaveBeenCalledWith({ email: "test@example.com", password: "password123", username: "test123", tel: "1231231234" });
  });
});
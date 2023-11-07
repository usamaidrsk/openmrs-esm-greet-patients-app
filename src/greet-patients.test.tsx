import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GreetPatientsPage from "./greet-patients.component";

// Mock the usePatients function
jest.mock("./utils/use-patients", () => ({
  usePatients: jest.fn(() => ({
        patients: [
          {
            resource: {
              birthDate: "1997-05-21",
              gender: "male",
              name: [
                {
                  family: "Testguy",
                  given: "Joeboy",
                  id: "abc123",
                },
              ],
            }
          }
        ],
    isLoading: false,
  }))
}));

it("renders the GreetPatientsPage component", async () => {
  render(<GreetPatientsPage />);

  const searchField = screen.getByLabelText("Search", {});
  await userEvent.type(searchField, "Joeboy Testguy");
  const greetingTextRegex = /hello\s+Joeboy Testguy!\s+You are currently\s+26 yrs\s+years old!/;

  await waitFor(() => screen.getByText(greetingTextRegex));

  expect(screen.getByText(greetingTextRegex)).toBeInTheDocument();
});

import React from "react";
import { render, screen } from "@testing-library/react";
import Greeter from "./greeter.component";
import {PatientsType} from "../../utils/use-patients";
import {Config} from "../../config-schema";
import {useConfig} from "@openmrs/esm-framework";

const mockUseConfig = useConfig as jest.Mock;

const mockPatients = [
  {
    resource: {
      id: "1",
      name: [
        {
          family: "Testguy",
          given: "Joeboy",
        },
      ],
      birthDate: "1997-05-21",
    },
  },
];

describe("Greeter Component", () => {
  it("renders a message when no patients are provided", () => {
    render(<Greeter patients={[]} />);

    const message = screen.getByTestId("needs-to-search-a-patient");
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent("You need to search a patient first");
  });

  it("renders greetings and patient information when patients are provided", () => {
    render(<Greeter patients={mockPatients as unknown as PatientsType[]} />);

    const greetingTextRegex = /hello\s+Joeboy Testguy!\s+You are currently\s+26 yrs\s+years old!/;

    const greetingText = screen.getByText(greetingTextRegex);
    expect(greetingText).toBeInTheDocument();
  });

  it("renders greetings and patient information when patients are provided with hey depending on config", () => {
    const config: Config = { casualGreeting: true, whoToGreet: ["Joeboy Testguy"] };
    mockUseConfig.mockReturnValue(config);

    render(<Greeter patients={mockPatients as unknown as PatientsType[]} />);

    const greetingTextRegex = /hey\s+Joeboy Testguy!\s+You are currently\s+26 yrs\s+years old!/;

    const greetingText = screen.getByText(greetingTextRegex);
    expect(greetingText).toBeInTheDocument();
  });
});

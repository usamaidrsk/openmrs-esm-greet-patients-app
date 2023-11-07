import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import PatientGetter from "./patient-search.component";

it("It renders the search patient field", async () => {
  const handlePatientSearch = (name: string) => {};
  render(<PatientGetter handlePatientSearch={handlePatientSearch} isLoading={false} />);
  const searchField = screen.getByRole("search", {});

  expect(searchField).toBeInTheDocument();
});

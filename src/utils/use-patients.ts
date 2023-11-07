import useSWR from "swr";
import { fhirBaseUrl, openmrsFetch } from "@openmrs/esm-framework";

export type PatientType = { resource: fhir.Patient };

export function usePatients(query: string) {
  const url = `${fhirBaseUrl}/Patient?name=${query}&_summary=data`;
  const { data, error, isLoading } = useSWR<
    {
      data: { entry: Array<{ resource: fhir.Patient }> };
    },
    Error
  >(query ? url : null, openmrsFetch);

  return {
    patients: data ? data.data.entry : [],
    error: error,
    isLoading,
  };
}

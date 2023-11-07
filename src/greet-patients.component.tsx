import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import Greeter from "./components/greeter/greeter.component";
import PatientGetter from "./components/patient-search/patient-search.component";
import styles from "./greet-patient.scss";
import {useDebounce} from "@openmrs/esm-framework";
import { usePatients} from "./utils/use-patients";

const GreetPatientsPage: React.FC = () => {
  const { t } = useTranslation();
  const [patientName, setPatientName] = useState<string>("")
  const debouncePatientName = useDebounce(patientName)
  const { patients, isLoading } = usePatients(debouncePatientName);

  return (
    <div className={styles.container}>
      <PatientGetter
        isLoading={isLoading}
        handlePatientSearch={(name: string) => {
          setPatientName(name)
        }}
      />
      <Greeter patients={patients || []} />
    </div>
  );
};

export default GreetPatientsPage;

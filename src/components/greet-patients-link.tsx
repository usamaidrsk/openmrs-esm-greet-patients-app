import React from "react";
import { useTranslation } from "react-i18next";
import { ConfigurableLink } from "@openmrs/esm-framework";
const GreetPatientsLink: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ConfigurableLink to={`${window.spaBase}/greet-patients`}>
      {t("greet-patients", "Greet Patients")}
    </ConfigurableLink>
  );
};

export default GreetPatientsLink;

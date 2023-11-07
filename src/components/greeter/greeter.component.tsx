import React from "react";
import {Column, Grid, Search, Tile} from "@carbon/react";
import { Trans, useTranslation } from "react-i18next";
import { useConfig } from "@openmrs/esm-framework";
import { age } from "@openmrs/esm-framework";
import { Config } from "../../config-schema";
import styles from "./greeter.scss";
import {PatientsType} from "../../utils/use-patients";

const Greeter: React.FC<{ patients: PatientsType[]}> = ({ patients }) => {
  const { t } = useTranslation();
  const config: Config = useConfig();

  if(!patients.length) {
    return <Grid fullWidth>
      <Column lg={5}>
        <Tile data-testid="needs-to-search-a-patient"><Trans>Search an existing patient</Trans></Tile>
      </Column>
    </Grid>
  }
  return (
    <Grid fullWidth>
      {patients.map(patient => {
        config.whoToGreet = [`${patient.resource.name[0].given} ${patient.resource.name[0].family}`]
        return (
          <Column lg={10} key={patient.resource.id}>
            <Tile className={styles.tile}>
              {config.casualGreeting ? (
                <Trans key="casualGreeting">hey</Trans>
              ) : (
                <Trans key="formalGreeting">hello</Trans>
              )}{" "}
              {config.whoToGreet.join(", ")}! You are currently {age(patient.resource.birthDate)} years old!
            </Tile>
          </Column>
        )
      })}
    </Grid>
  );
};

export default Greeter;

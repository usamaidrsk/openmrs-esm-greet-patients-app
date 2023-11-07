import React, {useEffect, useState} from "react";
import {Button, InlineLoading, Search, Grid, FlexGrid, Row, Column, Tile} from "@carbon/react";
import { useTranslation } from "react-i18next";
import styles from "./patient-search.scss";

const PatientGetter: React.FC<{ handlePatientSearch: (name: string) => void; isLoading: boolean }> = ({handlePatientSearch, isLoading}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Grid fullWidth>
          <Column lg={5}>
            <Search
              size="md"
              placeholder={t("searchPatient", "Search a patient's name")}
              labelText="Search"
              closeButtonLabelText="Clear search"
              id="search-patient"
              onChange={(event) => {
                handlePatientSearch(event.target.value)
              }}
              onClear={() => {
                handlePatientSearch("")
              }}
            />
          </Column>
          <Column>
            {isLoading ? (
              <InlineLoading
                description={t("loading", "Loading") + "..."}
                role="progressbar"
              />
            ) : null}
          </Column>
      </Grid>
    </div>
  );
}

export default PatientGetter;

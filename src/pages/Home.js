import React from "react";
import SurahCard from "../components/SurahCard";
import IntroSection from "../components/IntroSection";
import { Box } from "@mui/material";

export default function Home({query}) {
  return (
    <>
      <IntroSection />
      <SurahCard query={query} />
    </>
  );
}


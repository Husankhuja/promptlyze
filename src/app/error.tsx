"use client";

import React, { useEffect } from "react";
import { PrimitiveMain as Main, PrimitiveSection as Section } from "@/components/templates";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Main
      className={`

      `}
    >
      <Section
        className={`

        `}
      >
        <h1 className={``}>Something went wrong</h1>
        <p className={``}>{error.message}</p>
        <Button
          onClick={reset}
        >
          Try again
        </Button>
      </Section>
    </Main>
  );
}

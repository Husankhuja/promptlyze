'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      className={`

      `}
    >
      <section
        className={`

        `}
      >
        <h1 className={``}>Something went wrong</h1>
        <p className={``}>{error.message}</p>
        <Button onClick={reset}>Try again</Button>
      </section>
    </main>
  );
}

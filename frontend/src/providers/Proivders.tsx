import React from 'react';
import { Toaster } from 'sonner';
export const Providers: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

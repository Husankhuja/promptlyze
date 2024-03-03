import { constructMetadata, constructViewport } from '@/utils'


import '@/styles/globals.css'

export const meta = constructMetadata()
export const viewport = constructViewport()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <>
          <>{children}</>
        </>
      </body>
    </html>
  );
}

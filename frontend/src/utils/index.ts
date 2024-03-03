import type { Metadata, Viewport } from "next"

export async function constructMetadata({
  image = '/assets/images/logo.png',
  icons = '/assets/svgs/logo.svg',
  description = 'Promptlyze is a cutting-edge application designed to revolutionize the way users analyze content within documents. By allowing users to define specific rules or inputs, Promptlyze leverages the power of large language models to meticulously examine a batch of documents, extracting and gathering valuable insights. Whether you\'re looking to save the results for later review in a CSV file or prefer to immediately view the collected data, Promptlyze offers a flexible and efficient solution for comprehensive document analysis.',
  title = 'Promptlyze',
  noIndex = false,
}: MetadataProps = {}): Promise<Metadata> {
  return {
    title: {
      default: title,
      template: `${title} - %s`,
    },
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [image],
      creator: '@OdnisMike',
    },
    icons: [
      {
        url: icons,
        href: icons,
      }
    ],
    manifest: '/pwa/manifest.json',
    metadataBase: new URL('https://hopper-hacks-2024.vercel.app/'),
    other: { 
      currentYear: new Date().getFullYear(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

export async function constructViewport(): Promise<Viewport> {
  return {
    width: 'device-width',
    height: 'device-height',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    themeColor: '#F1F8FF',
  }
}
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Promptlyze",
        short_name: "Promptlyze",
        theme_color: "#F1F8FF",
        background_color: "#BAC1C8",
        start_url: "/",
        description: "Promptlyze is a cutting-edge application designed to revolutionize the way users analyze content within documents. By allowing users to define specific rules or inputs, Promptlyze leverages the power of large language models to meticulously examine a batch of documents, extracting and gathering valuable insights. Whether you\'re looking to save the results for later review in a CSV file or prefer to immediately view the collected data, Promptlyze offers a flexible and efficient solution for comprehensive document analysis.",
        scope: "/",
        dir: "ltr",
        orientation: "portrait-primary",
        display_override: ["minimal-ui","browser","fullscreen"],
        display: "standalone",
        icons: [
            {
                src: "/assets/svgs/logo.svg",
                type: "image/svg+xml",
                sizes: "any",
                purpose: "any"
            },
            {
                src: "/pwa/android/android-icon-192x192.png",
                type: "image/png",
                sizes: "192x192",
                purpose: "maskable"
            },
            {
                src: "/assets/images/logo.png",
                type: "image/png",
                sizes: "512x512",
                purpose: "maskable"
            }
        ], 
        screenshots: [
            {
                src: "/assets/images/Screenshot.png",
                sizes: "1200x677",
                type: "image/png",
            },
            {
                src: "/assets/images/Screenshot2.png",
                sizes: "637x866",
                type: "image/png",
            }
        ]
    }
}
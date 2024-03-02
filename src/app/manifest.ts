import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "HelpLine",
        short_name: "HelpLine",
        theme_color: "#F1F8FF",
        background_color: "#BAC1C8",
        start_url: "/",
        description: "A web application designed to offer support and assistance to individuals dealing with depression. The platform serves as a safe space for people experiencing emotional distress, providing resources, connecting users with empathetic individuals, and facilitating support to navigate emotional challenges. The aim is to establish a supportive online community that fosters open communication and encourages seeking help for mental health issues.",
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
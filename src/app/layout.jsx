import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/structuredData";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://www.envie-de-chanter.com"),
  title: {
    default: "Envie de Chanter | Chant prénatal et psychophonie",
    template: "%s | Envie de Chanter",
  },
  description:
    "Découvrez le chant prénatal, la psychophonie, les ateliers de chant, les stages et les formations proposés par Envie de Chanter.",
  applicationName: "Envie de Chanter",
  keywords: [
    "chant prénatal",
    "psychophonie",
    "ateliers de chant",
    "stages de chant",
    "formations chant prénatal",
  ],
  authors: [{ name: "Envie de Chanter" }],
  creator: "Envie de Chanter",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Envie de Chanter",
    title: "Envie de Chanter | Chant prénatal et psychophonie",
    description:
      "Découvrez le chant prénatal, la psychophonie, les ateliers de chant, les stages et les formations proposés par Envie de Chanter.",
  },
  twitter: {
    card: "summary",
    title: "Envie de Chanter | Chant prénatal et psychophonie",
    description:
      "Découvrez le chant prénatal, la psychophonie, les ateliers de chant, les stages et les formations proposés par Envie de Chanter.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${nunito.variable} antialiased`}
      >
        <JsonLd data={organizationJsonLd} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

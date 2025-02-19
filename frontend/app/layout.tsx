import "./globals.css";
import Header from "./components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nagamo Suite</title>
      </head>
      <body className="bg-gray-100 text-gray-900">
        <Header />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}


import "./globals.css";
import { robotoFlex } from "./font";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${robotoFlex.className} antialiased dark:bg-zinc-800`}>
            {
              children
            }
      </body>
    </html>
  );
}

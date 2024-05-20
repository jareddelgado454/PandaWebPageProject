import "./globals.css";
import { robotoFlex } from "./font";
import AmplifyContext from "@/contexts/AmplifyContext";
export const metadata = {
  title: "The panda App",
  description: "The Panda is a mobile auto repair service CRM",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="max-h-full">
      <body className={`${robotoFlex.className} dark antialiased dark:bg-zinc-800`}>
            <AmplifyContext>
              {children}
            </AmplifyContext>
      </body>
    </html>
  );
}
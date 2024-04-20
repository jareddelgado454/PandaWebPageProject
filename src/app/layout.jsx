import "./globals.css";
import { robotoFlex } from "./font";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AmplifyContext from "@/contexts/AmplifyContext";
export const metadata = {
  title: "The panda App",
  description: "The Panda is a mobile auto repair service CRM",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="max-h-full">
      <body className={`${robotoFlex.className} antialiased bg-zinc-800 dark:bg-zinc-800`}>
        <ToastContainer />
            <AmplifyContext>
                    {children}
            </AmplifyContext>
      </body>
    </html>
  );
}
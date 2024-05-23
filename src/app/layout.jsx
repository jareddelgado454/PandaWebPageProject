import "./globals.css";
import { robotoFlex } from "./font";
import AmplifyContext from "@/contexts/AmplifyContext";
import ToastContainerComponent from "@/components/toast/ToastContainerComponent";
export const metadata = {
  title: "The panda App",
  description: "The Panda is a mobile auto repair service CRM",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="max-h-full">
      <body className={`${robotoFlex.className} antialiased dark:bg-zinc-800`}>
            <AmplifyContext>
                <ToastContainerComponent />
                {children}
            </AmplifyContext>
      </body>
    </html>
  );
}
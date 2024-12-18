import "./globals.css";
import AmplifyContext from "@/contexts/AmplifyContext";
import ToastContainerComponent from "@/components/toast/ToastContainerComponent";
import { PlaceProvider } from '@/contexts/place/PlaceProvider';
import { MapProvider } from '@/contexts/map/MapProvider';
import { UserProvider } from '@/contexts/user/UserProvider';
import ServiceAssignedProvider from "@/contexts/serviceAssigned/ServiceAssignedProvider";
import { chakra_Petch, jost } from "@/assets/fonts/fonts";
import Script from "next/script"; // Importa el componente de Next.js

export const metadata = {
  title: "The Panda App",
  description: "The Panda is a mobile auto repair service CRM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-darkBlack overflow-y-auto md:max-h-screen">
      <head>
        {/* Google Tag Manager */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-DXCWSGXLLT"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DXCWSGXLLT');
            `,
          }}
        />
      </head>
      <body className={`${chakra_Petch.variable} ${jost.variable} antialiased`}>
        <UserProvider>
          <ServiceAssignedProvider>
            <PlaceProvider>
              <MapProvider>
                <AmplifyContext>
                  <ToastContainerComponent />
                  {children}
                </AmplifyContext>
              </MapProvider>
            </PlaceProvider>
          </ServiceAssignedProvider>
        </UserProvider>
      </body>
    </html>
  );
}
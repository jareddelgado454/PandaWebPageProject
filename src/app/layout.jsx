import "./globals.css";
import AmplifyContext from "@/contexts/AmplifyContext";
import ToastContainerComponent from "@/components/toast/ToastContainerComponent";
import { PlaceProvider } from '@/contexts/place/PlaceProvider';
import { MapProvider } from '@/contexts/map/MapProvider';
import { UserProvider } from '@/contexts/user/UserProvider';
import ServiceAssignedProvider from "@/contexts/serviceAssigned/ServiceAssignedProvider";
export const metadata = {
  title: "The Panda App",
  description: "The Panda is a mobile auto repair service CRM",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-[#27272A] overflow-y-auto md:max-h-screen ">
      <body className={`antialiased`}>
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
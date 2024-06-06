import "./globals.css";
import AmplifyContext from "@/contexts/AmplifyContext";
import ToastContainerComponent from "@/components/toast/ToastContainerComponent";
import { PlaceProvider } from '@/contexts/place/PlaceProvider';
import { MapProvider } from '@/contexts/map/MapProvider';
import { ServiceProvider } from '@/contexts/service/ServiceProvider';
import { UserProvider } from '@/contexts/user/UserProvider';
export const metadata = {
  title: "The panda App",
  description: "The Panda is a mobile auto repair service CRM",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="max-h-full">
      <body className={`antialiased dark:bg-zinc-800`}>
        <UserProvider>
          <PlaceProvider>
            <MapProvider>
              <ServiceProvider>
                <AmplifyContext>
                  <ToastContainerComponent />
                  {children}
                </AmplifyContext>
              </ServiceProvider>
            </MapProvider>
          </PlaceProvider>
        </UserProvider>
      </body>
    </html>
  );
}
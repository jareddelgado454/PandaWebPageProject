import { fetchUserAttributes } from "aws-amplify/auth";
import { useLayoutEffect } from "react";
import { useRouter } from 'next/navigation';

export default function AuthGuard(Component) {
  return function WithAuth(props) {
    const router = useRouter();

    useLayoutEffect(() => {
      const retrieveInfoFromSession = async () => {
        try {
          const info = await fetchUserAttributes();
          if (info) {
            const isAdmin = info['custom:role'] === "admin";
            if (isAdmin) {
              router.replace("/admin-dashboard/");
            } else {
              router.replace("/user/");
            }
          } else {
            router.replace("/");
          }
        } catch (error) {
          console.error("Error fetching user attributes:", error);
          router.replace("/");
        }
      };

      retrieveInfoFromSession();
    }, []);

    return <Component {...props} />;
  };
};

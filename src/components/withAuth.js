import { useEffect } from "react";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const username = localStorage.getItem("username");
      if (!username) {
        router.replace("/login"); // Redirect to the login page
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;

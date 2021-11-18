import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "react-toastify";
import AppContext from "../../storeData/AppContext";
const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const user = localStorage.getItem("user");

      // If there is no access token we redirect to "/" page.
      if (!user) {
        toast.warning("Please Login Frist!");
        Router.push({
          pathname: "/login",
          query: { pathname: Router.pathname },
        });
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;

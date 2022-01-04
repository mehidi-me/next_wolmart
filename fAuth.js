import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const fAuth = async (p, config) => {
  const app = initializeApp(config);

  const auth = getAuth(app);

  const provider =
    p == "g" ? new GoogleAuthProvider() : new FacebookAuthProvider();
  if (p == "f") {
    provider.addScope("public_profile");
  }
  try {
    const result = await signInWithPopup(auth, provider);
    const { email, displayName } = result.user;
    return { name: displayName, provider_id: result.providerId, email };
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default fAuth;

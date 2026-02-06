import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { userAPI } from "./api";

/**
 * Sign up with Google
 * @returns {Promise} - Firebase user and auth token
 */
export const signUpWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Get Firebase ID token
    const idToken = await user.getIdToken();
    
    // Send Firebase token to backend to create/verify user
    const response = await userAPI.firebaseSignup({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      idToken,
    });

    // Store backend token
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("firebaseUid", user.uid);
    }

    return {
      user,
      token: response.data.token,
      userData: response.data.user,
    };
  } catch (error) {
    console.error("Google sign up error:", error);
    throw error;
  }
};

/**
 * Login with Google
 * @returns {Promise} - Firebase user and auth token
 */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Get Firebase ID token
    const idToken = await user.getIdToken();
    
    // Verify with backend
    const response = await userAPI.firebaseLogin({
      uid: user.uid,
      idToken,
    });

    // Store backend token
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("firebaseUid", user.uid);
    }

    return {
      user,
      token: response.data.token,
      userData: response.data.user,
    };
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};

/**
 * Sign up with Email and Password
 * @param {string} email
 * @param {string} password
 * @param {string} name
 * @returns {Promise}
 */
export const signUpWithEmail = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile with name
    await updateProfile(user, { displayName: name });

    // Get Firebase ID token
    const idToken = await user.getIdToken();

    // Send to backend
    const response = await userAPI.firebaseSignup({
      uid: user.uid,
      name,
      email,
      idToken,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("firebaseUid", user.uid);
    }

    return {
      user,
      token: response.data.token,
      userData: response.data.user,
    };
  } catch (error) {
    console.error("Email sign up error:", error);
    throw error;
  }
};

/**
 * Login with Email and Password
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get Firebase ID token
    const idToken = await user.getIdToken();

    // Verify with backend
    const response = await userAPI.firebaseLogin({
      uid: user.uid,
      idToken,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("firebaseUid", user.uid);
    }

    return {
      user,
      token: response.data.token,
      userData: response.data.user,
    };
  } catch (error) {
    console.error("Email login error:", error);
    throw error;
  }
};

/**
 * Logout user
 * @returns {Promise}
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("firebaseUid");
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

/**
 * Get current user
 * @returns {Promise} - Returns current Firebase user or null
 */
export const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

/**
 * Setup Firebase auth state listener
 * @param {Function} callback - Called when auth state changes
 * @returns {Function} - Unsubscribe function
 */
export const setupAuthListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Verify Firebase token (auto-login)
 * @returns {Promise}
 */
export const verifyFirebaseAuth = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return null;
    }

    const idToken = await user.getIdToken();
    
    // Verify with backend
    const response = await userAPI.firebaseLoginAuto({
      uid: user.uid,
      idToken,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("firebaseUid", user.uid);
      return response.data;
    }

    return null;
  } catch (error) {
    console.error("Firebase verification error:", error);
    return null;
  }
};

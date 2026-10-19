import { useLogto } from "@logto/vue";
import { useRuntimeConfig } from "nuxt/app";

let logto: ReturnType<typeof useLogto> | null = null;
let runtimeConfig: ReturnType<typeof useRuntimeConfig>;

export async function setupAuth() {
  runtimeConfig = useRuntimeConfig();
  if (runtimeConfig.public.endpoint && runtimeConfig.public.appId) {
    try {
      logto = useLogto();
    } catch {
      logto = null;
    }
  }
}

export async function signIn(callback?: string) {
  callback && setSignInCallback(callback);
  if (logto) {
    logto.signIn(runtimeConfig.public.signInRedirectURI);
  } else {
    if (typeof window !== "undefined") {
      localStorage.setItem("earthworm_auth", "true");
      window.location.reload();
    }
  }
}

export function signOut() {
  if (logto) {
    return logto.signOut(runtimeConfig.public.signOutRedirectURI);
  } else {
    if (typeof window !== "undefined") {
      localStorage.removeItem("earthworm_auth");
      window.location.reload();
    }
  }
}

export function isAuthenticated() {
  if (logto) {
    return logto.isAuthenticated.value;
  }
  if (typeof window !== "undefined") {
    return localStorage.getItem("earthworm_auth") === "true";
  }
  return false;
}

export async function getToken() {
  if (logto) {
    const accessToken = await logto.getAccessToken(runtimeConfig.public.backendEndpoint);
    return accessToken;
  }
  return "mock-token";
}

export function fetchUserInfo() {
  if (logto) {
    return logto.fetchUserInfo();
  }
  return Promise.resolve({
    sub: "earthworm_guest",
    name: "Earthworm Learner",
    picture: "/logo.png",
  });
}

export function getSignInCallback() {
  let callback = sessionStorage.getItem("callback");
  if (callback) {
    sessionStorage.removeItem("callback");
    return callback;
  } else {
    return "/";
  }
}

function setSignInCallback(callback: string) {
  sessionStorage.setItem("callback", callback);
}

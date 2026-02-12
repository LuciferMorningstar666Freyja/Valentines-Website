import { useState } from "react";
import PasswordScreen from "./components/PasswordScreen";
import MainSite from "./components/MainSite";

export function App() {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <PasswordScreen onUnlock={() => setUnlocked(true)} />;
  }

  return <MainSite />;
}

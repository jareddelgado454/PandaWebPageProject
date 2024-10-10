import React, { useState } from "react";
import { Button } from "@nextui-org/react";


const AccessWithPassword = ({ email }) => {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Lógica para manejar el login con el email y contraseña
    console.log("Logging in with:", email, password);
  };

  return (
    <div>
      <p className="text-white mb-4">Enter password for {email}</p>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 text-white bg-zinc-950/70 rounded-lg border-zinc-600"
      />
      <Button
        className="w-full flex items-center justify-center bg-zinc-200 text-black font-jost font-semibold text-[16px] py-4 mt-4"
        onPress={handleLogin}
      >
        Log in
      </Button>
    </div>
  );
};

export default AccessWithPassword;
import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import LockIcon from "@mui/icons-material/Lock";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function StartingLoader() {
  return (
    <div className="flex w-screen h-screen justify-center items-center flex-col text-[#606770]">
      <WhatsAppIcon fontSize="large" className="scale-150 mb-10" />
      <Box sx={{ width: "275px" }}>
        <LinearProgress color="success" />
      </Box>
      <h1 className="mt-8 text-white text-lg mb-2">Whatsapp</h1>
      <div className="flex space-x-2 text-sm">
        <LockIcon fontSize="small" />
        <p>End-to-end encrypted</p>
      </div>
    </div>
  );
}

export default StartingLoader;

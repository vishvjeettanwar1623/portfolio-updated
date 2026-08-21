"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, ExternalLink, Maximize2, ShieldCheck, Cpu, Code2, Terminal, Layers } from "lucide-react";
import { useSound } from "@/context/SoundContext";

interface ProjectSandboxProps {
  projectId: string;
  projectName: string;
  domainUrl: string;
  liveUrl?: string;
  category: string;
}

export function ProjectLiveSandbox({
  projectId,
  projectName,
  domainUrl,
  liveUrl,
  category,
}: ProjectSandboxProps) {
  const { playSound } = useSound();
  const [activeTab, setActiveTab] = useState<"sandbox" | "state" | "console">("sandbox");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([
    "Ready: Web3 sandbox environment initialized",
    "Connected to local EVM testnet node (chainId: 31337)",
  ]);

  // Interactive state variables per project
  const [walletConnected, setWalletConnected] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [contractStatus, setContractStatus] = useState<"IDLE" | "PENDING" | "CONFIRMED">("IDLE");

  const runSimulation = (action: string) => {
    playSound("click");
    setIsSimulating(true);
    setContractStatus("PENDING");

    setSimulatedLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] Executing: ${action}`,
      ...prev,
    ]);

    setTimeout(() => {
      playSound("switch");
      setIsSimulating(false);
      setContractStatus("CONFIRMED");
      setSimulatedLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] ✔ Block #19482701 verified on-chain (Gas: 42,190)`,
        ...prev,
      ]);
    }, 1200);
  };

  const resetSandbox = () => {
    playSound("click");
    setWalletConnected(false);
    setInputVal("");
    setContractStatus("IDLE");
    setSimulatedLogs([
      "Ready: Web3 sandbox environment initialized",
      "Connected to local EVM testnet node (chainId: 31337)",
    ]);
  };

  return (
    <div className="relative w-full rounded-2xl bg-card border border-foreground/20 shadow-2xl overflow-hidden font-mono select-none">
      {/* Top Browser Title Bar & Navigation Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-foreground/5 border-b border-foreground/10 text-xs">
        {/* macOS Window Controls */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
        </div>

        {/* Address Bar */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-background/80 border border-foreground/15 text-[11px] text-foreground/80 max-w-xs truncate shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-foreground/60 flex-shrink-0" />
          <span className="truncate">https://{domainUrl}</span>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 bg-foreground/5 p-0.5 rounded-lg border border-foreground/10">
          <button
            type="button"
            onClick={() => {
              setActiveTab("sandbox");
              playSound("hover");
            }}
            className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold transition-all cursor-pointer ${
              activeTab === "sandbox"
                ? "bg-foreground text-background shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Live UI
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("console");
              playSound("hover");
            }}
            className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold transition-all cursor-pointer ${
              activeTab === "console"
                ? "bg-foreground text-background shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Logs
          </button>
        </div>
      </div>

      {/* Main Sandbox Canvas Stage */}
      <div className="relative min-h-[290px] sm:min-h-[330px] p-5 sm:p-6 bg-background/60 backdrop-blur-md flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {activeTab === "sandbox" ? (
            <motion.div
              key="sandbox"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Sandbox Header Status */}
              <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                    {projectName} Zero-Leave Sandbox
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      contractStatus === "CONFIRMED"
                        ? "bg-foreground text-background"
                        : contractStatus === "PENDING"
                        ? "bg-foreground/20 text-foreground animate-pulse"
                        : "bg-foreground/10 text-muted-foreground"
                    }`}
                  >
                    {contractStatus === "CONFIRMED"
                      ? "SETTLED ON-CHAIN"
                      : contractStatus === "PENDING"
                      ? "MINING TRANSACTION..."
                      : "STANDBY"}
                  </span>
                </div>
              </div>

              {/* Interactive In-Place Demo Controls */}
              <div className="p-4 rounded-xl bg-foreground/5 border border-foreground/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-sans">
                    {projectId === "eternal"
                      ? "Test algorithmic code validator node:"
                      : projectId === "data-roots"
                      ? "Test AES-GCM encrypted P2P data monetization:"
                      : projectId === "promp-ip"
                      ? "Test Story Protocol programmable IP minting:"
                      : "Test live protocol state execution:"}
                  </span>

                  {/* Connect Wallet Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setWalletConnected(!walletConnected);
                      playSound("switch");
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                      walletConnected
                        ? "bg-foreground text-background"
                        : "bg-foreground/10 text-foreground hover:bg-foreground/20"
                    }`}
                  >
                    {walletConnected ? "0x7F2B...4A91" : "Connect Mock Wallet"}
                  </button>
                </div>

                {/* Simulated Input / Parameter */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder={
                      projectId === "eternal"
                        ? "solve(uint256[] arr) -> return quicksort(arr)"
                        : projectId === "data-roots"
                        ? "encrypt_payload(sensor_telemetry_2024.json)"
                        : "mint_ip_asset('GPT-4o Reasoning Pipeline v2')"
                    }
                    className="flex-1 px-3 py-2 rounded-lg bg-background border border-foreground/15 text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/40"
                  />

                  <button
                    type="button"
                    disabled={isSimulating}
                    onClick={() =>
                      runSimulation(
                        inputVal ||
                          (projectId === "eternal"
                            ? "submit_solution(arr)"
                            : "execute_protocol_tx()")
                      )
                    }
                    className="px-4 py-2 rounded-lg bg-foreground text-background text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:opacity-90 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run</span>
                  </button>
                </div>
              </div>

              {/* Verified Result Output Window */}
              <div className="p-3 rounded-lg bg-foreground/[0.03] border border-foreground/10 text-[11px] space-y-1">
                <div className="flex items-center justify-between text-muted-foreground text-[10px]">
                  <span>TRANSACTION METADATA</span>
                  <span>EVM GAS: 42,190</span>
                </div>
                <div className="text-foreground font-mono truncate">
                  HASH: 0x9f4a8b2c1d3e5f7a0b2c4d6e8f1a3b5c7d9e1f3a
                </div>
              </div>
            </motion.div>
          ) : (
            /* Live Terminal Logs Tab */
            <motion.div
              key="console"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between border-b border-foreground/10 pb-2 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Terminal className="w-3.5 h-3.5 text-foreground" />
                  <span>Execution Output Stream</span>
                </div>
                <button
                  type="button"
                  onClick={resetSandbox}
                  className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </div>

              <div className="space-y-1.5 max-h-[190px] overflow-y-auto pr-2 text-[11px]">
                {simulatedLogs.map((log, i) => (
                  <div
                    key={i}
                    className={`font-mono leading-relaxed ${
                      i === 0 ? "text-foreground font-bold" : "text-muted-foreground"
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Sandbox Toolbar */}
        <div className="pt-3 border-t border-foreground/10 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={resetSandbox}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-[11px] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset State</span>
          </button>

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-foreground font-bold text-[11px] hover:underline"
            >
              <span>Open in Full Screen</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectLiveSandbox;

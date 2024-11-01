import os from "os";

export const getSystemInfo = async (): Promise<{
  ip: string;
  nodeVersion: string;
  platform: NodeJS.Platform;
  hostname: string;
  timezone: string;
}> => {
  const ip = await fetch("https://api.ipify.org")
    .then((response) => (response.ok ? response.text() : "Unavailable"))
    .catch(() => "Unavailable");

  return {
    ip,
    nodeVersion: process.version,
    platform: process.platform,
    hostname: os.hostname(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};

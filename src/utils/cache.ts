import redisClient from "@/configs/redis";

export const setCache = async (
  key: string,
  value: any,
  ttl?: number
): Promise<void> => {
  const data = JSON.stringify(value);
  if (ttl !== undefined) {
    await redisClient.set(key, data, "EX", ttl);
  } else {
    await redisClient.set(key, data);
  }
};

export const getCache = async <T>(key: string): Promise<T | string | null> => {
  const data = await redisClient.get(key);

  if (!data || data === "null") {
    return null;
  }

  try {
    const parsedData = JSON.parse(data);
    if (parsedData && typeof parsedData === "object") {
      return parsedData as T;
    }
  } catch (err) {
    console.log(`Error parsing cache data: ${err.message}`);
  }
  return data;
};

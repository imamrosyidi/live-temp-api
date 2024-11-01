export const generateDummyTemperature = () => {
  const value = Math.floor(Math.random() * 15) + 20;
  const created_at = new Date().toISOString();
  return { value, created_at };
};

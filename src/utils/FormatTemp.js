export const getSourceF = (tempSource) => {
  const isObject = typeof tempSource === "object" && tempSource !== null;
  return Number(isObject ? tempSource.F ?? tempSource.C ?? 0 : tempSource ?? 0);
};

export const toCelsius = (fahrenheit) => ((Number(fahrenheit) - 32) * 5) / 9;

export const formatTemp = (tempSource, unit = "F", decimals = 1) => {
  const sourceF = getSourceF(tempSource);
  const raw = unit === "C" ? toCelsius(sourceF) : sourceF;
  return Number.isFinite(raw) ? raw.toFixed(decimals) : String(raw);
};

export const  parseQueryParams = (params: Record<string, string | string[] | undefined> | null) => {
  if (!params) return {};

  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      result[key] = value.map(v => {
        const num = Number(v);
        return isNaN(num) ? v : num;
      });
    } else if (value !== undefined) {
      const num = Number(value);
      result[key] = isNaN(num) ? value : num;
    }
  }
  return result;
}

export const formatDate = (ms: string): string => {
  const date = new Date(+ms * 1000);
  return date.toLocaleString();
}
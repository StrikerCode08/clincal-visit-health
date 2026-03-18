export default function getErrorMessage(err) {
  if (err?.response?.data?.error) {
    return String(err.response.data.error);
  }
  if (err?.response?.data?.message) {
    return String(err.response.data.message);
  }
  if (err?.message) {
    return String(err.message);
  }
  return "Something went wrong";
}

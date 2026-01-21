export function appendFormData(
  formData: FormData,
  data: Record<
    string,
    string | number | boolean | File | File[] | string[] | null | undefined
  >
): void {
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        // Handle array fields like gallery (Files) and trackIds (strings)
        value.forEach((item, index) => {
          if (item instanceof File) {
            formData.append(`${key}[${index}]`, item);
          } else {
            // Handle string arrays (like trackIds)
            formData.append(`${key}[${index}]`, String(item));
          }
        });
      } else {
        formData.append(key, String(value));
      }
    }
  });
}

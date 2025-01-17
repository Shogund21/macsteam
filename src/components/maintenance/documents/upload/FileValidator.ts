export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const validateFiles = (files: FileList): { valid: boolean; message?: string } => {
  if (!files?.length) {
    return { valid: false, message: "No files selected" };
  }

  const invalidFiles = Array.from(files).filter(
    (file) => !ALLOWED_FILE_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE
  );

  if (invalidFiles.length > 0) {
    return {
      valid: false,
      message: "Please ensure all files are of the correct type and under 10MB",
    };
  }

  return { valid: true };
};
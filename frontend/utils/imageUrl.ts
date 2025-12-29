/**
 * Utility function to get full image URL from backend
 * @param imagePath - Relative path from backend (e.g., "/uploads/user_1_avatar.webp")
 * @returns Full URL to access the image
 */
export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) {
    return ""; // Return empty string or default placeholder image
  }

  // Remove leading slash if present to avoid double slashes
  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;

  // Get backend base URL (without /api/v1 or /api)
  let backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  
  if (!backendBaseUrl) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api/v1";
    // Remove /api/v1 or /api from the end
    backendBaseUrl = backendUrl.replace(/\/api\/v1$/, "").replace(/\/api$/, "");
    // If empty after removing, use default
    if (!backendBaseUrl || backendBaseUrl === backendUrl) {
      backendBaseUrl = "http://localhost:8000";
    }
  }

  // Construct full URL
  return `${backendBaseUrl}/${cleanPath}`;
};


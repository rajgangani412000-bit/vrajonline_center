import crypto from "crypto";

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required for Cloudinary uploads.`);
  return value;
}

function sign(params: Record<string, string | number>, secret: string) {
  const payload = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return crypto.createHash("sha1").update(payload + secret).digest("hex");
}

export async function uploadToCloudinary(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image uploads are allowed.");
  }
  if (file.size > 3 * 1024 * 1024) {
    throw new Error("Image must be 3 MB or smaller.");
  }

  const cloudName = requiredEnv("CLOUDINARY_CLOUD_NAME");
  const apiKey = requiredEnv("CLOUDINARY_API_KEY");
  const apiSecret = requiredEnv("CLOUDINARY_API_SECRET");
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "vraj-online-center";
  const timestamp = Math.floor(Date.now() / 1000);
  const params = { folder, timestamp };
  const formData = new FormData();

  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("folder", folder);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", sign(params, apiSecret));

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Cloudinary upload failed.");
  }

  const payload = (await response.json()) as { secure_url: string; public_id: string; width: number; height: number };
  return payload;
}

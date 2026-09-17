/* ───────────────────────────────────────────────
   CMS Upload — upload foto & video langsung dari browser ke
   Cloudinary (paket gratis, tanpa backend) via unsigned preset.
   ─────────────────────────────────────────────── */

export type CloudSettings = {
  cloudName: string;
  preset: string;
  folder: string;
};

export type UploadResult = {
  url: string;
  publicId: string;
  resourceType: string;
  /** Thumbnail otomatis (khusus video). */
  thumbnailUrl?: string;
};

const CLOUD_KEY = "portfolio-cms-cloud-v1";
const MAX_BYTES = 100 * 1024 * 1024; // batas paket gratis Cloudinary per file

export function getCloudSettings(): CloudSettings {
  try {
    const raw = localStorage.getItem(CLOUD_KEY);
    if (raw) {
      const p = JSON.parse(raw) as Partial<CloudSettings>;
      return {
        cloudName: (p.cloudName ?? "").trim(),
        preset: (p.preset ?? "").trim(),
        folder: (p.folder ?? "").trim(),
      };
    }
  } catch {
    /* abaikan */
  }
  return { cloudName: "", preset: "", folder: "" };
}

export function saveCloudSettings(s: CloudSettings): void {
  try {
    localStorage.setItem(
      CLOUD_KEY,
      JSON.stringify({
        cloudName: s.cloudName.trim(),
        preset: s.preset.trim(),
        folder: s.folder.trim(),
      })
    );
  } catch {
    /* abaikan */
  }
}

export function isCloudConfigured(): boolean {
  const s = getCloudSettings();
  return s.cloudName.length > 0 && s.preset.length > 0;
}

/** Sisipkan optimasi otomatis (format & kualitas) ke URL gambar Cloudinary. */
function optimizeImageUrl(url: string): string {
  return url.replace("/upload/", "/upload/f_auto,q_auto/");
}

/**
 * Upload satu file ke Cloudinary.
 * Memakai XMLHttpRequest agar progres upload bisa ditampilkan.
 */
export function uploadFile(
  file: File,
  onProgress?: (percent: number) => void
): Promise<UploadResult> {
  const { cloudName, preset, folder } = getCloudSettings();
  if (!cloudName || !preset) {
    return Promise.reject(
      new Error("Cloudinary belum dikonfigurasi. Isi dulu di tab Pengaturan.")
    );
  }
  if (file.size > MAX_BYTES) {
    return Promise.reject(
      new Error("Ukuran file melebihi 100MB (batas paket gratis Cloudinary).")
    );
  }

  const isVideo = file.type.startsWith("video/");
  const endpoint = `https://api.cloudinary.com/v1_1/${encodeURIComponent(
    cloudName
  )}/${isVideo ? "video" : "image"}/upload`;

  return new Promise<UploadResult>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && e.total > 0) {
        onProgress?.(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () => {
      try {
        const json = JSON.parse(xhr.responseText) as {
          secure_url?: string;
          public_id?: string;
          resource_type?: string;
          error?: { message?: string };
        };
        if (xhr.status >= 200 && xhr.status < 300 && json.secure_url) {
          const resourceType = json.resource_type ?? (isVideo ? "video" : "image");
          const result: UploadResult = {
            url:
              resourceType === "image"
                ? optimizeImageUrl(json.secure_url)
                : json.secure_url,
            publicId: json.public_id ?? "",
            resourceType,
          };
          if (resourceType === "video" && json.public_id) {
            // Thumbnail frame pertama dari video
            result.thumbnailUrl = `https://res.cloudinary.com/${cloudName}/video/upload/so_0/${json.public_id}.jpg`;
          }
          onProgress?.(100);
          resolve(result);
        } else {
          reject(new Error(json?.error?.message || `Upload gagal (kode ${xhr.status}).`));
        }
      } catch (err) {
        reject(err instanceof Error ? err : new Error("Upload gagal."));
      }
    };
    xhr.onerror = () => reject(new Error("Koneksi gagal saat mengupload."));
    xhr.onabort = () => reject(new Error("Upload dibatalkan."));

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", preset);
    if (folder) form.append("folder", folder);
    xhr.send(form);
  });
}

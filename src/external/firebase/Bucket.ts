import type IBucket from "./interfaces/IBucket";
import admin from "~/external/firebase/admin";

const bucket = admin.storage().bucket();

export default class Bucket implements IBucket {
  async getUrlFile(fileHash: string, expiration: number): Promise<string> {
    const expirationDate: Date = new Date();
    expirationDate.setHours(expirationDate.getHours() + expiration);

    const [fileUrl] = await bucket
      .file(fileHash)
      .getSignedUrl({ action: "read", expires: expirationDate });

    return fileUrl;
  }
}

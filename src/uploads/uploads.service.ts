import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';

export type UploadCategory = 'images' | 'videos';

@Injectable()
export class UploadsService {
  private blobService?: BlobServiceClient;

  private getBlobService(): BlobServiceClient {
    if (this.blobService) return this.blobService;
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      throw new InternalServerErrorException(
        'AZURE_STORAGE_CONNECTION_STRING is not set',
      );
    }
    this.blobService = BlobServiceClient.fromConnectionString(connectionString);
    return this.blobService;
  }

  async uploadBuffer(
    category: UploadCategory,
    fileName: string,
    buffer: Buffer,
    contentType: string,
  ): Promise<string> {
    try {
      const container = this.getBlobService().getContainerClient(category);
      const blob = container.getBlockBlobClient(fileName);
      await blob.uploadData(buffer, {
        blobHTTPHeaders: { blobContentType: contentType },
      });
      return blob.url;
    } catch (err) {
      throw new InternalServerErrorException('Upload failed');
    }
  }
}

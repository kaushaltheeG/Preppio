import { drive_v3, auth } from '@googleapis/drive';
import { docs_v1 } from '@googleapis/docs';

class GoogleDriveService {
  private driveV3: drive_v3.Drive;
  private docsV1: docs_v1.Docs;

  constructor(driveV3: drive_v3.Drive, docsV1: docs_v1.Docs) {
    this.driveV3 = driveV3;
    this.docsV1 = docsV1;
  }

  async createGoogleDoc(title: string): Promise<drive_v3.Schema$File> {
    const doc = await this.driveV3.files.create({
      requestBody: {
        name: title,
        mimeType: 'application/vnd.google-apps.document',
      }
    });
    return doc.data;
  }

  async insertGoogleDoc(newDoc: drive_v3.Schema$File, htmlContent: string): Promise<string> {
    // await this.docsV1.documents.batchUpdate({
    //   documentId: newDoc.id,
    //   requestBody: {
    //     requests: [
    //       {
    //         insertText: {
    //           text: htmlContent,
    //           location: {
    //             index: 1
    //           }
    //         }
    //       }
    //     ]
    //   }
    // });
    // return newDoc.data.documentId;
  }
}

export default GoogleDriveService;

import { drive_v3, auth, drive } from '@googleapis/drive';
import { docs_v1, docs } from '@googleapis/docs';
import { assert } from 'console';
import IGoogleDriveService, {
  ICreateClientObject,
  ICreateGoogleDocParams,
  IInsertGoogleDocParams,
  IInsertGoogleDocObject,
} from '../interfaces/services/IGoogleService';

class GoogleDriveService implements IGoogleDriveService {
  private driveV3: drive_v3.Drive;
  private docsV1: docs_v1.Docs;

  constructor(driveV3: drive_v3.Drive, docsV1: docs_v1.Docs) {
    this.driveV3 = driveV3;
    this.docsV1 = docsV1;
  }

  async createGoogleDoc(params: ICreateGoogleDocParams): Promise<drive_v3.Schema$File> {
    const doc = await this.driveV3.files.create({
      requestBody: {
        name: params.title,
        mimeType: 'application/vnd.google-apps.document',
      }
    });
    return doc.data;
  }

  async insertGoogleDoc(params: IInsertGoogleDocParams): Promise<IInsertGoogleDocObject> {
    const { newDoc, htmlContent } = params;
    assert(newDoc.id, 'document id was not found');

    await this.docsV1.documents.batchUpdate({
      documentId: newDoc.id!,
      requestBody: {
        requests: [
          {
            insertText: {
              text: htmlContent,
              location: {
                index: 1
              }
            }
          }
        ]
      }
    });

    return {
      url: `https://docs.google.com/document/d/${newDoc.id}`,
      documentId: newDoc.id!
    };
  }
}

class GoogleDriveServiceFactory {
  static createClient(accessToken: string): ICreateClientObject {
    const clientAuth = new auth.OAuth2();
    clientAuth.setCredentials({ access_token: accessToken });

    const driveV3Client = drive({ version: 'v3', auth: clientAuth });
    const docsV1Client = docs({ version: 'v1', auth: clientAuth });
    return { driveV3Client, docsV1Client };
  }

  static createGoogleDriveService(accessToken: string): IGoogleDriveService {
    const { driveV3Client, docsV1Client } = this.createClient(accessToken);
    return new GoogleDriveService(driveV3Client, docsV1Client);
  }
}

export default GoogleDriveServiceFactory;

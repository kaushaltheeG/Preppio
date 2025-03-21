import { drive_v3, auth, drive } from '@googleapis/drive';
import { docs_v1, docs } from '@googleapis/docs';
import { assert } from 'console';
import IGoogleDriveService, {
  ICreateClientObject,
  ICreateGoogleDocParams,
  IInsertGoogleDocParams,
  IInsertGoogleDocObject,
} from '../interfaces/services/IGoogleService';
import { convert, HtmlToTextOptions } from 'html-to-text';

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
    const { newDoc } = params;
    const htmlContent = this.cleanHtml(params.htmlContent);
    assert(newDoc.id, 'document id was not found');
    const options = this.getConverterOptions();

    const text = convert(htmlContent, options);
  
    await this.docsV1.documents.batchUpdate({
      documentId: newDoc.id!,
      requestBody: {
        requests: [
          {
            insertText: {
              text,
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
      documentId: newDoc.id!,
      text,
      htmlContent
    };
  }

  private cleanHtml(htmlContent: string): string {
    return htmlContent
      .replace(/\n\s*/g, '')
      .trim();
      // .replace(/>\s+</g, '><')
  }

  private getConverterOptions(): HtmlToTextOptions {
    return {
      preserveNewlines: true,
      wordwrap: false,
      selectors: [
        // { selector: 'article', format: 'blockquote' },
        // { selector: 'section', format: 'blockquote' },
        { selector: 'p', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
        { selector: 'br', format: 'lineBreak' },
        { selector: 'h1', format: 'heading' },
        { selector: 'h2', format: 'heading' },
        { selector: 'h3', format: 'heading' },
        { selector: 'strong', format: 'blockText' },
        { selector: 'u', format: 'blockText' },
        { selector: 'ul', options: { itemPrefix: ' • ' } },
      ],
      formatters: {
        'blockText': function(elem, walk, builder) {
          builder.openBlock();
          walk(elem.children, builder);
          builder.closeBlock();
        },
        'heading': function(elem, walk, builder) {
          builder.openBlock();
          builder.addInline('** ');
          walk(elem.children, builder);
          builder.addInline(' **');
          builder.closeBlock();
        },
        'lineBreak': function(elem, walk, builder) {
          builder.addLineBreak();
        }
      }
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

import { drive_v3, auth, drive } from '@googleapis/drive';
import { docs_v1, docs } from '@googleapis/docs';
import { assert } from 'console';
import IGoogleDriveService, {
  ICreateClientObject,
  ICreateGoogleDocParams,
  IInsertGoogleDocParams,
  IInsertGoogleDocObject,
  ICreateGoogleDocRequestObject,
  ICreateGoogleDocBackgroundRequestObject,
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
    const { newDoc, interviewContent } = params;
    assert(newDoc.id, 'document id was not found');
    const { company, jobTitle, interviewType, interviewerPosition, questions, analysis } = interviewContent;

    let currentIndex = 1;
    
    const titleRequestObject = this.createTitleRequestObject(company, currentIndex);
    currentIndex = titleRequestObject.newIndex;
    const backgroundRequestObject = this.createBackgroundRequestObject({ company, jobTitle, interviewType, interviewerPosition, currentIndex });
    const requests = [ ...titleRequestObject.requests, ...backgroundRequestObject.requests,
      // Questions
      // ...interviewContent.questions.flatMap((q, idx) => {
      //   const questionText = `${q.question}\n`;
      //   const metadataText = `Type: ${q.type}\n` +
      //                       `Difficulty: ${q.difficulty}\n` +
      //                       `Topic: ${q.topic}\n` +
      //                       `Key Points:\n` +
      //                       `${q.keyPoints.map(point => `${point}\n`).join('')}\n\n`;
        
      //   const startIndex = currentIndex;
      //   currentIndex += questionText.length + metadataText.length;
        
      //   return [
      //     {
      //       insertText: {
      //         text: questionText,
      //         location: { index: startIndex }
      //       }
      //     },
      //     {
      //       createParagraphBullets: {
      //         range: {
      //           startIndex: startIndex,
      //           endIndex: startIndex + questionText.length - 1
      //         },
      //         bulletPreset: 'NUMBERED_DECIMAL_NESTED'
      //       }
      //     },
      //     {
      //       updateTextStyle: {
      //         range: {
      //           startIndex: startIndex,
      //           endIndex: startIndex + questionText.length - 1
      //         },
      //         textStyle: { bold: true },
      //         fields: 'bold'
      //       }
      //     },
      //     {
      //       insertText: {
      //         text: metadataText,
      //         location: { index: startIndex + questionText.length }
      //       }
      //     },
      //     // {
      //     //   createParagraphBullets: {
      //     //     range: {
      //     //       startIndex: startIndex + questionText.length,
      //     //       endIndex: startIndex + questionText.length + metadataText.length - 1
      //     //     },
      //     //     bulletPreset: 'BULLET_DISC_CIRCLE_SQUARE'
      //     //   }
      //     // },
      //     {
      //       updateParagraphStyle: {
      //         range: {
      //           startIndex: startIndex,
      //           endIndex: startIndex + questionText.length + metadataText.length - 1
      //         },
      //         paragraphStyle: { namedStyleType: 'NORMAL_TEXT' },
      //         fields: 'namedStyleType'
      //       }
      //     }
      //   ];
      // }),

      // // Analysis
      // {
      //   insertText: {
      //     text: `\nAnalysis:\n` +
      //           `Strength Areas: ${interviewContent.analysis.strengthAreas}\n` +
      //           `Gap Areas: ${interviewContent.analysis.gapAreas}\n` +
      //           `Recommended Focus: ${interviewContent.analysis.recommendedFocus}\n`,
      //     location: { index: currentIndex }
      //   }
      // }
    ];

    await this.docsV1.documents.batchUpdate({
      documentId: newDoc.id!,
      requestBody: { requests }
    });

    return {
      url: `https://docs.google.com/document/d/${newDoc.id}`,
      documentId: newDoc.id!,
    };
  }

  private createTitleRequestObject(company: string, currentIndex: number): ICreateGoogleDocRequestObject {
    const titleText = `Potential Interview Questions for ${company}\n`;
    return {
      requests: [
        { 
            insertText: {
            text: titleText,
            location: { index: currentIndex }
          }
        },
        {
          updateParagraphStyle: {
            range: { 
              startIndex: currentIndex, 
              endIndex: currentIndex + titleText.length - 1
            },
            paragraphStyle: { namedStyleType: 'HEADING_1' },
            fields: 'namedStyleType'
          }
        },
      ],
      newIndex: currentIndex + titleText.length
    }
  }

  private createBackgroundRequestObject(params: ICreateGoogleDocBackgroundRequestObject): ICreateGoogleDocRequestObject {
    let { currentIndex } = params;
    const { company, jobTitle, interviewType, interviewerPosition } = params;
    const backgroundTextArray = [
      ['Company', `: ${company}\n`],
      ['Job Title', `: ${jobTitle}\n`],
      ['Interview Type', `: ${interviewType}\n`],
      ['Interviewer Position', `: ${interviewerPosition}\n\n`]
    ];

    const requests = [];
    for (let [companyLabel, companyValue] of backgroundTextArray) {
      requests.push(
        {
          insertText: {
            text: `${companyLabel}${companyValue}`,
            location: { index: currentIndex }
          }
        },
        {
          updateParagraphStyle: {
            range: { 
              startIndex: currentIndex,
              endIndex: currentIndex + companyLabel.length + companyValue.length
            },
            paragraphStyle: { namedStyleType: 'HEADING_5' },
            fields: 'namedStyleType'
          }
        },
        {
          updateTextStyle: {
            range: {
              startIndex: currentIndex,
              endIndex: currentIndex + companyLabel.length
            },
            textStyle: {
              underline: true
            },
            fields: 'underline'
          }
        }
      );
      currentIndex += companyLabel.length + companyValue.length;
    }

    return {
      requests,
      newIndex: currentIndex
    };
  }

  private createQuestionRequestObject(questionText: string, metadataText: string, currentIndex: number): ICreateGoogleDocRequestObject {
    return {
      requests: [
          {
            insertText: {
            text: questionText,
            location: { index: currentIndex }
          }
        },
      ],
      newIndex: currentIndex + questionText.length + metadataText.length
    };
  }
  
  private createAnalysisRequestObject(analysisText: string, currentIndex: number): ICreateGoogleDocRequestObject {
    return {
      requests: [
          {
            insertText: {
              text: analysisText,
            location: { index: currentIndex }
          }
        },
      ],
      newIndex: currentIndex + analysisText.length
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

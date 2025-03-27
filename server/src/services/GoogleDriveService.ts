import { drive_v3, auth, drive } from '@googleapis/drive';
import { docs_v1, docs } from '@googleapis/docs';
import { assert } from 'console';
import IGoogleDriveService, {
  ICreateClientObject,
  ICreateGoogleDocParams,
  IInsertGoogleDocParams,
  IInsertGoogleDocObject,
  ICreateGoogleDocRequestObject,
  ICreateGoogleDocBackgroundRequestParams,
  ICreateGoogleDocAnalysisRequestParams,
} from '../interfaces/services/IGoogleService';
import IQuestion from '../interfaces/models/IQuestion';
import { SupabaseClient } from '@supabase/supabase-js';
import IGoogleDrive from '../interfaces/models/IGoogleDrive';
import GoogleDrive from '../models/googleDrive';

class GoogleDriveService implements IGoogleDriveService {
  private driveV3: drive_v3.Drive;
  private docsV1: docs_v1.Docs;
  private supabase: SupabaseClient;

  constructor(driveV3: drive_v3.Drive, docsV1: docs_v1.Docs, supabase: SupabaseClient) {
    this.driveV3 = driveV3;
    this.docsV1 = docsV1;
    this.supabase = supabase;
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

  async insertGoogleDrive(googleDriveDto: IGoogleDrive): Promise<IGoogleDrive> {
    const googleDrive = new GoogleDrive(googleDriveDto);
    const { data, error } = await this.supabase.from('google_drive').insert(googleDrive.toSupabase()).select().single();
    if (error) {
      throw new Error(`GoogleDrive Data was not inserted into Supabase: ${error.message}`);
    }
    return GoogleDrive.fromSupabase(data);
  }

  async insertGoogleDocToDrive(params: IInsertGoogleDocParams): Promise<IInsertGoogleDocObject> {
    const { newDoc, interviewContent } = params;
    assert(newDoc.id, 'document id was not found');
    const { company, jobTitle, interviewType, interviewerPosition, questions, analysis } = interviewContent;

    let currentIndex = 1;
    const titleRequestObject = this.createTitleRequestObject(company, currentIndex);
    currentIndex = titleRequestObject.newIndex;
    const backgroundRequestObject = this.createBackgroundRequestObject({ company, jobTitle, interviewType, interviewerPosition, currentIndex });
    currentIndex = backgroundRequestObject.newIndex;
    const questionRequestObject = this.createQuestionRequestObject(questions, currentIndex);
    currentIndex = questionRequestObject.newIndex;
    const analysisRequestObject = this.createAnalysisRequestObject({ analysis, currentIndex });
    currentIndex = analysisRequestObject.newIndex;
    const requests = [
      ...titleRequestObject.requests,
      ...backgroundRequestObject.requests,
      ...questionRequestObject.requests,
      ...analysisRequestObject.requests,
    ];

    await this.docsV1.documents.batchUpdate({
      documentId: newDoc.id!,
      requestBody: { requests }
    });

    const googleDriveDto: IGoogleDrive = {
      userId: interviewContent.userId,
      interviewSessionId: interviewContent.interviewSessionId,
      service: 'google_docs',
      documentId: newDoc.id!,
    }
    const googleDriveData = await this.insertGoogleDrive(googleDriveDto);

    return {
      url: `https://docs.google.com/document/d/${googleDriveData.documentId}`,
      documentId: googleDriveData.documentId,
      userId: googleDriveData.userId,
      interviewSessionId: googleDriveData.interviewSessionId,
      service: googleDriveData.service,
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

  private createBackgroundRequestObject(params: ICreateGoogleDocBackgroundRequestParams): ICreateGoogleDocRequestObject {
    let { currentIndex } = params;
    const { company, jobTitle, interviewType, interviewerPosition } = params;
    const backgroundTextArray = [
      ['Company', `: ${company}\n`],
      ['Job Title', `: ${jobTitle}\n`],
      ['Interview Type', `: ${interviewType}\n`],
      ['Interviewer Position', `: ${interviewerPosition}\n`]
    ];

    const requests = [];
    for (let [label, value] of backgroundTextArray) {
      requests.push(
        {
          insertText: {
            text: `${label}${value}`,
            location: { index: currentIndex }
          }
        },
        {
          updateParagraphStyle: {
            range: { 
              startIndex: currentIndex,
              endIndex: currentIndex + label.length + value.length
            },
            paragraphStyle: { namedStyleType: 'NORMAL_TEXT' },
            fields: 'namedStyleType'
          }
        },
        {
          updateTextStyle: {
            range: {
              startIndex: currentIndex,
              endIndex: currentIndex + label.length
            },
            textStyle: {
              underline: true
            },
            fields: 'underline'
          }
        }
      ); 
      currentIndex += label.length + value.length;
    }

    return {
      requests,
      newIndex: currentIndex
    };
  }

  private createQuestionRequestObject(questions: IQuestion[], currentIndex: number): ICreateGoogleDocRequestObject {
    const headingText = 'Potential Interview Questions\n';
    const requests: docs_v1.Schema$Request[] = [
      {
        insertText: {
          text: headingText,
          location: { index: currentIndex }
        },
      },
      {
        updateParagraphStyle: {
          range: {
            startIndex: currentIndex,
          endIndex: currentIndex + headingText.length - 1
        },
        paragraphStyle: { namedStyleType: 'HEADING_2' },
        fields: 'namedStyleType'
        }
      }
    ];

    currentIndex += headingText.length;
    const startQuestionIndex = currentIndex; // apply to all questions
    // push questions with metadata
    for (let question of questions) {
      const questionText = `${question.question}\n`;
      // push question text
      requests.push(
        {
          insertText: {
            text: questionText,
            location: { index: currentIndex }
          }
        },
        {
          updateParagraphStyle: {
            range: {
              startIndex: currentIndex,
              endIndex: currentIndex + questionText.length - 1
            },
            paragraphStyle: { namedStyleType: 'NORMAL_TEXT' },
            fields: 'namedStyleType'
          }
        },
        {
          updateTextStyle: {
            range: {
              startIndex: currentIndex,
              endIndex: currentIndex + questionText.length - 1
            },
            textStyle: { bold: true },
            fields: 'bold'
          }
        },
      );
      currentIndex += questionText.length;
      // push metadata text
      const metadataArray = [
        ['Type', `: ${question.type}\n`],
        ['Difficulty', `: ${question.difficulty}\n`],
        ['Topic', `: ${question.topic}\n`],
        ['Key Points', `: ${question.keyPoints.join(', ')}\n`]
      ];
      for (let [label, value] of metadataArray) {
        requests.push(
        {
          insertText: {
            text: `${label}${value}`,
            location: { index: currentIndex }
          }
        },
        {
          updateParagraphStyle: {
            range: { 
              startIndex: currentIndex,
              endIndex: currentIndex + label.length + value.length
            },
            paragraphStyle: { 
              namedStyleType: 'NORMAL_TEXT',
              indentFirstLine: {
                magnitude: 36,
                unit: 'PT'
              },
              indentStart: {
                magnitude: 36,
                unit: 'PT'
              }
            },
            fields: 'namedStyleType,indentFirstLine,indentStart'
          },
        },
        {
          updateTextStyle: {
            range: {
              startIndex: currentIndex,
              endIndex: currentIndex + label.length
            },
            textStyle: {
              underline: true
            },
            fields: 'underline'
          },
        }); 
        currentIndex += label.length + value.length;
      }
    }

    // push NUMBERED_UPPERROMAN bullets to questions
    requests.push(
      {
        createParagraphBullets: {
          range: {
            startIndex: startQuestionIndex,
            endIndex: currentIndex,
          },
          bulletPreset: 'NUMBERED_UPPERROMAN_UPPERALPHA_DECIMAL'
        }
      }
    );

    return {
      requests,
      newIndex: currentIndex
    };
  }
  
  private createAnalysisRequestObject(params: ICreateGoogleDocAnalysisRequestParams): ICreateGoogleDocRequestObject {
    let { analysis, currentIndex } = params;
    const { strengthAreas, gapAreas, recommendedFocus } = analysis;
    const headingText = 'Analysis\n';
    const requests: docs_v1.Schema$Request[] = [
      {
        insertText: {
          text: headingText,
          location: { index: currentIndex }
        }
      },
      {
        updateParagraphStyle: { 
          range: {
            startIndex: currentIndex,
            endIndex: currentIndex + headingText.length - 1
          },
          paragraphStyle: { namedStyleType: 'HEADING_2' },
          fields: 'namedStyleType'
        }
      }
    ];
    currentIndex += headingText.length;

    const analysisTextArray: [string, string[]][] = [
      ['Strength Areas:', strengthAreas],
      ['Gap Areas:', gapAreas],
      ['Recommended Focus:', recommendedFocus]
    ];

    for (let [label, points] of analysisTextArray) {
      // Insert the label (e.g., "Strength Areas:")
      requests.push(
        {
          insertText: {
            text: `${label}\n`,
            location: { index: currentIndex }
          }
        },
        {
          updateTextStyle: {
            range: {
              startIndex: currentIndex,
              endIndex: currentIndex + label.length
            },
            textStyle: { bold: true },
            fields: 'bold'
          }
        }
      );
      currentIndex += label.length + 1;

      // Insert each bullet point
      for (let point of points) {
        const pointText = `${point}\n`;
        const pointStartIndex = currentIndex;
        
        requests.push(
          {
            insertText: {
              text: pointText,
              location: { index: currentIndex }
            }
          },
          {
            updateParagraphStyle: {
              range: {
                startIndex: pointStartIndex,
                endIndex: pointStartIndex + pointText.length - 1
              },
              paragraphStyle: {
                namedStyleType: 'NORMAL_TEXT',
                indentStart: {
                  magnitude: 36,
                  unit: 'PT'
                }
              },
              fields: 'namedStyleType,indentStart'
            }
          },
          {
            createParagraphBullets: {
              range: {
                startIndex: pointStartIndex,
                endIndex: pointStartIndex + pointText.length - 1
              },
              bulletPreset: 'BULLET_DISC_CIRCLE_SQUARE'
            }
          }
        );
        currentIndex += pointText.length;
      }

      // Add extra newline after each section
      requests.push({
        insertText: {
          text: '\n',
          location: { index: currentIndex }
        }
      });
      currentIndex += 1;
    }

    return {
      requests,
      newIndex: currentIndex
    };
  }
}

class GoogleDriveServiceFactory {
  static createClient(accessToken: string, supabase: SupabaseClient): ICreateClientObject {
    const clientAuth = new auth.OAuth2();
    clientAuth.setCredentials({ access_token: accessToken });

    const driveV3Client = drive({ version: 'v3', auth: clientAuth });
    const docsV1Client = docs({ version: 'v1', auth: clientAuth });
    return { driveV3Client, docsV1Client };
  }

  static createGoogleDriveService(accessToken: string, supabase: SupabaseClient): IGoogleDriveService {
    const { driveV3Client, docsV1Client } = this.createClient(accessToken, supabase);
    return new GoogleDriveService(driveV3Client, docsV1Client, supabase);
  }
}

export default GoogleDriveServiceFactory;

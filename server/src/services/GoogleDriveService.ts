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
    const { newDoc, interviewContent } = params;
    assert(newDoc.id, 'document id was not found');
    const { company, jobTitle, interviewType, interviewerPosition, questions, analysis } = interviewContent;

    let currentIndex = 1;
    const titleText = `Potential Interview Questions for ${company}\n`;
    const backgroundText = `Company: ${company}\n` +
                         `Job Title: ${jobTitle}\n` +
                         `Interview Type: ${interviewType}\n` +
                         `Interviewer Position: ${interviewerPosition}\n\n`;
    

    const requests = [
      // Title
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

      // Background Info with Heading 4
      {
        insertText: {
          text: backgroundText,
          location: { index: currentIndex += titleText.length } // Here's where we update currentIndex
        }
      },
      {
        updateParagraphStyle: {
          range: { 
            startIndex: currentIndex,
            endIndex: currentIndex + backgroundText.length - 1
          },
          paragraphStyle: { namedStyleType: 'HEADING_5' },
          fields: 'namedStyleType'
        }
      },
      // need to seperate questions into a function and process it;
      // Questions
      ...interviewContent.questions.flatMap((q, idx) => {
        const questionText = `${q.question}\n`;
        const metadataText = `Type: ${q.type}\n` +
                            `Difficulty: ${q.difficulty}\n` +
                            `Topic: ${q.topic}\n` +
                            `Key Points:\n` +
                            `${q.keyPoints.map(point => `${point}\n`).join('')}\n\n`;
        
        const startIndex = currentIndex;
        currentIndex += questionText.length + metadataText.length;
        
        return [
          {
            insertText: {
              text: questionText,
              location: { index: startIndex }
            }
          },
          {
            createParagraphBullets: {
              range: {
                startIndex: startIndex,
                endIndex: startIndex + questionText.length - 1
              },
              bulletPreset: 'NUMBERED_DECIMAL_NESTED'
            }
          },
          {
            updateTextStyle: {
              range: {
                startIndex: startIndex,
                endIndex: startIndex + questionText.length - 1
              },
              textStyle: { bold: true },
              fields: 'bold'
            }
          },
          {
            insertText: {
              text: metadataText,
              location: { index: startIndex + questionText.length }
            }
          },
          // {
          //   createParagraphBullets: {
          //     range: {
          //       startIndex: startIndex + questionText.length,
          //       endIndex: startIndex + questionText.length + metadataText.length - 1
          //     },
          //     bulletPreset: 'BULLET_DISC_CIRCLE_SQUARE'
          //   }
          // },
          {
            updateParagraphStyle: {
              range: {
                startIndex: startIndex,
                endIndex: startIndex + questionText.length + metadataText.length - 1
              },
              paragraphStyle: { namedStyleType: 'NORMAL_TEXT' },
              fields: 'namedStyleType'
            }
          }
        ];
      }),

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

// Helper function to calculate indices (simplified version)
function getQuestionIndex(questionNum: number): number {
  return 150 + (questionNum * 300); // Approximate spacing
}

function getFinalIndex(): number {
  return 3000; // Approximate final position
}

export default GoogleDriveServiceFactory;

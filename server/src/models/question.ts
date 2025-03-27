import Base from "./base";
import IQuestion from "../interfaces/models/IQuestion";

class Question extends Base<IQuestion> {
  private _userId: string;
  private _interviewSessionId: string;
  private _question: string;
  private _type: string;
  private _difficulty: string;
  private _topic: string;
  private _notes: string;
  private _relevance: string;
  private _followUp: string[];
  private _keyPoints: string[];
  private _skillsAssessed: string[];

  constructor(obj: IQuestion) {
    super(obj);
    this._userId = obj.userId;
    this._interviewSessionId = obj.interviewSessionId;
    this._question = obj.question;
    this._type = obj.type;
    this._difficulty = obj.difficulty;
    this._topic = obj.topic;
    this._notes = obj.notes;
    this._relevance = obj.relevance;
    this._followUp = obj.followUp;
    this._keyPoints = obj.keyPoints;
    this._skillsAssessed = obj.skillsAssessed;
  }

  get userId() {
    return this._userId;
  }

  set userId(userId: string) {  
    this._userId = userId;
  }

  get question() {
    return this._question;
  }

  set question(question: string) {
    this._question = question;
  }

  get type() {
    return this._type;
  }

  set type(type: string) {
    this._type = type;
  }

  get difficulty() {
    return this._difficulty;
  }

  get topic() {
    return this._topic;
  }

  set topic(topic: string) {
    this._topic = topic;
  } 

  get notes() {
    return this._notes;
  } 

  set notes(notes: string) {
    this._notes = notes;
  }   

  get relevance() {
    return this._relevance;
  }

  set relevance(relevance: string) {
    this._relevance = relevance;
  }

  get followUp() {
    return this._followUp;
  }

  set followUp(followUp: string[]) {
    this._followUp = followUp;
  }

  get keyPoints() {
    return this._keyPoints;
  } 

  set keyPoints(keyPoints: string[]) {
    this._keyPoints = keyPoints;
  }

  get skillsAssessed() {
    return this._skillsAssessed;
  }

  set skillsAssessed(skillsAssessed: string[]) {
    this._skillsAssessed = skillsAssessed;
  }

  get interviewSessionId() {
    return this._interviewSessionId;
  }

  set interviewSessionId(interviewSessionId: string) {
    this._interviewSessionId = interviewSessionId;
  }
}

export default Question;

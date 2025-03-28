import IBaseModel, { IBaseSupabase } from "../interfaces/models/IBaseModel";
import { camelCase, snakeCase } from 'lodash';

abstract class Base<T extends IBaseModel> {
  readonly id!: string;
  private _createdAt!: Date;
  private _updatedAt!: Date;

  constructor(obj: T & IBaseModel) {
    if (obj.id) {
      this.id = obj.id;
    }
    this._createdAt = obj.createdAt || new Date();
    this._updatedAt = obj.updatedAt || new Date();
  }

  // Convert from Supabase snake_case to our camelCase model
  static fromSupabase<T extends IBaseSupabase, U extends Base<T>>(
    this: new (data: any) => U,
    data: T
  ): U {
    const camelCaseData = Object.entries(data).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [camelCase(key)]: value,
      };
    }, {});
    return camelCaseData as U;
  }

  // Convert our camelCase model to Supabase snake_case
  public toSupabase<T>(): Partial<T> {
    const snakeCaseData = Object.entries(this).reduce((acc, [key, value]) => {
      // Remove leading underscore from private fields
      const cleanKey = key.startsWith('_') ? key.slice(1) : key;
      return {
        ...acc,
        [snakeCase(cleanKey)]: value,
      };
    }, {});

    return snakeCaseData as Partial<T>;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}

export default Base;

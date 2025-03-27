interface IBaseModel {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IBaseSupabase {
  id: string;
  created_at: string;
  updated_at: string;
}

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
      const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      return {
        ...acc,
        [camelKey]: key.endsWith('_at') ? new Date(value) : value,
      };
    }, {});

    return new this(camelCaseData);
  }

  // Convert our camelCase model to Supabase snake_case
  public toSupabase<T>(): Partial<T> {
    const snakeCaseData = Object.entries(this).reduce((acc, [key, value]) => {
      // Remove leading underscore from private fields
      const cleanKey = key.startsWith('_') ? key.slice(1) : key;
      // Convert to snake_case
      const snakeKey = cleanKey.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      
      // Skip id, created_at, and updated_at
      if (['id', 'createdAt', 'updatedAt'].includes(cleanKey)) {
        return acc;
      }

      return {
        ...acc,
        [snakeKey]: value,
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
export type { IBaseModel, IBaseSupabase };


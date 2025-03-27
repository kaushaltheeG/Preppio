interface IBaseModel {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export default IBaseModel;

export interface IBaseSupabase {
  id: string;
  created_at: string;
  updated_at: string;
}
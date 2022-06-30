export type Todo = {
  id: string;
  user_id: string;
  title: string;
  due_date?: Date;
  created_at: Date;
  description?: string;
  is_complete: boolean;
};

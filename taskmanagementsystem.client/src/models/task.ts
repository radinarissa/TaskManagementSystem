export interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  dueDate: string | null;
  priorityId: number;
  priorityName: string;
  priorityColor: string;
  statusId: number;
  statusName: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  dueDate: string | null;
  priorityId: number;
  statusId: number;
}

export interface UpdateTaskDto extends CreateTaskDto {}

export interface Priority {
  id: number;
  name: string;
  color: string;
}

export interface Status {
  id: number;
  name: string;
}
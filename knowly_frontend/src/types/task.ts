export interface Option {
  name: string | number,
  backgroundColor?: string,
  textColor?: string
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: Date;
  uploadedBy: string;
}


export interface Task {
  id: string;
  identifier: string; // e.g., "TASK-123"
  name: string;
  description?: string;
  type: 'task' | 'bug' | 'feature' | 'epic';
  estimateTime: number; // in hours
  spentTime: number; // in hours
  status: 'backlog' | 'todo' | 'in-progress' | 'in-review' | 'done' | 'cancelled';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  assignees: string[]; // user IDs
  labels: string[];
  subtasks: Task[];
  parentId?: string;
  dueDate?: Date;
  startDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  sprint?: string;
  storyPoints?: number;
  attachments?: Attachment[];
  comments?: Comment[];
}



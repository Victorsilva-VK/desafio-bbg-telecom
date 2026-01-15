export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'ABERTO' | 'EM_PROGRESSO' | 'CONCLUIDO';
  priority: 'BAIXA' | 'MEDIA' | 'ALTA';
  createdAt: string;
  cliente?: {
    name: string;
    email: string;
  };
}

export interface PaginatedResponse {
  data: Ticket[];
  total: number;
  page: number;
  totalPages: number;
}
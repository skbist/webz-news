export interface ListParams {
  pagination: {
    page?: number;
    limit?: number;
  };

  sorting?: {
    column?: string;
    arrange?: 'asc' | 'desc' | 'ASC' | 'DESC';
  };
}

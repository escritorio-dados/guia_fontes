export type IPagingResult<T> =
  | {
      pagination: { page: number; totalResults: number; totalPages: number };
      data: T[];
    }
  | undefined;

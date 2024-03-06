export interface SkipTakeBody {
  skip: number;
  take: number;
}
export interface SearchParamBody {
  searchType?: string;
  searchString?: string;
  searchStartDate?: string;
  searchEndDate?: string;
}

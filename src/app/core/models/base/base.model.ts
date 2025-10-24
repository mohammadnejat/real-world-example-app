// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SafeAny = any;
export type RecordModel = Record<string, SafeAny>;

export type QueryParamsModel = Record<string, any>;
export interface ResponseErrorModel {
  code?: string;
  detail?: string;
  title?: string;
  message?: string;
}

export interface BaseEntityModel {
  id: number;
  title?: string;
  name?: string;
}

export interface BaseItemModel {
  title: string;
  description: string;
}

export interface BaseValuePropositionModel {
  title: string;
  imageSrc: string;
}

export interface BaseStateModel {
  id: number;
  title: string;
  isSelected?: boolean;
}

export interface PaginationResponseModel {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  [k: string]: any;
}

export interface PaginationModel {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface PaginatedEntityModel<T> extends PaginationResponseModel {
  data: T[];
}

export interface PaginationParamsModel {
  page: number;
  size: number;
}

export interface GroupEntityModel<T> {
  key: string;
  value: T[];
}

export interface MetaTagsModel {
  name?: string;
  property?: string;
  content: string;
}

export interface BaseValueLabelModel {
  value: number | boolean;
  label: string;
}

export interface hospitalizationItemsModel {
  title: string;
  value: string;
}

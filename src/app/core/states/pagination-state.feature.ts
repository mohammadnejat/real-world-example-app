import { computed, Signal } from '@angular/core';
import {
  PaginatedEntityModel,
  PaginationModel,
  PaginationParamsModel,
} from '../models/base/base.model';
import { signalStoreFeature, SignalStoreFeature, withComputed, withState } from '@ngrx/signals';

const DEFAULT_PER_PAGE = 10;

const initialState: PaginationModel = {
  page: 1,
  perPage: DEFAULT_PER_PAGE,
  total: 0,
  totalPages: 0,
};

export function withPagination(): SignalStoreFeature<
  {
    state: {};
    props: {};
    methods: {};
  },
  {
    state: PaginationModel;
    props: {
      pagination: Signal<PaginationModel>;
      paginationParams: Signal<PaginationParamsModel>;
    };
    methods: {};
  }
>;
export function withPagination(): SignalStoreFeature {
  return signalStoreFeature(
    withState(initialState),
    withComputed(({ page, perPage, total, totalPages }) => ({
      pagination: computed(() => ({ page, perPage, total, totalPages })),
      paginationParams: computed(() => ({
        pageNumber: page(),
      })),
    }))
  );
}

export function updateTotalsPagination<Entity>(
  entity: PaginatedEntityModel<Entity>
): Partial<PaginationModel> {
  return {
    total: entity.total,
    totalPages: entity.totalPages,
  };
}

export function updatePagesPagination({
  page,
  perPage = DEFAULT_PER_PAGE,
}: PaginationModel): Partial<PaginationModel> {
  return {
    page,
    perPage,
  };
}

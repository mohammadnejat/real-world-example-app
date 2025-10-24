import { Signal, computed } from '@angular/core';
import { ResponseErrorModel } from '../models/base/base.model';
import { SignalStoreFeature, signalStoreFeature, withComputed, withState } from '@ngrx/signals';

type NamedRequestState<Prop extends string> = {
  [K in Prop as `${K}RequestState`]: RequestStateModel;
};

type NamedRequestStateComputed<Prop extends string> = {
  [K in Prop as `${K}Pending`]: Signal<boolean>;
} & {
  [K in Prop as `${K}Fulfilled`]: Signal<boolean>;
} & {
  [K in Prop as `${K}Error`]: Signal<ResponseErrorModel | null>;
};

type RequestStateModel = 'idle' | 'pending' | 'fulfilled' | ResponseErrorModel;

export function withRequestState<Prop extends string>(config: {
  prefix: Prop;
}): SignalStoreFeature<
  {
    state: {};
    props: {};
    methods: {};
  },
  {
    state: NamedRequestState<Prop>;
    props: NamedRequestStateComputed<Prop>;
    methods: {};
  }
>;
export function withRequestState<Prop extends string>(config: {
  prefix: Prop;
}): SignalStoreFeature {
  const { requestStateKey, pendingKey, fulfilledKey, errorKey } = getRequestStateKeys(config);

  return signalStoreFeature(
    withState({ [requestStateKey]: 'idle' }),
    withComputed((store: Record<string, Signal<unknown>>) => {
      const requestState = store[requestStateKey] as Signal<RequestStateModel>;
      return {
        [pendingKey]: computed(() => requestState() === 'pending'),
        [fulfilledKey]: computed(() => requestState() === 'fulfilled'),
        [errorKey]: computed(() => {
          const state = requestState();
          return typeof state === 'object' ? state : null;
        }),
      };
    })
  );
}

function getRequestStateKeys(config: { prefix: string }) {
  return {
    requestStateKey: `${config.prefix}RequestState`,
    pendingKey: `${config.prefix}Pending`,
    fulfilledKey: `${config.prefix}Fulfilled`,
    errorKey: `${config.prefix}Error`,
  };
}

export function setPending<Prop extends string>(prefix: Prop): NamedRequestState<Prop> {
  return {
    [`${prefix}RequestState`]: 'pending',
    [`${prefix}Error`]: null,
  } as NamedRequestState<Prop>;
}
export function setFulfilled<Prop extends string>(prefix: Prop): NamedRequestState<Prop> {
  return {
    [`${prefix}RequestState`]: 'fulfilled',
    [`${prefix}Error`]: null,
  } as NamedRequestState<Prop>;
}

export function setError<Prop extends string>(
  prefix: Prop,
  error: ResponseErrorModel
): NamedRequestState<Prop> {
  return {
    [`${prefix}RequestState`]: error,
  } as NamedRequestState<Prop>;
}

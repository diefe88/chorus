import { Action as HistoryAction } from 'history';

export const enum RouterInternalActionType {
	PUSH = 'ROUTER/PUSH',
	REPLACE = 'ROUTER/REPLACE',
	GO = 'ROUTER/GO',
	GO_BACK = 'ROUTER/GO_BACK',
	GO_FORWARD = 'ROUTER/GO_FORWARD',
}

export const enum RouterActionType {
	LOCATION_CHANGE = 'ROUTER/LOCATION_CHANGE',
}

export interface IRouterPushReplacePayload {
	href: string,
}

export interface IRouterGoPayload {
	index: number,
}

export interface IRouterLocationChangePayload {
	pathname: string,
	search: string,
	hash: string,
	historyAction: HistoryAction | undefined,
}

export const enum TelemetryActionType {
	LANDING_PAGE = 'TELEMETRY/LANDING_PAGE',
	START = 'TELEMETRY/START',
}
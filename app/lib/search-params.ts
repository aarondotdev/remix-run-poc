import {
    createSerializer,
    parseAsBoolean,
    parseAsInteger,
    parseAsString,
    useQueryStates
} from 'nuqs';

export let searchParams = {
    'page[number]': parseAsInteger.withDefault(1),
    'page[size]': parseAsInteger.withDefault(10),
    'filter[q]': parseAsString.withDefault(''),
    'filter[name]': parseAsString.withDefault(''),
    'filter[id]': parseAsString.withDefault(''),
    'filter[user_id]': parseAsString.withDefault(''),
    'filter[shift_date]': parseAsString.withDefault(''),
    'filter[color]': parseAsString.withDefault(''),
    'filter[junket_id]': parseAsString.withDefault(''),
    'filter[status]': parseAsString.withDefault(''),
    'filter[player_code]': parseAsString.withDefault(''),
    'filter[request.code]': parseAsString.withDefault(''),
    'filter[without_cashier]': parseAsBoolean.withDefault(true),
    'filter[is_player]': parseAsBoolean.withDefault(false),
    'filter[type]': parseAsString.withDefault(''),
    'filter[created_at]': parseAsString.withDefault(''),
    'filter[withdrawalRequest.request_code]': parseAsString.withDefault(''),
    'filter[is_active]': parseAsString.withDefault(''),
    'filter[junketSite.code]': parseAsString.withDefault(''),
    'filter[normal_balance]': parseAsString.withDefault(''),
    'filter[country_id]': parseAsString.withDefault(''),
    'filter[currency.code]': parseAsString.withDefault(''),
    'filter[house_balance_id]': parseAsString.withDefault(''),
    'filter[level]': parseAsString.withDefault(''),
    'filter[holder]': parseAsString.withDefault(''),
    'filter[junket_site_id]': parseAsString.withDefault(''),
    'filter[agent_id]': parseAsString.withDefault(''),
    'filter[wallet_id]': parseAsString.withDefault(''),
    sort: parseAsString.withDefault(''),
    include: parseAsString.withDefault('')
};


export function useNuqsState() {
    return useQueryStates(searchParams);
}

export let serialize = createSerializer(searchParams, { clearOnDefault: false });

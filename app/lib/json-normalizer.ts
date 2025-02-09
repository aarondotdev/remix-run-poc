import {
  isArray,
  isEmpty,
  isNil,
  find,
  isPlainObject,
  camelCase
} from 'lodash';

interface JsonApiResource {
  id: string;
  type: string;
  attributes?: Record<string, unknown>;
  links?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  relationships?: Record<string, JsonApiRelationship>;
}

interface JsonApiRelationship {
  data?: JsonApiResource | JsonApiResource[];
}

interface JsonApiResponse {
  data: JsonApiResource | JsonApiResource[];
  included?: JsonApiResource[];
  links?: Record<string, unknown>;
  meta?: Record<string, unknown>;
}

export function getRelationshipData(
  relationship: JsonApiResource | undefined,
  included: JsonApiResource[] | undefined
): Record<string, unknown> | undefined {
  if (isNil(relationship) || isEmpty(relationship)) {
    return;
  }

  if (isNil(included) || isEmpty(included)) {
    return;
  }

  const resource = find(included, {
    id: relationship.id,
    type: relationship.type
  });

  if (isNil(resource) || isEmpty(resource)) {
    return;
  }

  const { attributes, id, links, meta, relationships } = resource;

  const extractedRelationships = extractRelationships(relationships, included);

  return { id, links, meta, ...attributes, ...extractedRelationships };
}

export function extractRelationships(
  relationships: Record<string, JsonApiRelationship> | undefined,
  included: JsonApiResource[] | undefined
): Record<string, unknown> | undefined {
  if (isNil(relationships) || isEmpty(relationships)) {
    return;
  }

  if (isNil(included) || isEmpty(included)) {
    return;
  }

  const extractedRelationships: Record<string, unknown> = {};

  Object.keys(relationships).forEach((key) => {
    const { data } = relationships[key];

    if (isNil(data) || isEmpty(data)) {
      return;
    }

    if (isArray(data)) {
      extractedRelationships[key] = data.map((elem) =>
        getRelationshipData(elem, included)
      );
    } else if (isPlainObject(data)) {
      extractedRelationships[key] = getRelationshipData(
        data as JsonApiResource,
        included
      );
    }
  });

  return extractedRelationships;
}

export function processData({
  data,
  included
}: JsonApiResponse): Record<string, unknown> | Record<string, unknown>[] {
  if (isArray(data)) {
    return data.map((elem) => processData({ data: elem, included })) as Record<
      string,
      unknown
    >[];
  }

  if (isPlainObject(data)) {
    const { attributes, id, links, meta, relationships } =
      data as JsonApiResource;

    const extractedRelationships = extractRelationships(
      relationships,
      included
    );

    return { id, links, meta, ...attributes, ...extractedRelationships };
  }

  return {};
}

export function camelizeData(
  data: unknown
): Record<string, unknown> | Record<string, unknown>[] | undefined {
  if (isArray(data)) {
    return data.map((item) => camelizeData(item) as Record<string, unknown>);
  }

  if (isPlainObject(data)) {
    return Object.keys(data as Record<string, unknown>).reduce<
      Record<string, unknown>
    >((acc, key) => {
      acc[camelCase(key)] = camelizeData(
        (data as Record<string, unknown>)[key]
      );
      return acc;
    }, {});
  }

  return undefined;
}

export default function normalizer(
  json: JsonApiResponse,
  options: { camelize?: boolean } = {}
): {
  data: Record<string, unknown> | Record<string, unknown>[];
  meta?: Record<string, unknown>;
  links?: unknown;
} {
  const { camelize = false } = options;
  let { links, meta } = json;

  let data = processData(json);

  if (camelize) {
    const camelizedData = camelizeData(data);
    if (camelizedData) {
      data = camelizedData;
    }

    const camelizedMeta = camelizeData(meta);
    if (camelizedMeta) {
      meta = camelizedMeta as Record<string, unknown>;
    }
  }

  return { data, meta, links };
}

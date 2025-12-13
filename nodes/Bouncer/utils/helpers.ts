import type { INodeProperties } from "n8n-workflow";

export function buildResourceProperties(
  resources: Array<{
    operations: INodeProperties[];
    fields: INodeProperties[];
  }>,
): INodeProperties[] {
  const properties: INodeProperties[] = [];

  for (const resource of resources) {
    properties.push(...resource.operations, ...resource.fields);
  }

  return properties;
}

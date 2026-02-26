import type { INodeType, INodeTypeDescription } from "n8n-workflow";
import {
  batchFields,
  batchOperations,
  batchSyncFields,
  batchSyncOperations,
  creditsFields,
  creditsOperations,
  domainFields,
  domainOperations,
  realTimeFields,
  realTimeOperations,
  toxicityFields,
  toxicityOperations,
} from "./resources";
import { API_BASE_URL, buildResourceProperties } from "./utils";

export class Bouncer implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Bouncer",
    name: "bouncer",
    icon: "file:../../icons/bouncer.svg",
    group: ["transform"],
    usableAsTool: true,
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: "Interact with the Bouncer E-Mail Verification API",
    defaults: {
      name: "Bouncer",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [
      {
        name: "bouncerApi",
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: API_BASE_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
    properties: [
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
        options: [
          { name: "Batch", value: "batch" },
          { name: "Batch Sync", value: "batchSync" },
          { name: "Credit", value: "credit" },
          { name: "Domain", value: "domain" },
          { name: "Real Time", value: "realTime" },
          { name: "Toxicity", value: "toxicity" },
        ],
        default: "credit",
      },
      ...buildResourceProperties([
        { operations: batchOperations, fields: batchFields },
        { operations: batchSyncOperations, fields: batchSyncFields },
        { operations: creditsOperations, fields: creditsFields },
        { operations: domainOperations, fields: domainFields },
        { operations: realTimeOperations, fields: realTimeFields },
        { operations: toxicityOperations, fields: toxicityFields },
      ]),
    ],
  };
}

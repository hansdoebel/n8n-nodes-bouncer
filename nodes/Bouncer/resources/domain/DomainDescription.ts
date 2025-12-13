import type { INodeProperties } from "n8n-workflow";
import { RATE_LIMITS } from "../../utils";

export const domainOperations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["domain"],
      },
    },
    options: [
      {
        name: "Verify Domain",
        value: "verifyDomain",
        description: "Verifies single domain",
        action: "Verify domain",
        routing: {
          request: {
            method: "GET",
            url: "/domain",
          },
        },
      },
    ],
    default: "verifyDomain",
  },
];

export const domainFields: INodeProperties[] = [
  {
    displayName: "Domain",
    name: "domain",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["domain"],
        operation: ["verifyDomain"],
      },
    },
    default: "",
    placeholder: "e.g. example.com",
    description:
      `Domain name to verify. Rate limit: ${RATE_LIMITS.DOMAIN} requests/minute.`,
    routing: {
      send: {
        type: "query",
        property: "domain",
      },
    },
  },
];

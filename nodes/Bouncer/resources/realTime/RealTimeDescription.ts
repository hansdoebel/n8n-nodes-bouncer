import type { INodeProperties } from "n8n-workflow";
import { RATE_LIMITS, TIMEOUTS } from "../../utils";

export const realTimeOperations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["realTime"],
      },
    },
    options: [
      {
        name: "Verify E-Mail",
        value: "verifyEmail",
        description: "Verifies single email in real-time synchronous manner",
        action: "Verify email",
        routing: {
          request: {
            method: "GET",
            url: "/email/verify",
          },
        },
      },
    ],
    default: "verifyEmail",
  },
];

export const realTimeFields: INodeProperties[] = [
  {
    displayName: "E-Mail",
    name: "email",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["realTime"],
        operation: ["verifyEmail"],
      },
    },
    default: "",
    placeholder: "e.g. jane@usebouncer.com",
    description: "E-Mail address to verify",
    routing: {
      send: {
        type: "query",
        property: "email",
      },
    },
  },
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: "Timeout",
    name: "timeout",
    type: "number",
    default: TIMEOUTS.DEFAULT,
    displayOptions: {
      show: {
        resource: ["realTime"],
        operation: ["verifyEmail"],
      },
    },
    description:
      `Timeout for verification in seconds (default: ${TIMEOUTS.DEFAULT}, maximum: ${TIMEOUTS.MAX}). Rate limit: ${RATE_LIMITS.REAL_TIME} requests/minute.`,
    typeOptions: {
      minValue: TIMEOUTS.MIN,
      maxValue: TIMEOUTS.MAX,
    },
    routing: {
      send: {
        type: "query",
        property: "timeout",
      },
    },
  },
];

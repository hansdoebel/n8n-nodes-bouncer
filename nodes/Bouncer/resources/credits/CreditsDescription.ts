import type { INodeProperties } from "n8n-workflow";

export const creditsOperations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["credit"],
      },
    },
    options: [
      {
        name: "Get Available Credits",
        value: "getAvailableCredits",
        description: "Retrieve available credits",
        action: "Get available credits",
        routing: {
          request: {
            method: "GET",
            url: "/credits",
          },
        },
      },
    ],
    default: "getAvailableCredits",
  },
];

export const creditsFields: INodeProperties[] = [];

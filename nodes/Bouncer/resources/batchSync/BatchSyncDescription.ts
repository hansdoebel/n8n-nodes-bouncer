import type { INodeProperties } from "n8n-workflow";
import { BATCH_SIZES, RATE_LIMITS } from "../../utils";

export const batchSyncOperations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["batchSync"],
      },
    },
    options: [
      {
        name: "Verify E-Mails",
        value: "verifyEmails",
        description: "Verifies multiple emails in a batch, synchronous manner",
        action: "Verify emails synchronously",
        routing: {
          request: {
            method: "POST",
            url: "/email/verify/batch/sync",
          },
        },
      },
    ],
    default: "verifyEmails",
  },
];

export const batchSyncFields: INodeProperties[] = [
  {
    displayName: "E-Mails",
    name: "emails",
    type: "json",
    required: true,
    displayOptions: {
      show: {
        resource: ["batchSync"],
        operation: ["verifyEmails"],
      },
    },
    default: "",
    hint:
      '<p>JSON array of email addresses to verify.</p><p>Example: [\n "jane@usebouncer.com",\n  "john@usebouncer.com" ]</p>',
    description:
      `Max: ${BATCH_SIZES.SYNC_MAX} emails. Rate limit: ${RATE_LIMITS.BATCH_SYNC} requests/minute.`,
    routing: {
      send: {
        preSend: [
          async function (this, requestOptions) {
            const emails = this.getNodeParameter("emails", 0) as string;
            requestOptions.body = JSON.parse(emails);
            return requestOptions;
          },
        ],
      },
    },
  },
];

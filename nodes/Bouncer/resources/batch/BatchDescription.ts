import type { INodeProperties } from "n8n-workflow";
import { BATCH_SIZES, DOWNLOAD_FILTER, RATE_LIMITS } from "../../utils";

export const batchOperations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["batch"],
      },
    },
    options: [
      {
        name: "Check Status",
        value: "checkStatus",
        description: "Retrieve status of your request based on request ID",
        action: "Check batch status",
        routing: {
          request: {
            method: "GET",
            url: "=/email/verify/batch/{{$parameter.batchId}}",
          },
        },
      },
      {
        name: "Create Batch Request",
        value: "create",
        description:
          "Verifies one or multiple emails in a batch, offline manner",
        action: "Create batch request",
        routing: {
          request: {
            method: "POST",
            url: "/email/verify/batch",
          },
        },
      },
      {
        name: "Delete Request",
        value: "delete",
        description:
          "Delete emails associated with request. Results will be lost.",
        action: "Delete batch request",
        routing: {
          request: {
            method: "DELETE",
            url: "=/email/verify/batch/{{$parameter.batchId}}",
          },
        },
      },
      {
        name: "Finish",
        value: "finish",
        description:
          "Finish processing and return credits for remaining not verified emails",
        action: "Finish batch processing",
        routing: {
          request: {
            method: "POST",
            url: "=/email/verify/batch/{{$parameter.batchId}}/finish",
          },
        },
      },
      {
        name: "Get Results",
        value: "getResults",
        description: "Download batch result as JSON",
        action: "Get batch results",
        routing: {
          request: {
            method: "GET",
            url: "=/email/verify/batch/{{$parameter.batchId}}/download",
          },
        },
      },
    ],
    default: "create",
  },
];

export const batchFields: INodeProperties[] = [
  {
    displayName: "E-Mails",
    name: "emails",
    type: "json",
    required: true,
    displayOptions: {
      show: {
        resource: ["batch"],
        operation: ["create"],
      },
    },
    default: "",
    hint:
      '<p>JSON array of email addresses to verify.</p><p>Example:</p><p>[{ "email": "jane@usebouncer.com" },<br />{\n "email": "john@usebouncer.com" }]</p>',
    description:
      `Max: ${BATCH_SIZES.MAX} emails. Recommended: ${BATCH_SIZES.RECOMMENDED_MIN}-${BATCH_SIZES.RECOMMENDED_MAX} emails. Rate limit: ${RATE_LIMITS.BATCH_CREATE} batches/minute.`,
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
  {
    displayName: "Callback URL",
    name: "callback",
    type: "string",
    displayOptions: {
      show: {
        resource: ["batch"],
        operation: ["create"],
      },
    },
    default: "",
    placeholder: "e.g. https://example.com/callback",
    description:
      "Optional callback URL to receive notification when batch is complete",
    routing: {
      send: {
        preSend: [
          async function (this, requestOptions) {
            const callback = this.getNodeParameter("callback", 0) as string;
            if (callback) {
              requestOptions.qs = requestOptions.qs || {};
              requestOptions.qs.callback = callback;
            }
            return requestOptions;
          },
        ],
      },
    },
  },
  {
    displayName: "Batch ID",
    name: "batchId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["batch"],
        operation: ["checkStatus", "delete", "finish", "getResults"],
      },
    },
    default: "",
    placeholder: "e.g. 642152127eec9c46c00fb8d7",
    description: "The batch ID returned from create batch request",
  },
  {
    displayName: "With Stats",
    name: "withStats",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["batch"],
        operation: ["checkStatus"],
      },
    },
    default: false,
    description: "Whether to collect additional processing statistics",
    routing: {
      send: {
        type: "query",
        property: "with-stats",
      },
    },
  },
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: "Download Filter",
    name: "download",
    type: "options",
    default: DOWNLOAD_FILTER.ALL,
    displayOptions: {
      show: {
        resource: ["batch"],
        operation: ["getResults"],
      },
    },
    options: [
      {
        name: "All",
        value: DOWNLOAD_FILTER.ALL,
      },
      {
        name: "Deliverable",
        value: DOWNLOAD_FILTER.DELIVERABLE,
      },
      {
        name: "Risky",
        value: DOWNLOAD_FILTER.RISKY,
      },
      {
        name: "Undeliverable",
        value: DOWNLOAD_FILTER.UNDELIVERABLE,
      },
      {
        name: "Unknown",
        value: DOWNLOAD_FILTER.UNKNOWN,
      },
    ],
    description: "Filter results by status",
    routing: {
      send: {
        type: "query",
        property: "download",
      },
    },
  },
];

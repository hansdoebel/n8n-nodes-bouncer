import type { INodeProperties } from "n8n-workflow";
import { API_BASE_URL_V1, RATE_LIMITS } from "../../utils";

export const toxicityOperations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["toxicity"],
      },
    },
    options: [
      {
        name: "Create List Job",
        value: "createListJob",
        description: "Create toxicity list job",
        action: "Create toxicity list job",
        routing: {
          request: {
            method: "POST",
            url: "/toxicity/list",
            baseURL: API_BASE_URL_V1,
          },
        },
      },
      {
        name: "Check Status",
        value: "checkStatus",
        description: "Check toxicity list job status",
        action: "Check toxicity list job status",
        routing: {
          request: {
            method: "GET",
            url: "=/toxicity/list/{{$parameter.jobId}}",
            baseURL: API_BASE_URL_V1,
          },
        },
      },
      {
        name: "Delete Job",
        value: "deleteJob",
        description: "Delete toxicity list job",
        action: "Delete toxicity list job",
        routing: {
          request: {
            method: "DELETE",
            url: "=/toxicity/list/{{$parameter.jobId}}",
            baseURL: API_BASE_URL_V1,
          },
        },
      },
      {
        name: "Download Results",
        value: "downloadResults",
        description: "Download toxicity list results",
        action: "Download toxicity list results",
        routing: {
          request: {
            method: "GET",
            url: "=/toxicity/list/{{$parameter.jobId}}/data",
            baseURL: API_BASE_URL_V1,
          },
        },
      },
    ],
    default: "createListJob",
  },
];

export const toxicityFields: INodeProperties[] = [
  {
    displayName: "E-Mails",
    name: "emails",
    type: "json",
    required: true,
    displayOptions: {
      show: {
        resource: ["toxicity"],
        operation: ["createListJob"],
      },
    },
    default: "",
    typeOptions: {
      rows: 5,
    },
    description: `Rate limit: ${RATE_LIMITS.TOXICITY_CREATE} lists/minute`,
    hint:
      '<p>JSON array of email addresses to verify.</p><p>Example: [\n "jane@usebouncer.com",\n  "john@usebouncer.com" ]</p>',

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
    displayName: "Job ID",
    name: "jobId",
    type: "string",
    required: true,
    displayOptions: {
      show: {
        resource: ["toxicity"],
        operation: ["checkStatus", "deleteJob", "downloadResults"],
      },
    },
    default: "",
    description: "The job ID returned from create toxicity list job",
  },
];

import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from "n8n-workflow";

const API_BASE_URL = "https://api.usebouncer.com/v1.1";

export class BouncerApi implements ICredentialType {
  name = "bouncerApi";

  displayName = "Bouncer API";

  icon = "file:../icons/bouncer.svg" as const;

  documentationUrl = "https://docs.usebouncer.com/quick-start#authentication";

  properties: INodeProperties[] = [
    {
      displayName: "API Key",
      name: "apiKey",
      type: "string",
      typeOptions: { password: true },
      required: true,
      default: "",
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: "generic",
    properties: {
      headers: {
        "x-api-key": "={{$credentials.apiKey}}",
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: API_BASE_URL,
      url: "/credits",
    },
  };
}

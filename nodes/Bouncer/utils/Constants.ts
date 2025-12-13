export const API_BASE_URL = "https://api.usebouncer.com/v1.1";
export const API_BASE_URL_V1 = "https://api.usebouncer.com/v1";

export const RATE_LIMITS = {
  REAL_TIME: 1000,
  BATCH_CREATE: 60,
  BATCH_OTHER: 200,
  BATCH_SYNC: 100,
  TOXICITY_CREATE: 10,
  DOMAIN: 1000,
  CREDITS: 10,
} as const;

export const TIMEOUTS = {
  DEFAULT: 10,
  MIN: 1,
  MAX: 30,
} as const;

export const BATCH_SIZES = {
  MAX: 100000,
  RECOMMENDED_MIN: 1000,
  RECOMMENDED_MAX: 10000,
  SYNC_MAX: 10000,
} as const;

export const EMAIL_STATUS = {
  DELIVERABLE: "deliverable",
  RISKY: "risky",
  UNDELIVERABLE: "undeliverable",
  UNKNOWN: "unknown",
} as const;

export const EMAIL_REASON = {
  ACCEPTED_EMAIL: "accepted_email",
  LOW_DELIVERABILITY: "low_deliverability",
  LOW_QUALITY: "low_quality",
  INVALID_EMAIL: "invalid_email",
  INVALID_DOMAIN: "invalid_domain",
  REJECTED_EMAIL: "rejected_email",
  DNS_ERROR: "dns_error",
  UNAVAILABLE_SMTP: "unavailable_smtp",
  UNSUPPORTED: "unsupported",
  TIMEOUT: "timeout",
  UNKNOWN: "unknown",
} as const;

export const BOOLEAN_FLAG = {
  YES: "yes",
  NO: "no",
  UNKNOWN: "unknown",
} as const;

export const BATCH_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
} as const;

export const DOWNLOAD_FILTER = {
  ALL: "all",
  DELIVERABLE: "deliverable",
  RISKY: "risky",
  UNDELIVERABLE: "undeliverable",
  UNKNOWN: "unknown",
} as const;

export const DOCUMENTATION_LINKS = {
  API_REFERENCE: "https://docs.usebouncer.com/api-reference",
  QUICK_START: "https://docs.usebouncer.com/quick-start",
  AUTHENTICATION: "https://docs.usebouncer.com/quick-start#authentication",
  CREDITS: "https://docs.usebouncer.com/api-reference/credits",
  REAL_TIME: "https://docs.usebouncer.com/api-reference/real-time/verify-email",
  BATCH: "https://docs.usebouncer.com/api-reference/batch/batch-create",
  BATCH_SYNC: "https://docs.usebouncer.com/api-reference/batch-sync/batch-sync",
  DOMAIN: "https://docs.usebouncer.com/api-reference/domain",
  TOXICITY:
    "https://docs.usebouncer.com/api-reference/toxicity/toxicity-create",
  SANDBOX: "https://docs.usebouncer.com/sandbox",
} as const;

export const SANDBOX_EMAILS = {
  DELIVERABLE: "deliverable@sandbox.usebouncer.com",
  FREE: "free@sandbox.usebouncer.com",
  DISPOSABLE: "disposable@sandbox.usebouncer.com",
  ACCEPT_ALL: "accept-all@sandbox.usebouncer.com",
  UNDELIVERABLE: "undeliverable@sandbox.usebouncer.com",
  UNKNOWN: "unknown@sandbox.usebouncer.com",
  OTHER: "other@sandbox.usebouncer.com",
} as const;

export const RESOURCES = [
  {
    name: "Batch",
    value: "batch",
  },
  {
    name: "Batch Sync",
    value: "batchSync",
  },
  {
    name: "Credit",
    value: "credit",
  },
  {
    name: "Domain",
    value: "domain",
  },
  {
    name: "Real Time",
    value: "realTime",
  },
  {
    name: "Toxicity",
    value: "toxicity",
  },
];

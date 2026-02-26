<h1 align="center">
  <br>
  n8n-nodes-bouncer
  <br>
</h1>

<p align="center">
	<img alt="NPM Version" src="https://img.shields.io/npm/v/n8n-nodes-usebouncer">
	<img alt="GitHub License" src="https://img.shields.io/github/license/hansdoebel/n8n-nodes-bouncer">
	<img alt="NPM Downloads" src="https://img.shields.io/npm/dm/n8n-nodes-usebouncer">
	<img alt="NPM Last Update" src="https://img.shields.io/npm/last-update/n8n-nodes-usebouncer">
	<img alt="Static Badge" src="https://img.shields.io/badge/n8n-2.9.4-EA4B71?logo=n8n">
</p>

<p align="center">
  <a href="#installation">Installation</a> |
  <a href="#credentials">Credentials</a> |
  <a href="#resources">Resources</a> |
  <a href="#testing-with-sandbox-emails">Sandbox Emails</a> |
  <a href="#limitations">Limitations</a> |
  <a href="#development">Development</a>
</p>

---

A community node for [n8n](https://n8n.io/) that integrates with the [Bouncer](https://www.usebouncer.com/) E-Mail Verification API. Verify emails in real-time, run batch verifications, check domains, and detect toxic addresses.

## API Coverage

The table below shows which endpoints are currently implemented:

<details>
<summary><strong>View all endpoints</strong></summary>

| API Resource               | Endpoint                  | Status  | Operations                                                  |
| -------------------------- | ------------------------- | ------- | ----------------------------------------------------------- |
| **Real-Time Verification** | `/v1/email/verify`        | ✅ Full | Verify E-Mail                                               |
| **Batch (Async)**          | `/v1.1/email/verify/batch`| ✅ Full | Create, Check Status, Get Results, Finish, Delete           |
| **Batch (Sync)**           | `/v1/email/verify/batch`  | ✅ Full | Verify E-Mails                                              |
| **Domain Verification**    | `/v1/domain/verify`       | ✅ Full | Verify Domain                                               |
| **Toxicity Check**         | `/v1/toxicity`            | ✅ Full | Create List Job, Check Status, Download Results, Delete Job |
| **Credits**                | `/v1/credits`             | ✅ Full | Get Available Credits                                       |

</details>

## Installation

1. Make a new workflow or open an existing one
2. Open the nodes panel by selecting **+** or pressing **Tab**
3. Search for **Bouncer**
4. Select **Install** to install the node for your instance

## Credentials

1. Sign up for a [Bouncer account](https://www.usebouncer.com/)
2. Navigate to your account settings and find your API key in the API section
3. In n8n, go to **Credentials** > **Add credential**
4. Search for **Bouncer API** and paste your key

## Resources

<details>
<summary><strong>Real-Time Verification</strong></summary>

| Operation    | Description                                                                  |
| ------------ | ---------------------------------------------------------------------------- |
| Verify E-Mail | Verify a single email address in real-time with configurable timeout (1-30s) |

Rate limit: 200 requests/minute

</details>

<details>
<summary><strong>Batch Verification (Async)</strong></summary>

| Operation    | Description                                                       |
| ------------ | ----------------------------------------------------------------- |
| Create       | Submit up to 50,000 emails for offline verification               |
| Check Status | Monitor batch verification progress with optional statistics      |
| Get Results  | Download results as JSON with filtering (all, deliverable, risky, undeliverable, unknown) |
| Finish       | Complete processing early and reclaim credits for unverified emails |
| Delete       | Remove batch data and results                                     |

Rate limit: 60 batches/minute. Recommended batch size: 50,000–1,000,000 emails. Optional webhook callback on completion.

</details>

<details>
<summary><strong>Batch Verification (Sync)</strong></summary>

| Operation     | Description                                          |
| ------------- | ---------------------------------------------------- |
| Verify E-Mails | Verify up to 50 emails synchronously with immediate results |

Rate limit: 60 requests/minute

</details>

<details>
<summary><strong>Domain Verification</strong></summary>

| Operation     | Description                                          |
| ------------- | ---------------------------------------------------- |
| Verify Domain | Check domain validity and mail server configuration  |

Rate limit: 200 requests/minute

</details>

<details>
<summary><strong>Toxicity Check</strong></summary>

| Operation        | Description                              |
| ---------------- | ---------------------------------------- |
| Create List Job  | Submit email list for toxicity analysis  |
| Check Status     | Monitor toxicity check progress          |
| Download Results | Retrieve toxicity analysis results       |
| Delete Job       | Remove toxicity check data               |

Rate limit: 60 lists/minute

</details>

<details>
<summary><strong>Credits</strong></summary>

| Operation            | Description                          |
| -------------------- | ------------------------------------ |
| Get Available Credits | Check your remaining Bouncer API credits |

</details>

## Testing with Sandbox Emails

Bouncer provides free sandbox email addresses for testing **without consuming credits**.

<details>
<summary><strong>View sandbox emails</strong></summary>

| Email Address                          | Expected Result                          |
| -------------------------------------- | ---------------------------------------- |
| `deliverable@sandbox.usebouncer.com`   | Returns `deliverable` status             |
| `undeliverable@sandbox.usebouncer.com` | Returns `undeliverable` status           |
| `unknown@sandbox.usebouncer.com`       | Returns `unknown` status                 |
| `accept-all@sandbox.usebouncer.com`    | Returns `risky` status (accept-all)      |
| `disposable@sandbox.usebouncer.com`    | Returns `risky` status (disposable)      |
| `free@sandbox.usebouncer.com`          | Returns deliverable with `free` provider |
| `other@sandbox.usebouncer.com`         | Returns with various attributes          |

You can modify any sandbox email with a `+` suffix to generate unique test addresses: `deliverable+test1@sandbox.usebouncer.com`

</details>

## Limitations

- Async batch verification: max 50,000 emails per request
- Sync batch verification: max 50 emails per request
- Real-time verification timeout: 1–30 seconds

## Development

```bash
git clone https://github.com/hansdoebel/n8n-nodes-bouncer.git
cd n8n-nodes-bouncer
npm install
npm build
npm lint
```

## License

[MIT](LICENSE)

<p align="center">
  <a href="https://github.com/hansdoebel/n8n-nodes-bouncer">GitHub</a> |
  <a href="https://github.com/hansdoebel/n8n-nodes-bouncer/issues">Issues</a> |
  <a href="https://docs.usebouncer.com/introduction">Bouncer Docs</a>
</p>

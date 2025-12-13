# 🦍 n8n-nodes-bouncer

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

This is a custom n8n community node providing a complete integration with the Bouncer E-Mail Verification API.

---

## 📚 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Authentication](#-authentication)
- [Testing with Sandbox Emails](#-testing-with-sandbox-emails)
- [Development](#-development)
- [Resources](#-resources)
- [Version History](#-version-history)

---

## ✨ Features

### 🎯 Real-Time Verification
- **Verify E-Mail**: Verify single email address in real-time with configurable timeout (1-30 seconds)
- Perfect for signup forms and real-time validation
- Rate limit: 200 requests/minute

### 📦 Batch Verification (Asynchronous)
- **Create Batch Request**: Verify up to 50,000 emails in offline manner
- **Check Status**: Monitor batch verification progress with optional statistics
- **Get Results**: Download verification results as JSON with filtering options (all, deliverable, risky, undeliverable, unknown)
- **Finish**: Complete processing early and reclaim credits for unverified emails
- **Delete Request**: Remove batch data and results
- Recommended batch size: 50,000-1,000,000 emails
- Optional webhook callback when processing completes
- Rate limit: 60 batches/minute

### ⚡ Batch Verification (Synchronous)
- **Verify E-Mails**: Verify up to 50 emails synchronously with immediate results
- Ideal for small batches requiring instant feedback
- Rate limit: 60 requests/minute

### 🌐 Domain Verification
- **Verify Domain**: Check domain validity and mail server configuration
- Validate domain-level email deliverability
- Rate limit: 200 requests/minute

### 🛡️ Toxicity Check
- **Create List Job**: Submit email list for toxicity analysis
- **Check Status**: Monitor toxicity check progress
- **Download Results**: Retrieve toxicity analysis results
- **Delete Job**: Remove toxicity check data
- Identify potentially harmful or spam email addresses
- Rate limit: 60 lists/minute

### 💳 Credits Management
- **Get Available Credits**: Check your remaining Bouncer API credits

### 🔧 Technical Features
- **Declarative Style**: Uses n8n's declarative routing for simplified API integration
- **Type-Safe**: Written in TypeScript with full type definitions
- **Comprehensive Error Handling**: Robust error messages and validation
- **Built with n8n Best Practices**: Follows official n8n community node guidelines

---

## 📦 Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

1. Go to **Settings** > **Community Nodes.**
2. Select **Install.**
3. Enter the npm package name: `n8n-nodes-usebouncer`
4. Agree to the risks of using community nodes: select **I understand the risks of installing unverified code from a public source.**
5. Select **Install.** n8n installs the node and returns to the Community Nodes list in Settings.

---

## 🔐 Authentication

This node uses the Bouncer API key for authentication.

### Getting Your API Key

1. Sign up for a [Bouncer account](https://www.usebouncer.com/)
2. Navigate to your account settings
3. Find your API key in the API section
4. Copy the API key

### Configuring in n8n

1. In your n8n workflow, add the Bouncer node
2. Click on **Create New Credentials**
3. Enter your API key
4. Click **Save** to test and save the credentials

The node will automatically include your API key in the `x-api-key` header for all requests.

---

## 🧪 Testing with Sandbox Emails

Bouncer provides free sandbox email addresses that you can use to test the integration **without consuming credits**. These are perfect for development and testing your workflows.

### Available Sandbox Emails

| Email Address | Expected Result |
|---------------|-----------------|
| `deliverable@sandbox.usebouncer.com` | Returns `deliverable` status |
| `undeliverable@sandbox.usebouncer.com` | Returns `undeliverable` status |
| `unknown@sandbox.usebouncer.com` | Returns `unknown` status |
| `accept-all@sandbox.usebouncer.com` | Returns `risky` status (accept-all domain) |
| `disposable@sandbox.usebouncer.com` | Returns `risky` status (disposable email) |
| `free@sandbox.usebouncer.com` | Returns deliverable with `free` provider flag |
| `other@sandbox.usebouncer.com` | Returns with various attributes |

### Using the Plus (+) Suffix

You can modify any sandbox email with a `+` suffix to generate unique test addresses without consuming credits:

```/dev/null/examples.txt#L1-4
deliverable+test1@sandbox.usebouncer.com
deliverable+test2@sandbox.usebouncer.com
undeliverable+mytest@sandbox.usebouncer.com
```

### Example Test Workflow

1. Add the Bouncer node to your workflow
2. Select **Real Time** as the Resource
3. Select **Verify E-Mail** as the Operation
4. Enter `deliverable@sandbox.usebouncer.com` as the email
5. Execute the node - you should see a `deliverable` status response
6. Test other sandbox emails to see different response scenarios

**Note:** Sandbox emails work with all verification endpoints (Real-Time, Batch, Batch Sync) and don't count against your credit balance.

---

## 🛠️ Development

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/hansdoebel/n8n-nodes-bouncer.git
cd n8n-nodes-bouncer

# Install dependencies
pnpm install

# Build the project
pnpm build

# Watch mode (auto-compile on changes)
pnpm dev
```

### Code Quality

```bash
# Lint code
pnpm lint

# Fix linting issues
pnpm lintfix

# Format code
pnpm format
```

---

## 🔗 Resources

- [n8n Website](https://n8n.io/)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Bouncer Website](https://www.usebouncer.com/)
- [Bouncer API Documentation](https://docs.usebouncer.com/introduction)
- [Bouncer API Reference](https://docs.usebouncer.com/api-reference/)
- [GitHub Repository](https://github.com/hansdoebel/n8n-nodes-bouncer)

---

## 📜 Version History

- `1.0.0` – Complete implementation with all Bouncer API operations
  - ✅ Real-Time E-Mail Verification
  - ✅ Batch E-Mail Verification
  - ✅ Domain Verification
  - ✅ Toxicity Check
  - ✅ Credits Management

---

## 💝 Support

If you find this node helpful, consider [buying me a coffee](https://buymeacoffee.com/hansdoebel)!

---

## 📄 License

[MIT](LICENSE)

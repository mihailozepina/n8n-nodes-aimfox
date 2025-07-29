# n8n-nodes-aimfox

This is an n8n community node. It lets you use Aimfox in your n8n workflows.

Aimfox is a LinkedIn automation platform that helps businesses automate their LinkedIn outreach, lead generation, and social selling activities.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node supports the following operations:

### Account
- **List Accounts**: List all accounts in the workspace

### Blacklist
- **List Blacklisted Accounts**: List all blacklisted accounts in the workspace
- **Add Profile to Blacklist**: Add profile to the blacklist using the profile URN
- **Remove Profile From Blacklist**: Remove profile from the blacklist using the profile URN

### Campaign
- **Add Profile to Campaign**: Add profile to the selected campaign
- **Add Profile to Campaign with Custom Variables**: Add profile to the selected campaign with custom variables
- **Get Campaign**: Get a specific campaign by ID
- **List Campaigns**: List all campaigns in the workspace
- **Pause**: Pause a running campaign
- **Resume**: Resume a paused campaign

### Conversation
- **Get Conversation**: Get a specific conversation by URN
- **Get Lead Conversation**: Get a specific lead conversation URN
- **List Conversations**: List all conversations for the selected workspace
- **Mark Conversation As Read**: Mark an existing conversation as read
- **Send Message To Conversation**: Send a message to an existing conversation
- **Start Conversation**: Start a new conversation with the lead

### Label
- **List Labels**: List all labels for the selected workspace
- **Add Label**: Add a new label to the selected workspace

### Lead
- **Add Label To Lead**: Add a new label to the selected lead
- **Add Note To Lead**: Add a new note to the selected lead
- **Get Lead**: Get a specific lead by ID
- **List Recent Leads**: List recent leads for the selected workspace
- **Remove Label From Lead**: Remove a label from the selected lead

### Templates
- **List Templates**: List all templates in the selected workspace
- **Get Template**: Get a specific template by ID
- **Create Template**: Create a new template in the selected workspace
- **Remove Template**: Remove a template from the selected workspace

## Credentials

To use this node, you need to authenticate with Aimfox using an API key.

### Prerequisites
1. Sign up for an Aimfox account at [https://aimfox.dev](https://aimfox.dev)
2. Generate an API key from your Aimfox dashboard

### Setup
1. In n8n, go to **Settings** > **Credentials**
2. Click **Create New Credential**
3. Search for "Aimfox API" and select it
4. Enter your Aimfox API key
5. Click **Save**

The API key will be used to authenticate all requests to the Aimfox API with Bearer token authentication.

## Compatibility

- Minimum n8n version: 0.198.0
- Tested with n8n versions: 0.198.0+

## Usage

### Basic Workflow Example
1. Start with a **Manual Trigger** or **Schedule Trigger**
2. Add the **Aimfox** node
3. Select your workspace first (required for most operations)
4. Choose your desired operation (Account, Campaign, Profile, or Workspace)
5. Configure the specific operation parameters

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Aimfox API documentation](https://docs.aimfox.com)

![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

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

The Aimfox node has two versions. New nodes use **version 2**, which talks to the Aimfox API v4 and supports the flow builder: a campaign's behavior is its **flow** (view, connect, message, InMail, waits, conditions, A/B splits), and reusable content lives in **assets**. Workflows built with version 1 keep using the v2 API unchanged; to upgrade, replace the node with a new one.

A typical campaign setup in version 2: **Campaign → Create Campaign**, then **Flow → Save Flow** (write a flow, or copy a **Workflow Template**'s definition), then **Campaign → Start or Resume**.

The operations below are version 2's. Version 1 keeps the original set: Template instead of Asset, no Flow or Workflow Template, and campaigns created with an outreach type.

### Account
- **Get Account Limits**: Get the interaction limits for a specific account
- **List Accounts**: List all accounts in the workspace
- **Set Account Limits**: Update the weekly interaction limits for an account

### Asset
- **Create Asset**: Create a message, connection note, InMail, voice note or file asset
- **Delete Asset**: Delete an asset
- **Get Asset**: Get a specific asset by ID
- **List Assets**: List all assets in the workspace
- **Update Asset**: Update an asset

### Blacklist
- **Add Companies to Blacklist**: Add multiple LinkedIn companies to the blacklist
- **Add Profile to Blacklist**: Add profile to the blacklist using the profile URN
- **List Blacklisted Companies**: List all blacklisted LinkedIn companies in the workspace
- **List Blacklisted Profiles**: List one page of blacklisted profiles in the workspace
- **Remove Company From Blacklist**: Remove a LinkedIn company from the blacklist using the company URN
- **Remove Profile From Blacklist**: Remove profile from the blacklist using the profile URN

### Campaign
- **Add Profile to Campaign**: Add profile to the selected campaign
- **Add Profile to Campaign with Custom Variables**: Add profile to the selected campaign with custom variables
- **Create Campaign**: Create a new Aimfox campaign (it needs a flow before it can start)
- **Get Campaign**: Get a specific campaign by ID
- **Get Campaign Metrics**: Get a campaign's views, connections, messages, InMails, replies and more
- **List Campaigns**: List all campaigns in the workspace
- **Pause**: Pause a running campaign
- **Remove Profile From Campaign**: Remove a profile from the selected campaign by public identifier
- **Remove Profiles From Campaign by URN**: Remove one or more profiles from the selected campaign by LinkedIn URN
- **Start or Resume**: Start a new campaign or resume a paused one

### Conversation
- **Get Conversation**: Get a specific conversation by URN
- **Get Lead Conversation**: Get a specific lead conversation URN
- **List Conversations**: List all conversations for the selected workspace
- **Mark Conversation As Read**: Mark an existing conversation as read
- **Send Message To Conversation**: Send a message to an existing conversation
- **Start Conversation**: Start a new conversation with the lead

### Custom Variable
- **Add Custom Variables to Target**: Add custom variables to a specific target in a campaign
- **Get Campaign Custom Variables**: Get all custom variables for a specific campaign
- **Get Target Custom Variables**: Get custom variables for a specific target in a campaign

### Flow
- **Get Flow**: Get one flow version's definition, with the step IDs used by Update Flow Step
- **Get Flow Metrics**: Get a flow version's results
- **List Flow Versions**: List a campaign's flow versions, newest first
- **Save Flow**: Save a campaign's flow (JSON definition; see Flows in the [Aimfox API docs](https://docs.aimfox.com))
- **Update Flow Step**: Change one step's text or settings in place

### Label
- **Add Label**: Add a new label to the selected workspace
- **Delete Label**: Delete a label from the workspace
- **Edit Label**: Edit an existing label in the workspace
- **List Labels**: List all labels for the selected workspace

### Lead
- **Add Label To Lead**: Add a new label to the selected lead
- **Add Note To Lead**: Add a new note to the selected lead
- **Delete Note From Lead**: Delete a note from the selected lead
- **Get Lead**: Get a specific lead by ID
- **Get Lead Custom Variables**: Get custom variables for a specific lead
- **Get Lead Journey**: Get every step campaigns took with a lead
- **List Lead Notes**: List all notes for the selected lead
- **List Recent Leads**: List recent leads for the selected workspace
- **Remove Label From Lead**: Remove a label from the selected lead
- **Search Leads**: Search for leads in the workspace with advanced filters
- **Update Note**: Update a note for the selected lead

### Webhook
- **Create Webhook**: Create a new webhook in the selected workspace
- **Delete Webhook**: Delete a webhook from the workspace
- **Edit Webhook**: Edit an existing webhook in the workspace
- **List Webhooks**: List all webhooks in the selected workspace

### Workflow Template
- **Create Workflow Template**: Save a flow definition as a reusable template
- **Delete Workflow Template**: Delete a workflow template
- **Get Workflow Template**: Get a workflow template with its flow definition
- **List Workflow Templates**: List built-in and workspace workflow templates
- **Update Workflow Template**: Rename a workflow template or replace its definition

## Triggers

This node supports the following triggers:
- **Account Logged In**: This event triggers when a LinkedIn profile successfully logs into the system.
- **Account Logged Out**: This event triggers when a LinkedIn profile is logged out of the system.
- **Campaign Created**: This event triggers when a new campaign is created in the workspace.
- **Campaign Ended**: This event triggers when a campaign has ended.
- **Campaign Reply**: This event triggers when a reply is received from a campaign.
- **Campaign Started**: This event triggers when a campaign has started running.
- **Connect Accepted**: This event triggers when a LinkedIn connection request is accepted, establishing a new connection between profiles.
- **Connect Sent**: This event triggers when a LinkedIn connection request is successfully sent.
- **Inbox Event**: This event triggers for inbox-related events.
- **Inmail**: This event triggers when a LinkedIn Inmail message is successfully sent.
- **Inmail Reply**: This event triggers when a user replies to a LinkedIn Inmail message, initiating a conversation.
- **Lead Label Added**: This event triggers when a label is added to a lead.
- **Message Request**: This event triggers when a message request is sent.
- **Message Sent**: This event triggers when a message is successfully sent to a LinkedIn profile.
- **New Connection**: This event triggers when a new connection is acquired through Aimfox, indicating the successful addition of a LinkedIn connection.
- **New Reply**: This event triggers when a user replies to a LinkedIn message, initiating a conversation.
- **Profile Viewed**: This event triggers when a LinkedIn profile is viewed.
- **Reply**: This event triggers when a reply is received.

## Credentials

To use this node, you need to authenticate with Aimfox using an API key.

### Prerequisites
1. Sign up for an Aimfox account at [https://aimfox.com](https://aimfox.com)
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

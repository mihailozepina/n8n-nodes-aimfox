import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { blacklistFields } from './properties/blacklist/fields';
import { conversationFields } from './properties/conversation/fields';
import { labelFields } from './properties/label/fields';
import { leadFields } from './properties/lead/fields';
import { noteFields } from './properties/note/fields';
import { templateFields } from './properties/template/fields';
import { campaignFields } from './properties/campaign/fields';
import { workspaceFields } from './properties/workspace/fields';

export class Aimfox implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Aimfox',
		name: 'aimfox',
		icon: 'file:aimfox.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Aimfox application',
		defaults: {
			name: 'Aimfox',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'aimfoxApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://673b415297f2.ngrok-free.app/api/v1', // change to api.aimfox.com
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Blacklist',
						value: 'blacklist',
					},
					{
						name: 'Campaign',
						value: 'campaign',
					},
					{
						name: 'Conversation',
						value: 'conversation',
					},
					{
						name: 'Label',
						value: 'label',
					},
					{
						name: 'Lead',
						value: 'lead',
					},
					{
						name: 'Template',
						value: 'template',
					},
				],
				default: 'account',
			},

			// ACCOUNT OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['account'],
					},
				},
				options: [
					{
						name: 'List Accounts',
						value: 'listAccounts',
						action: 'List accounts',
						description: 'List all accounts in the workspace',
						routing: {
							request: {
								method: 'GET',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/accounts',
							},
						},
					},
				],
				default: 'listAccounts',
			},

			// BLACKLIST OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['blacklist'],
					},
				},
				options: [
					{
						name: 'List Blacklisted Accounts',
						value: 'listBlacklist',
						action: 'List blacklist',
						description: 'List all blacklisted accounts in the workspace',
						routing: {
							request: {
								method: 'GET',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/blacklist',
							},
						},
					},
					{
						name: 'Add Profile to Blacklist',
						value: 'addProfileToBlacklist',
						action: 'Add profile to blacklist',
						description: 'Add profile to the blacklist using the profile URN',
						routing: {
							request: {
								method: 'POST',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/blacklist/{{$parameter["profileUrn"]}}',
							},
						},
					},
					{
						name: 'Remove Profile From Blacklist',
						value: 'removeProfileFromBlacklist',
						action: 'Remove profile from blacklist',
						description: 'Remove profile from the blacklist using the profile URN',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/blacklist/{{$parameter["profileUrn"]}}',
							},
						},
					},
				],
				default: 'listBlacklist',
			},

			// CONVERSATION OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['conversation'],
					},
				},
				options: [
					{
						name: 'Get Conversation',
						value: 'getConversation',
						action: 'Get conversation',
						description: 'Get a specific conversation by URN',
						routing: {
							request: {
								method: 'GET',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/conversations/{{$parameter["conversationUrn"]}}',
							},
						},
					},
					{
						name: 'Get Lead Conversation',
						value: 'getLeadConversation',
						action: 'Get lead conversation',
						description: 'Get a specific lead conversation URN',
						routing: {
							request: {
								method: 'GET',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/accounts/{{$parameter["accountId"]}}/leads/{{$parameter["leadId"]}}/conversation-urn',
							},
						},
					},
					{
						name: 'List Conversations',
						value: 'listConversations',
						action: 'List conversations',
						description: 'List all conversations for the selected workspace',
						routing: {
							request: {
								method: 'GET',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/conversations',
							},
						},
					},
					{
						name: 'Mark Conversation As Read',
						value: 'markConversationAsRead',
						action: 'Mark conversation as read',
						description: 'Mark an existing conversation as read',
						routing: {
							request: {
								method: 'POST',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/accounts/{{$parameter["accountId"]}}/conversations/{{$parameter["conversationUrn"]}}/read',
							},
						},
					},
					{
						name: 'Send Message To Conversation',
						value: 'sendMessageToConversation',
						action: 'Send message to conversation',
						description: 'Send a message to an existing conversation',
						routing: {
							request: {
								method: 'POST',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/accounts/{{$parameter["accountId"]}}/conversations/{{$parameter["conversationUrn"]}}',
								body: {
									message: '={{$parameter["conversationMessage"]}}',
								},
							},
						},
					},
					{
						name: 'Start Conversation',
						value: 'startConversation',
						action: 'Start conversation',
						description: 'Start a new conversation with the lead',
						routing: {
							request: {
								method: 'POST',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/accounts/{{$parameter["accountId"]}}/conversations',
								body: {
									message: '={{$parameter["conversationMessage"]}}',
									recipients: ['={{$parameter["leadId"]}}'],
								},
							},
						},
					},
				],
				default: 'listConversations',
			},

			// CAMPAIGN OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'listCampaigns',
				displayOptions: {
					show: {
						resource: ['campaign'],
					},
				},
				options: [
					{
						name: 'Add Profile to Campaign',
						value: 'addProfileToCampaign',
						action: 'Add profile to campaign',
						description: 'Add profile to the selected campaign',
						routing: {
							request: {
								method: 'POST',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/campaigns/{{$parameter["campaignId"]}}/audience',
								body: {
									profile_url: '={{$parameter["profileUrl"]}}',
								},
							},
						},
					},
					{
						name: 'Add Profile to Campaign with Custom Variables',
						value: 'addProfileToCampaignWithCustomVariables',
						action: 'Add profile to campaign with custom variables',
						description: 'Add profile to the selected campaign with custom variables',
						routing: {
							request: {
								method: 'POST',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/campaigns/{{$parameter["campaignId"]}}/audience/multiple',
								body: {
									type: 'profile_url',
									profiles: [
										{
											profile_url: '={{$parameter["profileUrl"]}}',
											custom_variables: '={{JSON.parse($parameter["customVariables"])}}',
										},
									],
								},
							},
						},
					},
					{
						name: 'Get Campaign',
						value: 'getCampaign',
						action: 'Get a campaign',
						description: 'Get a specific campaign by ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/campaigns/{{$parameter["campaignId"]}}',
							},
						},
					},
					{
						name: 'List Campaigns',
						value: 'listCampaigns',
						action: 'List campaigns',
						description: 'List all campaigns in the workspace',
						routing: {
							request: {
								method: 'GET',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/campaigns',
							},
						},
					},
					{
						name: 'Pause',
						value: 'pauseCampaign',
						action: 'Pause a campaign',
						description: 'Pause a running campaign',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/campaigns/{{$parameter["campaignId"]}}',
								body: {
									state: 'PAUSED',
								},
							},
						},
					},
					{
						name: 'Resume',
						value: 'resumeCampaign',
						action: 'Resume a campaign',
						description: 'Resume a paused campaign',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/campaigns/{{$parameter["campaignId"]}}',
								body: {
									state: 'ACTIVE',
								},
							},
						},
					},
				],
			},

			// LABEL OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['label'],
					},
				},
				options: [
					{
						name: 'List Labels',
						value: 'listLabels',
						action: 'List labels',
						description: 'List all labels for the selected workspace',
						routing: {
							request: {
								method: 'GET',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/labels',
							},
						},
					},
					{
						name: 'Add Label',
						value: 'addLabel',
						action: 'Add label',
						description: 'Add a new label to the selected workspace',
						routing: {
							request: {
								method: 'POST',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/labels',
								body: {
									name: '={{$parameter["labelName"]}}',
									color: '={{$parameter["labelColor"]}}',
								},
							},
						},
					},
				],
				default: 'listLabels',
			},

			// LEAD OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['lead'],
					},
				},
				options: [
					{
						name: 'Add Label To Lead',
						value: 'addLabelToLead',
						action: 'Add label to lead',
						description: 'Add a new label to the selected lead',
						routing: {
							request: {
								method: 'POST',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/leads/{{$parameter["leadId"]}}/labels/{{$parameter["labelId"]}}',
							},
						},
					},
					{
						name: 'Add Note To Lead',
						value: 'addNoteToLead',
						action: 'Add note to lead',
						description: 'Add a new note to the selected lead',
						routing: {
							request: {
								method: 'POST',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/leads/{{$parameter["leadId"]}}/notes',
								body: {
									text: '={{$parameter["noteText"]}}',
								},
							},
						},
					},
					{
						name: 'Get Lead',
						value: 'getLead',
						action: 'Get lead',
						description: 'Get a specific lead by ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/leads/{{$parameter["leadId"]}}',
							},
						},
					},
					{
						name: 'List Recent Leads',
						value: 'listRecentLeads',
						action: 'List recent leads',
						description: 'List recent leads for the selected workspace',
						routing: {
							request: {
								method: 'GET',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/recent-leads',
							},
						},
					},
					{
						name: 'Remove Label From Lead',
						value: 'removeLabelFromLead',
						action: 'Remove label from lead',
						description: 'Remove a label from the selected lead',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/leads/{{$parameter["leadId"]}}/labels/{{$parameter["labelId"]}}',
							},
						},
					},
				],
				default: 'listRecentLeads',
			},

			// TEMPLATE OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['template'],
					},
				},
				options: [
					{
						name: 'List Templates',
						value: 'listTemplates',
						action: 'List templates',
						description: 'List all templates in the selected workspace',
						routing: {
							request: {
								method: 'GET',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/templates',
							},
						},
					},
					{
						name: 'Get Template',
						value: 'getTemplate',
						action: 'Get template',
						description: 'Get a specific template by ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/templates/{{$parameter["templateId"]}}',
							},
						},
					},
					{
						name: 'Create Template',
						value: 'createTemplate',
						action: 'Create template',
						description: 'Create a new template in the selected workspace',
						routing: {
							request: {
								method: 'POST',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/templates',
								body: {
									name: '={{$parameter["templateName"]}}',
									type: '={{$parameter["templateType"]}}',
									subject: '={{$parameter["templateSubject"]}}',
									message: '={{$parameter["templateMessage"]}}',
									ai: '={{$parameter["templateAi"]}}',
								},
							},
						},
					},
					{
						name: 'Remove Template',
						value: 'removeTemplate',
						action: 'Remove template',
						description: 'Remove a template from the workspace',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/workspaces/{{$parameter["workspaceId"]}}/templates/{{$parameter["templateId"]}}',
							},
						},
					},
				],
				default: 'listTemplates',
			},

			...workspaceFields,
			...blacklistFields,
			...campaignFields,
			...conversationFields,
			...labelFields,
			...leadFields,
			...noteFields,
			...templateFields,
		],
	};
}

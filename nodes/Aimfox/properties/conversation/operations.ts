import { INodeProperties } from 'n8n-workflow';

export const conversationOperations: INodeProperties = {
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
					url: '=/accounts/{{$parameter["accountId"]}}/conversations/{{$parameter["conversationUrn"]}}',
					headers: {
						Authorization: '={{"Bearer " + $credentials.aimfoxApi.apiKey}}',
					},
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
					url: '=/accounts/{{$parameter["accountId"]}}/leads/{{$parameter["leadId"]}}/conversation',
					headers: {
						Authorization: '={{"Bearer " + $credentials.aimfoxApi.apiKey}}',
					},
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
					url: '/conversations',
					headers: {
						Authorization: '={{"Bearer " + $credentials.aimfoxApi.apiKey}}',
					},
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
					url: '=/accounts/{{$parameter["accountId"]}}/conversations/{{$parameter["conversationUrn"]}}/mark-as-read',
					headers: {
						Authorization: '={{"Bearer " + $credentials.aimfoxApi.apiKey}}',
					},
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
					url: '=/accounts/{{$parameter["accountId"]}}/conversations/{{$parameter["conversationUrn"]}}',
					headers: {
						Authorization: '={{"Bearer " + $credentials.aimfoxApi.apiKey}}',
					},
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
					url: '=/accounts/{{$parameter["accountId"]}}/conversations',
					headers: {
						Authorization: '={{"Bearer " + $credentials.aimfoxApi.apiKey}}',
					},
					body: {
						message: '={{$parameter["conversationMessage"]}}',
						recipients: ['={{$parameter["leadId"]}}'],
					},
				},
			},
		},
	],
	default: 'listConversations',
};

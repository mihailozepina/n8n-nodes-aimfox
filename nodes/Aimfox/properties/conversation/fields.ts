import { INodeProperties } from 'n8n-workflow';

export const conversationFields: INodeProperties[] = [
	{
		displayName: 'Conversation URN',
		name: 'conversationUrn',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['getConversation', 'sendMessageToConversation', 'markConversationAsRead'],
			},
		},
		default: '',
		placeholder:
			'2-MTczMTgzNzQyMTM4OGI1NzMzNC0wMDMmNDU5NGMxYzgtZGIyMi00Yzc4LWFjNTYtOWIyNDdmMzI4MmQwXzAxMg==',
		description: 'The URN of the conversation to retrieve',
		required: true,
	},
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: [
					'getLeadConversation',
					'startConversation',
					'sendMessageToConversation',
					'markConversationAsRead',
				],
			},
		},
		default: '',
		placeholder: '987654321',
		description: 'The LinkedIn ID of the account to retrieve the conversation for',
		required: true,
	},
	{
		displayName: 'Lead ID',
		name: 'leadId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['getLeadConversation', 'startConversation'],
			},
		},
		default: '',
		placeholder: '123123123',
		description: 'The LinkedIn ID of the lead the conversation was with',
		required: true,
	},
	{
		displayName: 'Conversation Message',
		name: 'conversationMessage',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['startConversation', 'sendMessageToConversation'],
			},
		},
		default: '',
		placeholder: 'Hello! How are you?',
		description: 'The message to send in the conversation',
		required: true,
	},
];

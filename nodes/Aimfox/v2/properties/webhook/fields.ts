import { INodeProperties } from 'n8n-workflow';

export const webhookFields: INodeProperties[] = [
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['editWebhook', 'deleteWebhook'],
			},
		},
		default: '',
		placeholder: '8bf1a6ac-9b4d-45f7-a021-74e1fc1a4586',
		description: 'The ID of the webhook to edit or delete',
		required: true,
	},
	{
		displayName: 'Webhook Name',
		name: 'webhookName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['createWebhook', 'editWebhook'],
			},
		},
		default: '',
		placeholder: 'My Webhook',
		description: 'The name of the webhook',
		required: true,
	},
	{
		displayName: 'Webhook URL',
		name: 'webhookUrl',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['createWebhook', 'editWebhook'],
			},
		},
		default: '',
		placeholder: 'https://example.com/webhook',
		description: 'The endpoint URL where webhook payloads will be sent',
		required: true,
	},
	{
		displayName: 'Webhook Events',
		name: 'webhookEvents',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['createWebhook', 'editWebhook'],
			},
		},
		options: [
			{ name: 'Account Logged In', value: 'account_logged_in' },
			{ name: 'Account Logged Out', value: 'account_logged_out' },
			{ name: 'Campaign Created', value: 'campaign_created' },
			{ name: 'Campaign Ended', value: 'campaign_ended' },
			{ name: 'Campaign Reply', value: 'campaign_reply' },
			{ name: 'Campaign Started', value: 'campaign_started' },
			{ name: 'Connect Accepted', value: 'accepted' },
			{ name: 'Connect Sent', value: 'connect' },
			{ name: 'Inbox Event', value: 'inbox_event' },
			{ name: 'Inmail Reply', value: 'inmail_reply' },
			{ name: 'Inmail Sent', value: 'inmail' },
			{ name: 'Lead Label Added', value: 'lead_label_added' },
			{ name: 'Message Request Sent', value: 'message_request' },
			{ name: 'Message Sent', value: 'message' },
			{ name: 'New Connection', value: 'new_connection' },
			{ name: 'New Reply', value: 'new_reply' },
			{ name: 'Profile Viewed', value: 'view' },
			{ name: 'Reply', value: 'reply' },
		],
		default: [],
		description: 'The events that will trigger this webhook',
		required: true,
	},
	{
		displayName: 'Integration',
		name: 'webhookIntegration',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['createWebhook'],
			},
		},
		default: false,
		description: 'Whether this webhook is for integration (should be false)',
		required: true,
	},
];

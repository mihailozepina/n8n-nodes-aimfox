import { INodeProperties } from 'n8n-workflow';

export const webhookOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['webhook'],
		},
	},
	options: [
		{
			name: 'List Webhooks',
			value: 'listWebhooks',
			action: 'List webhooks',
			description: 'List all webhooks in the selected workspace',
			routing: {
				request: {
					method: 'GET',
					url: '/webhooks',
					headers: {},
				},
			},
		},
		{
			name: 'Create Webhook',
			value: 'createWebhook',
			action: 'Create webhook',
			description: 'Create a new webhook in the selected workspace',
			routing: {
				request: {
					method: 'POST',
					url: '/webhooks',
					headers: {},
					body: {
						name: '={{$parameter["webhookName"]}}',
						events: '={{$parameter["webhookEvents"]}}',
						url: '={{$parameter["webhookUrl"]}}',
						integration: '={{$parameter["webhookIntegration"]}}',
					},
				},
			},
		},
		{
			name: 'Edit Webhook',
			value: 'editWebhook',
			action: 'Edit webhook',
			description: 'Edit an existing webhook in the workspace',
			routing: {
				request: {
					method: 'PATCH',
					url: '=/webhooks/{{$parameter["webhookId"]}}',
					headers: {},
					body: {
						name: '={{$parameter["webhookName"]}}',
						events: '={{$parameter["webhookEvents"]}}',
						url: '={{$parameter["webhookUrl"]}}',
					},
				},
			},
		},
		{
			name: 'Delete Webhook',
			value: 'deleteWebhook',
			action: 'Delete webhook',
			description: 'Delete a webhook from the workspace',
			routing: {
				request: {
					method: 'DELETE',
					url: '=/webhooks/{{$parameter["webhookId"]}}',
					headers: {},
				},
			},
		},
	],
	default: 'listWebhooks',
};

import {
	type IHookFunctions,
	type IWebhookFunctions,
	type INodeType,
	type INodeTypeDescription,
	type IWebhookResponseData,
	NodeConnectionType,
} from 'n8n-workflow';

import { aimfoxTriggerProperties } from './properties';

export class AimfoxTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Aimfox Trigger',
		name: 'aimfoxTrigger',
		icon: 'file:aimfox.svg',
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow when Aimfox events occur',
		defaults: {
			name: 'Aimfox Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'aimfoxApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.aimfox.com/api/v2',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: aimfoxTriggerProperties,
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');
				const events = this.getNodeParameter('events') as string[];

				const credentials = await this.getCredentials('aimfoxApi');

				const options = {
					headers: {
						Authorization: `Bearer ${credentials.apiKey}`,
						Accept: 'application/json',
					},
					method: 'GET' as const,
					url: `https://api.aimfox.com/api/v2/webhooks?integration=true`,
					json: true,
				};

				const responseData = await this.helpers.request.call(this, options);

				for (const webhook of responseData.webhooks) {
					const eventsMatch = JSON.stringify(webhook.events.sort()) === JSON.stringify(events.sort());

					if (webhook.url === webhookUrl && eventsMatch) {
						webhookData.webhookId = webhook.id;

						return true;
					}
				}

				return false;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const webhookUrl = this.getNodeWebhookUrl('default');
				const events = this.getNodeParameter('events');

				const credentials = await this.getCredentials('aimfoxApi');

				const options = {
					headers: {
						Authorization: `Bearer ${credentials.apiKey}`,
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'POST' as const,
					url: `https://api.aimfox.com/api/v2/webhooks`,
					body: {
						events: events,
						url: webhookUrl,
						name: 'n8n',
						integration: true,
					},
					json: true,
				};

				const responseData = await this.helpers.request.call(this, options);

				if (responseData.webhook.id === undefined) {
					return false;
				}

				webhookData.webhookId = responseData.webhook.id as string;

				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId !== undefined) {
					try {
						const credentials = await this.getCredentials('aimfoxApi');

						const options = {
							headers: {
								Authorization: `Bearer ${credentials.apiKey}`,
								Accept: 'application/json',
								'Content-Type': 'application/json',
							},
							method: 'DELETE' as const,
							url: `https://api.aimfox.com/api/v2/webhooks/${webhookData.webhookId}`,
							json: true,
						};

						await this.helpers.request.call(this, options);
					} catch (error) {
						return false;
					}

					delete webhookData.webhookId;
				}

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const body = this.getBodyData();

		return {
			workflowData: [this.helpers.returnJsonArray(body)],
		};
	}
}

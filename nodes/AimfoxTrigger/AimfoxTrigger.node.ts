import {
	type IHookFunctions,
	type IWebhookFunctions,
	type INodeType,
	type INodeTypeDescription,
	type IWebhookResponseData,
	NodeConnectionType,
} from 'n8n-workflow';

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
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Trigger On',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				options: [
					{
						name: 'Account Logged In Event',
						value: 'account_logged_in',
					},
					{
						name: 'Account Logged Out Event',
						value: 'account_logged_out',
					},
					{
						name: 'Connect Accepted Event',
						value: 'accepted',
					},
					{
						name: 'Connect Sent Event',
						value: 'connect',
					},
					{
						name: 'Inmail Reply Event',
						value: 'inmail_reply',
					},
					{
						name: 'Inmail Sent Event',
						value: 'inmail',
					},
					{
						name: 'Message Request Sent Event',
						value: 'message_request',
					},
					{
						name: 'Message Sent Event',
						value: 'message',
					},
					{
						name: 'New Connection Event',
						value: 'new_connection',
					},
					{
						name: 'New Reply Event',
						value: 'reply',
					},
					{
						name: 'Profile Viewed Event',
						value: 'view',
					},
				],
			},
		],
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
						'Content-Type': 'application/json',
					},
					method: 'GET' as const,
					uri: 'https://673b415297f2.ngrok-free.app/api/v1/subscriptions',
					json: true,
				};

				const responseData = await this.helpers.request.call(this, options);

				for (const webhook of responseData.webhooks) {
					if (webhook.url === webhookUrl && webhook.events === events) {
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
					uri: `https://673b415297f2.ngrok-free.app/api/v1/subscriptions`,
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
							uri: `https://673b415297f2.ngrok-free.app/api/v1/subscriptions/${webhookData.webhookId}`,
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

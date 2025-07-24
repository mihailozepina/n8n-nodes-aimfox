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
		requestDefaults: {
			baseURL: 'https://673b415297f2.ngrok-free.app/api/v1', // change to api.aimfox.com
			headers: {
				Authorization: '={{"Bearer " + $credentials.apiKey}}', // replace with jwt
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
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
				displayName: 'Action Name',
				name: 'actionName',
				type: 'string',
				description:
					'Choose any name you would like. It will show up as a server action in the app.',
				default: '',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');
				const actionName = this.getNodeParameter('actionName');
				// Check all the webhooks which exist already if it is identical to the
				// one that is supposed to get created.
				const endpoint = '/subscriptions';
				const credentials = await this.getCredentials('aimfoxApi');
				const options = {
					headers: {
						Authorization: `Bearer ${credentials.apiKey}`,
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'GET' as const,
					uri: `https://673b415297f2.ngrok-free.app/api/v1${endpoint}`,
					json: true,
				};
				const webhooks = await this.helpers.request.call(this, options);

				for (const webhook of webhooks.webhooks) {
					if (webhook.url === webhookUrl && webhook.actionName === actionName) {
						webhookData.webhookId = webhook.id;
						this.logger.debug(
							`Webhook with ID "${webhook.id}" already exists for action "${actionName}" at URL "${webhookUrl}"`,
						);

						return true;
					}

					this.logger.debug(
						`Webhook with ID "${webhook.id}" already exists for action "${actionName}" at URL "${webhookUrl}"`,
					);
				}

				return false;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const webhookUrl = this.getNodeWebhookUrl('default');
				const actionName = this.getNodeParameter('actionName');

				const endpoint = '/subscriptions';

				const body = {
					actionName,
					url: webhookUrl,
				};

				const credentials = await this.getCredentials('aimfoxApi');
				const options = {
					headers: {
						Authorization: `Bearer ${credentials.apiKey}`,
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'POST' as const,
					uri: `https://673b415297f2.ngrok-free.app/api/v1${endpoint}`,
					body,
					json: true,
				};
				const responseData = await this.helpers.request.call(this, options);

				if (responseData.webhook.id === undefined) {
					// Required data is missing so was not successful
					return false;
				}

				webhookData.webhookId = responseData.webhook.id as string;
				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				if (webhookData.webhookId !== undefined) {
					const endpoint = `/subscriptions/${webhookData.webhookId}`;

					try {
						const credentials = await this.getCredentials('aimfoxApi');
						const options = {
							headers: {
								Authorization: `Bearer ${credentials.apiKey}`,
								Accept: 'application/json',
								'Content-Type': 'application/json',
							},
							method: 'DELETE' as const,
							uri: `https://673b415297f2.ngrok-free.app/api/v1${endpoint}`,
							json: true,
						};
						await this.helpers.request.call(this, options);
					} catch (error) {
						return false;
					}

					// Remove from the static workflow data so that it is clear
					// that no webhooks are registered anymore
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

import {
	type IHookFunctions,
	type IWebhookFunctions,
	type INodeType,
	type INodeTypeDescription,
	type IWebhookResponseData,
	NodeConnectionTypes,
	IDataObject,
} from 'n8n-workflow';

import { aimfoxTriggerProperties } from './properties';
import { AIMFOX_DEFAULT_BASE_URL } from '../../credentials/AimfoxApi.credentials';

// The API base URL from the credentials (older credentials don't have one)
const getBaseUrl = async (context: IHookFunctions): Promise<string> => {
	const credentials = await context.getCredentials('aimfoxApi');
	const baseUrl = (credentials.baseUrl as string | undefined) || AIMFOX_DEFAULT_BASE_URL;

	return baseUrl.replace(/\/+$/, '');
};

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
		outputs: [NodeConnectionTypes.Main],
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
		properties: aimfoxTriggerProperties,
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId === undefined) {
					return false;
				}

				const options = {
					headers: {
						Accept: 'application/json',
					},
					method: 'GET' as const,
					url: `${await getBaseUrl(this)}/webhooks?integration=true`,
					json: true,
				};

				const responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'aimfoxApi', options);

				if (Array.isArray(responseData.webhooks)) {
					for (const webhook of responseData.webhooks) {
						if (webhook.id === webhookData.webhookId) {
							return true;
						}
					}
				}

				return false;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const webhookUrl = this.getNodeWebhookUrl('default');
				const events = this.getNodeParameter('events');

				const options = {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'POST' as const,
					url: `${await getBaseUrl(this)}/webhooks`,
					body: {
						events: events,
						url: webhookUrl,
						name: 'n8n',
						integration: true,
					},
					json: true,
				};

				const responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'aimfoxApi', options);

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
						const options = {
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json',
							},
							method: 'DELETE' as const,
							url: `${await getBaseUrl(this)}/webhooks/${webhookData.webhookId}`,
							json: true,
						};

						await this.helpers.httpRequestWithAuthentication.call(this, 'aimfoxApi', options);
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
		const req = this.getRequestObject();

		return {
			workflowData: [this.helpers.returnJsonArray(req.body as IDataObject[])],
		};
	}
}

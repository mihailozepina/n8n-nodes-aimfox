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
				displayName: 'Event Type',
				name: 'eventType',
				type: 'options',
				description: 'Select the event type that will trigger the workflow',
				options: [
					{ name: 'Account Logged In', value: 'account_logged_in' },
					{ name: 'Account Logged Out', value: 'account_logged_out' },
					{ name: 'Connect Accepted', value: 'accepted' },
					{ name: 'Connect Sent', value: 'connect' },
					{ name: 'Inmail Reply', value: 'inmail_reply' },
					{ name: 'Inmail Sent', value: 'inmail' },
					{ name: 'Message Request Sent', value: 'message_request' },
					{ name: 'Message Sent', value: 'message' },
					{ name: 'New Connection', value: 'new_connection' },
					{ name: 'New Reply', value: 'reply' },
					{ name: 'Profile Viewed', value: 'view' },
				],
				default: 'account_logged_in',
				required: true,
			},
			{
				displayName: 'Trigger On',
				name: 'updates',
				type: 'multiOptions',
				required: true,
				default: [],
				options: [
					{
						name: 'Account Review Update',
						value: 'account_review_update',
					},
					{
						name: 'Account Update',
						value: 'account_update',
					},
					{
						name: 'Business Capability Update',
						value: 'business_capability_update',
					},
					{
						name: 'Message Template Quality Update',
						value: 'message_template_quality_update',
					},
					{
						name: 'Message Template Status Update',
						value: 'message_template_status_update',
					},
					{
						name: 'Messages',
						value: 'messages',
					},
					{
						name: 'Phone Number Name Update',
						value: 'phone_number_name_update',
					},
					{
						name: 'Phone Number Quality Update',
						value: 'phone_number_quality_update',
					},
					{
						name: 'Security',
						value: 'security',
					},
					{
						name: 'Template Category Update',
						value: 'template_category_update',
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
				const eventType = this.getNodeParameter('eventType');

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
					if (webhook.url === webhookUrl && webhook.eventType === eventType) {
						webhookData.webhookId = webhook.id;

						return true;
					}
				}

				return false;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const webhookUrl = this.getNodeWebhookUrl('default');
				const eventType = this.getNodeParameter('eventType');

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
						events: [eventType],
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

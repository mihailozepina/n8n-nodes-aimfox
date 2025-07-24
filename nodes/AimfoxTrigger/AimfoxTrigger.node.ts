import {
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
	NodeConnectionType,
	IHttpRequestOptions,
} from 'n8n-workflow';

export class AimfoxTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Aimfox Trigger',
		name: 'aimfoxTrigger',
		icon: 'file:aimfox.svg',
		group: ['trigger'],
		version: 1,
		description: 'Triggers when events happen in Aimfox',
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
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
				restartWebhook: true,
			},
		],
		credentials: [
			{
				name: 'aimfoxApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Trigger On',
				name: 'triggerOn',
				type: 'options',
				options: [
					{
						name: 'Campaign Completed',
						value: 'campaign.completed',
						description: 'Triggers when a campaign is completed',
					},
					{
						name: 'Campaign Started',
						value: 'campaign.started',
						description: 'Triggers when a campaign is started',
					},
					{
						name: 'Contact Created',
						value: 'contact.created',
						description: 'Triggers when a new contact is created',
					},
					{
						name: 'Contact Deleted',
						value: 'contact.deleted',
						description: 'Triggers when a contact is deleted',
					},
					{
						name: 'Contact Updated',
						value: 'contact.updated',
						description: 'Triggers when a contact is updated',
					},
					{
						name: 'Lead Status Changed',
						value: 'lead.status_changed',
						description: 'Triggers when lead status changes',
					},
					{
						name: 'Message Received',
						value: 'message.received',
						description: 'Triggers when a message is received',
					},
					{
						name: 'Message Sent',
						value: 'message.sent',
						description: 'Triggers when a message is sent',
					},
					{
						name: 'New Lead',
						value: 'lead.created',
						description: 'Triggers when a new lead is generated',
					},
				],
				default: 'contact.created',
				required: true,
			},

			// Conditional fields based on trigger type
			{
				displayName: 'Campaign ID',
				name: 'campaignId',
				type: 'string',
				displayOptions: {
					show: {
						triggerOn: ['campaign.started', 'campaign.completed'],
					},
				},
				default: '',
				description: 'Only trigger for specific campaign (leave empty for all campaigns)',
			},

			{
				displayName: 'Lead Status',
				name: 'leadStatus',
				type: 'options',
				displayOptions: {
					show: {
						triggerOn: ['lead.status_changed'],
					},
				},
				options: [
					{ name: 'Any Status', value: '' },
					{ name: 'Contacted', value: 'contacted' },
					{ name: 'Converted', value: 'converted' },
					{ name: 'Dead', value: 'dead' },
					{ name: 'New', value: 'new' },
					{ name: 'Qualified', value: 'qualified' },
				],
				default: '',
				description:
					'Only trigger when lead changes to this status (leave empty for any status change)',
			},

			{
				displayName: 'Contact Tags',
				name: 'contactTags',
				type: 'string',
				displayOptions: {
					show: {
						triggerOn: ['contact.created', 'contact.updated'],
					},
				},
				default: '',
				placeholder: 'tag1,tag2,tag3',
				description:
					'Only trigger for contacts with these tags (comma-separated, leave empty for all)',
			},
		],
	};

	async webhookCheckExists(this: IWebhookFunctions): Promise<boolean> {
		const webhookUrl = this.getNodeWebhookUrl('default');

		try {
			const options: IHttpRequestOptions = {
				method: 'GET',
				url: '/webhooks',
			};

			const response = await this.helpers.httpRequest(options);
			const webhooks = response.data || response;

			// Check if webhook with our URL already exists
			return Array.isArray(webhooks) && webhooks.some((webhook: any) => webhook.url === webhookUrl);
		} catch (error) {
			return false;
		}
	}

	async webhookCreate(this: IWebhookFunctions): Promise<boolean> {
		const webhookUrl = this.getNodeWebhookUrl('default');
		const triggerOn = this.getNodeParameter('triggerOn') as string;

		const options: IHttpRequestOptions = {
			method: 'POST', // Changed from GET to POST
			url: '/webhooks',
			body: {
				url: webhookUrl,
				events: [triggerOn],
				active: true,
			},
		};

		try {
			await this.helpers.httpRequest(options);
			return true;
		} catch (error) {
			return false;
		}
	}

	async webhookDelete(this: IWebhookFunctions): Promise<boolean> {
		const webhookUrl = this.getNodeWebhookUrl('default');

		try {
			// First, find the webhook ID
			const getOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/webhooks',
			};

			const response = await this.helpers.httpRequest(getOptions);
			const webhooks = response.data || response;
			const webhook = Array.isArray(webhooks) && webhooks.find((wh: any) => wh.url === webhookUrl);

			if (webhook) {
				const deleteOptions: IHttpRequestOptions = {
					method: 'DELETE',
					url: `/webhooks/${webhook.id}`, // Use relative URL, not absolute
				};

				await this.helpers.httpRequest(deleteOptions);
			}
			return true;
		} catch (error) {
			return false;
		}
	}

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();
		const triggerOn = this.getNodeParameter('triggerOn') as string;

		// Get webhook event type from the request headers
		const headers = this.getHeaderData();
		const eventType = headers['x-aimfox-event'] as string;

		// Check if this webhook matches our trigger configuration
		if (eventType !== triggerOn) {
			// Return empty if event doesn't match our trigger
			return {
				noWebhookResponse: true,
			};
		}

		// Additional filtering based on parameters
		const campaignId = this.getNodeParameter('campaignId', '') as string;
		const leadStatus = this.getNodeParameter('leadStatus', '') as string;
		const contactTags = this.getNodeParameter('contactTags', '') as string;

		// Apply filters
		if (campaignId && bodyData.campaign_id !== campaignId) {
			return { noWebhookResponse: true };
		}

		if (leadStatus && bodyData.status !== leadStatus) {
			return { noWebhookResponse: true };
		}

		if (contactTags) {
			const requiredTags = contactTags.split(',').map((tag) => tag.trim());
			const contactTagsArray = Array.isArray(bodyData.tags) ? bodyData.tags : [];
			const hasRequiredTag = requiredTags.some((tag) => contactTagsArray.includes(tag));
			if (!hasRequiredTag) {
				return { noWebhookResponse: true };
			}
		}

		return {
			workflowData: [
				[
					{
						json: {
							event_type: eventType,
							timestamp: new Date().toISOString(),
							data: bodyData,
						},
					},
				],
			],
		};
	}
}

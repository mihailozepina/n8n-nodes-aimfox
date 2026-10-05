import { INodeProperties } from 'n8n-workflow';

export const campaignFields: INodeProperties[] = [
	{
		displayName: 'Campaign ID',
		name: 'campaignId',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: [
					'resumeCampaign',
					'pauseCampaign',
					'addProfileToCampaign',
					'getCampaign',
					'addProfileToCampaignWithCustomVariables',
					'removeProfileFromCampaign',
				],
			},
		},
		typeOptions: {
			loadOptions: {
				routing: {
					request: {
						method: 'GET',
						url: '/campaigns',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'campaigns',
								},
							},
							{
								type: 'setKeyValue',
								properties: {
									name: '={{$responseItem.name}}',
									value: '={{$responseItem.id}}',
								},
							},
						],
					},
				},
			},
		},
		default: '',
		description:
			'Select the Aimfox campaign. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Profile URL',
		name: 'profileUrl',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['addProfileToCampaign', 'addProfileToCampaignWithCustomVariables'],
			},
		},
		default: '',
		placeholder: 'https://www.linkedin.com/in/john-doe-bb1869208/',
		description: 'The LinkedIn URL of the profile to add to the campaign',
		required: true,
	},
	{
		displayName: 'Custom Variables (JSON)',
		name: 'customVariables',
		type: 'json',
		required: true,
		default: '',
		description: 'Custom variables to send with the profile, in JSON format',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['addProfileToCampaignWithCustomVariables'],
			},
		},
	},
	{
		displayName: 'Campaign Name',
		name: 'campaignName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['createCampaign'],
			},
		},
		default: '',
		placeholder: 'My Campaign',
		description: 'The name of the campaign',
		required: true,
	},
	{
		displayName: 'Outreach Type',
		name: 'outreachType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['createCampaign'],
			},
		},
		options: [
			{
				name: 'Connect',
				value: 'connect',
				description: 'Send connection requests',
			},
			{
				name: 'InMail',
				value: 'inmail',
				description: 'Send InMails',
			},
			{
				name: 'Inbound',
				value: 'drip',
				description: 'Message existing 1st-degree connections (the API calls this a drip campaign). Takes exactly one account.',
			},
		],
		default: 'connect',
		description: 'The outreach type for the campaign',
		required: true,
	},
	{
		displayName: 'Account IDs',
		name: 'accountIds',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['createCampaign'],
			},
		},
		default: '',
		placeholder: '885983605, 123456789',
		description: 'Comma-separated list of account IDs to assign to the campaign',
		required: true,
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['createCampaign'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'List ID',
				name: 'listId',
				type: 'string',
				default: '',
				description: 'Run the campaign on an existing list. Leave it out to create a new, empty list for the campaign.',
				routing: {
					send: {
						type: 'body',
						property: 'list_id',
					},
				},
			},
		],
	},
	{
		displayName: 'Profile URN or Public Identifier',
		name: 'profileUrnOrIdentifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['removeProfileFromCampaign'],
			},
		},
		default: '',
		placeholder: 'john-doe-bb1869208 or ACoAAAK-hCcB6RvA71OCuRk-JHYpV6FFKIjbxpY',
		description:
			'The LinkedIn URN or public identifier of the profile to remove (e.g., from URL linkedin.com/in/john-doe → john-doe)',
		required: true,
	},
];

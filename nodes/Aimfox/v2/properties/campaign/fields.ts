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
					'removeProfilesByUrn',
					'getCampaignMetrics',
				],
			},
		},
		typeOptions: {
			loadOptions: {
				routing: {
					request: {
						method: 'POST',
						url: '/campaigns:search',
						body: {},
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
				displayName: 'Clone List',
				name: 'cloneList',
				type: 'boolean',
				default: false,
				description: 'Whether to run on a private copy of the list, so later changes to the list don\'t affect the campaign. Only with List ID.',
				routing: {
					send: {
						type: 'body',
						property: 'clone_list',
					},
				},
			},
			{
				displayName: 'Exclude Active Targets',
				name: 'excludeActiveTargets',
				type: 'boolean',
				default: true,
				description: 'Whether to skip profiles another active campaign is already targeting',
				routing: {
					send: {
						type: 'body',
						property: 'exclude_active_targets',
					},
				},
			},
			{
				displayName: 'Exclude Previous Targets',
				name: 'excludePreviousTargets',
				type: 'boolean',
				default: true,
				description: 'Whether to skip profiles you targeted in earlier campaigns',
				routing: {
					send: {
						type: 'body',
						property: 'exclude_previous_targets',
					},
				},
			},
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
		displayName: 'Public Identifier',
		name: 'publicIdentifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['removeProfileFromCampaign'],
			},
		},
		default: '',
		placeholder: 'john-doe-bb1869208',
		description: 'The public identifier of the profile to remove (from linkedin.com/in/john-doe → john-doe)',
		required: true,
	},
	{
		displayName: 'Profile URNs',
		name: 'profileUrns',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['removeProfilesByUrn'],
			},
		},
		default: '',
		placeholder: 'ACoAAAK-hCcB6RvA71OCuRk-JHYpV6FFKIjbxpY, ACoAAEJf0cEB1xJUsEqzamNA07--LN7lnZHDdbk',
		description: 'Comma-separated LinkedIn URNs of the profiles to remove',
		required: true,
	},
];

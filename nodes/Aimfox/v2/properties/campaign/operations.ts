import { INodeProperties } from 'n8n-workflow';

export const campaignOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	default: 'listCampaigns',
	displayOptions: {
		show: {
			resource: ['campaign'],
		},
	},
	options: [
		{
			name: 'Add Profile to Campaign',
			value: 'addProfileToCampaign',
			action: 'Add profile to campaign',
			description: 'Add profile to the selected campaign',
			routing: {
				request: {
					method: 'POST',
					url: '=/campaigns/{{$parameter["campaignId"]}}/targets',
					headers: {},
					body: {
						type: 'profile_url',
						profiles: [
							{
								profile_url: '={{$parameter["profileUrl"]}}',
								custom_variables: {},
							},
						],
					},
				},
			},
		},
		{
			name: 'Add Profile to Campaign with Custom Variables',
			value: 'addProfileToCampaignWithCustomVariables',
			action: 'Add profile to campaign with custom variables',
			description: 'Add profile to the selected campaign with custom variables',
			routing: {
				request: {
					method: 'POST',
					url: '=/campaigns/{{$parameter["campaignId"]}}/targets',
					headers: {},
					body: {
						type: 'profile_url',
						profiles: [
							{
								profile_url: '={{$parameter["profileUrl"]}}',
								custom_variables: '={{JSON.parse($parameter["customVariables"])}}',
							},
						],
					},
				},
			},
		},
		{
			name: 'Create Campaign',
			value: 'createCampaign',
			action: 'Create a campaign',
			description: 'Create a new Aimfox campaign. Give it a flow (Flow → Save Flow) before starting it.',
			routing: {
				request: {
					method: 'POST',
					url: '/campaigns',
					headers: {},
					body: {
						name: '={{$parameter["campaignName"]}}',
						account_ids: '={{$parameter["accountIds"].split(",").map(id => id.trim())}}',
					},
				},
			},
		},
		{
			name: 'Get Campaign',
			value: 'getCampaign',
			action: 'Get a campaign',
			description: 'Get a specific campaign by ID',
			routing: {
				request: {
					method: 'GET',
					url: '=/campaigns/{{$parameter["campaignId"]}}',
					headers: {},
				},
			},
		},
		{
			name: 'Get Campaign Metrics',
			value: 'getCampaignMetrics',
			action: 'Get campaign metrics',
			description: "Get a campaign's results: views, connections, messages, InMails, replies and more",
			routing: {
				request: {
					method: 'POST',
					url: '=/campaigns/{{$parameter["campaignId"]}}/metrics',
					headers: {},
					body: {},
				},
			},
		},
		{
			name: 'List Campaigns',
			value: 'listCampaigns',
			action: 'List campaigns',
			description: 'List all campaigns in the workspace',
			routing: {
				request: {
					method: 'POST',
					url: '/campaigns:search',
					headers: {},
					body: {},
				},
			},
		},
		{
			name: 'Pause',
			value: 'pauseCampaign',
			action: 'Pause a campaign',
			description: 'Pause a running campaign',
			routing: {
				request: {
					method: 'PATCH',
					url: '=/campaigns/{{$parameter["campaignId"]}}',
					headers: {},
					body: {
						state: 'PAUSED',
					},
				},
			},
		},
		{
			name: 'Remove Profile From Campaign',
			value: 'removeProfileFromCampaign',
			action: 'Remove profile from campaign',
			description: 'Remove a profile from the selected campaign by its public identifier',
			routing: {
				request: {
					method: 'DELETE',
					url: '=/campaigns/{{$parameter["campaignId"]}}/targets/{{$parameter["publicIdentifier"]}}',
					headers: {},
				},
			},
		},
		{
			name: 'Remove Profiles From Campaign by URN',
			value: 'removeProfilesByUrn',
			action: 'Remove profiles from campaign by URN',
			description: 'Remove one or more profiles from the selected campaign by their LinkedIn URNs',
			routing: {
				request: {
					method: 'POST',
					url: '=/campaigns/{{$parameter["campaignId"]}}/targets:delete',
					headers: {},
					body: {
						urns: '={{$parameter["profileUrns"].split(",").map(urn => urn.trim())}}',
					},
				},
			},
		},
		{
			name: 'Start or Resume',
			value: 'resumeCampaign',
			action: 'Start or resume a campaign',
			description: 'Start a new campaign or resume a paused one. The campaign needs a flow.',
			routing: {
				request: {
					method: 'PATCH',
					url: '=/campaigns/{{$parameter["campaignId"]}}',
					headers: {},
					body: {
						state: 'ACTIVE',
					},
				},
			},
		},
	],
};

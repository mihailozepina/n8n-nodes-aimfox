import { INodeProperties } from 'n8n-workflow';

export const flowOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['flow'],
		},
	},
	options: [
		{
			name: 'Get Flow',
			value: 'getFlow',
			action: 'Get a flow version',
			description: "Get one flow version's definition, including the step IDs used by Update Flow Step",
			routing: {
				request: {
					method: 'GET',
					url: '=/campaigns/{{$parameter["flowCampaignId"]}}/flows/{{$parameter["flowId"]}}',
					headers: {},
				},
			},
		},
		{
			name: 'Get Flow Metrics',
			value: 'getFlowMetrics',
			action: 'Get flow metrics',
			description: "Get a flow version's results across all sending accounts",
			routing: {
				request: {
					// POST like campaign metrics; with no account_ids the API counts all accounts
					method: 'POST',
					url: '=/campaigns/{{$parameter["flowCampaignId"]}}/flows/{{$parameter["flowId"]}}/metrics',
					headers: {},
					body: {},
				},
			},
		},
		{
			name: 'List Flow Versions',
			value: 'listFlowVersions',
			action: 'List flow versions',
			description: "List a campaign's flow versions, newest first. The current one is what new leads run.",
			routing: {
				request: {
					method: 'GET',
					url: '=/campaigns/{{$parameter["flowCampaignId"]}}/flows',
					headers: {},
				},
			},
		},
		{
			name: 'Save Flow',
			value: 'saveFlow',
			action: 'Save a flow',
			description:
				"Save a campaign's flow: what it does for each lead. Before the campaign's first start this replaces the draft; after it, each save is a new version.",
			routing: {
				request: {
					method: 'POST',
					url: '=/campaigns/{{$parameter["flowCampaignId"]}}/flows',
					headers: {},
					body: '={{typeof $parameter["flowDefinition"] === "string" ? JSON.parse($parameter["flowDefinition"]) : $parameter["flowDefinition"]}}',
				},
			},
		},
		{
			name: 'Update Flow Step',
			value: 'updateFlowStep',
			action: 'Update a flow step',
			description: "Change one step's own fields (message text, a wait, a note) in place, without a new version",
			routing: {
				request: {
					method: 'PATCH',
					url: '=/campaigns/{{$parameter["flowCampaignId"]}}/flows/{{$parameter["flowId"]}}/steps/{{$parameter["stepId"]}}',
					headers: {},
					body: '={{typeof $parameter["stepFields"] === "string" ? JSON.parse($parameter["stepFields"]) : $parameter["stepFields"]}}',
				},
			},
		},
	],
	default: 'listFlowVersions',
};

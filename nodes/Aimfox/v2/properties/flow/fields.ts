import { INodeProperties } from 'n8n-workflow';

const exampleFlow = `{
  "schema_version": 1,
  "connection_preference": "must_not_connected",
  "steps": [
    { "action": "view" },
    { "action": "connect", "note": "Hi {{LINKEDIN.FIRST_NAME}}, would love to connect!", "note_optional": true },
    {
      "wait_for": "accepted",
      "expires_in": 1209600000,
      "on_condition": [
        { "wait": 86400000 },
        { "action": "message", "template": "Thanks for connecting, {{LINKEDIN.FIRST_NAME}}!" }
      ],
      "on_expire": [{ "action": "withdraw" }]
    }
  ]
}`;

export const flowFields: INodeProperties[] = [
	{
		displayName: 'Campaign ID',
		name: 'flowCampaignId',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['flow'],
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
			'Select the campaign. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Flow Version ID',
		name: 'flowId',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['flow'],
				operation: ['getFlow', 'getFlowMetrics', 'updateFlowStep'],
			},
		},
		typeOptions: {
			loadOptionsDependsOn: ['flowCampaignId'],
			loadOptions: {
				routing: {
					request: {
						method: 'GET',
						url: '=/campaigns/{{$parameter["flowCampaignId"]}}/flows',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'versions',
								},
							},
							{
								type: 'setKeyValue',
								properties: {
									name: '={{$responseItem.created_at + ($responseItem.current ? " (Current)" : "")}}',
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
			'Select the flow version. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Flow Definition (JSON)',
		name: 'flowDefinition',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['flow'],
				operation: ['saveFlow'],
			},
		},
		default: exampleFlow,
		description:
			'The flow: connection preference, steps (view, connect, message, InMail, wait, filters, conditions, A/B splits) and an optional reply subsequence. Times are milliseconds. See Flows in the <a href="https://docs.aimfox.com">Aimfox API docs</a> for the full format.',
	},
	{
		displayName: 'Step ID',
		name: 'stepId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['flow'],
				operation: ['updateFlowStep'],
			},
		},
		default: '',
		description: 'The step to change, from the flow definition (Get Flow)',
	},
	{
		displayName: 'Step Fields (JSON)',
		name: 'stepFields',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['flow'],
				operation: ['updateFlowStep'],
			},
		},
		default: '{\n  "template": "New message text"\n}',
		description:
			"The step's fields to change, e.g. template for a message step or wait for a wait step. Structure can't be changed here; save a new flow instead.",
	},
];

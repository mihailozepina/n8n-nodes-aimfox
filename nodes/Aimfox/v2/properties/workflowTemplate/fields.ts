import { INodeProperties } from 'n8n-workflow';

export const workflowTemplateFields: INodeProperties[] = [
	{
		displayName: 'Workflow Template ID',
		name: 'workflowTemplateId',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['workflowTemplate'],
				operation: ['getWorkflowTemplate', 'updateWorkflowTemplate', 'deleteWorkflowTemplate'],
			},
		},
		typeOptions: {
			loadOptions: {
				routing: {
					request: {
						method: 'GET',
						url: '/workflow-templates',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'templates',
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
			'Select the workflow template. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Name',
		name: 'workflowTemplateName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['workflowTemplate'],
				operation: ['createWorkflowTemplate'],
			},
		},
		default: '',
	},
	{
		displayName: 'Definition (JSON)',
		name: 'workflowTemplateDefinition',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['workflowTemplate'],
				operation: ['createWorkflowTemplate'],
			},
		},
		default: '{}',
		description: 'A flow definition, in the same format as Flow → Save Flow',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['workflowTemplate'],
				operation: ['updateWorkflowTemplate'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Definition (JSON)',
				name: 'definition',
				type: 'json',
				default: '{}',
				routing: {
					send: {
						type: 'body',
						property: 'definition',
						value: '={{typeof $value === "string" ? JSON.parse($value) : $value}}',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},
		],
	},
];

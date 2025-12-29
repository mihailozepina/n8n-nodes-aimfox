import { INodeProperties } from 'n8n-workflow';

export const labelOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['label'],
		},
	},
	options: [
		{
			name: 'Add Label',
			value: 'addLabel',
			action: 'Add label',
			description: 'Add a new label to the selected workspace',
			routing: {
				request: {
					method: 'POST',
					url: '/labels',
					headers: {},
					body: {
						name: '={{$parameter["labelName"]}}',
						color: '={{$parameter["labelColor"]}}',
					},
				},
			},
		},
		{
			name: 'Delete Label',
			value: 'deleteLabel',
			action: 'Delete label',
			description: 'Delete a label from the workspace',
			routing: {
				request: {
					method: 'DELETE',
					url: '=/labels/{{$parameter["workspaceLabelId"]}}',
					headers: {},
				},
			},
		},
		{
			name: 'Edit Label',
			value: 'editLabel',
			action: 'Edit label',
			description: 'Edit an existing label in the workspace',
			routing: {
				request: {
					method: 'PATCH',
					url: '=/labels/{{$parameter["workspaceLabelId"]}}',
					headers: {},
					body: {
						name: '={{$parameter["labelName"]}}',
						color: '={{$parameter["labelColor"]}}',
					},
				},
			},
		},
		{
			name: 'List Labels',
			value: 'listLabels',
			action: 'List labels',
			description: 'List all labels for the selected workspace',
			routing: {
				request: {
					method: 'GET',
					url: '/labels',
					headers: {},
				},
			},
		},
	],
	default: 'listLabels',
};

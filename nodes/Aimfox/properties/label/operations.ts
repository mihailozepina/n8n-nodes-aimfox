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
			name: 'List Labels',
			value: 'listLabels',
			action: 'List labels',
			description: 'List all labels for the selected workspace',
			routing: {
				request: {
					method: 'GET',
					url: '/labels',
					headers: {
						Authorization: '={{"Bearer " + $credentials.aimfoxApi.apiKey}}',
					},
				},
			},
		},
		{
			name: 'Add Label',
			value: 'addLabel',
			action: 'Add label',
			description: 'Add a new label to the selected workspace',
			routing: {
				request: {
					method: 'POST',
					url: '/labels',
					headers: {
						Authorization: '={{"Bearer " + $credentials.aimfoxApi.apiKey}}',
					},
					body: {
						name: '={{$parameter["labelName"]}}',
						color: '={{$parameter["labelColor"]}}',
					},
				},
			},
		},
	],
	default: 'listLabels',
};

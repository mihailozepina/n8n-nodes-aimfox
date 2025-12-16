import { INodeProperties } from 'n8n-workflow';

export const templateOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['template'],
		},
	},
	options: [
		{
			name: 'List Templates',
			value: 'listTemplates',
			action: 'List templates',
			description: 'List all templates in the selected workspace',
			routing: {
				request: {
					method: 'GET',
					url: '/templates',
					headers: {},
				},
			},
		},
		{
			name: 'Get Template',
			value: 'getTemplate',
			action: 'Get template',
			description: 'Get a specific template by ID',
			routing: {
				request: {
					method: 'GET',
					url: '=/templates/{{$parameter["templateId"]}}',
					headers: {},
				},
			},
		},
		{
			name: 'Create Template',
			value: 'createTemplate',
			action: 'Create template',
			description: 'Create a new template in the selected workspace',
			routing: {
				request: {
					method: 'POST',
					url: '/templates',
					headers: {},
					body: {
						name: '={{$parameter["templateName"]}}',
						type: '={{$parameter["templateType"]}}',
						subject: '={{$parameter["templateSubject"]}}',
						message: '={{$parameter["templateMessage"]}}',
						ai: '={{$parameter["templateAi"]}}',
					},
				},
			},
		},
		{
			name: 'Remove Template',
			value: 'removeTemplate',
			action: 'Remove template',
			description: 'Remove a template from the workspace',
			routing: {
				request: {
					method: 'DELETE',
					url: '=/templates/{{$parameter["templateId"]}}',
					headers: {},
				},
			},
		},
	],
	default: 'listTemplates',
};

import { INodeProperties } from 'n8n-workflow';

export const templateFields: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['getTemplate', 'removeTemplate'],
			},
		},
		default: '',
		placeholder: '6b36b919-79ab-4656-84ea-e23a9f840df9',
		description: 'The ID of the template to retrieve',
		required: true,
	},
	{
		displayName: 'Template Name',
		name: 'templateName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['createTemplate'],
			},
		},
		default: '',
		placeholder: 'Template Name',
		description: 'The name of the template to create',
		required: true,
	},
	{
		displayName: 'Template Subject',
		name: 'templateSubject',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['createTemplate'],
			},
		},
		default: '',
		placeholder: 'Template Subject',
		description: 'The subject of the template to create',
		required: true,
	},
	{
		displayName: 'Template Message',
		name: 'templateMessage',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['createTemplate'],
			},
		},
		default: '',
		placeholder: 'Template Message',
		description: 'The message of the template to create',
		required: true,
	},
	{
		displayName: 'Template Type',
		name: 'templateType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['createTemplate'],
			},
		},
		options: [
			{ name: 'Note', value: 'NOTE_TEMPLATE' },
			{ name: 'Inmail', value: 'INMAIL_TEMPLATE' },
			{ name: 'Message', value: 'MESSAGE_TEMPLATE' },
		],
		default: 'NOTE_TEMPLATE',
		description: 'The type of the template to create',
		required: true,
	},
	{
		displayName: 'Template AI',
		name: 'templateAi',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['createTemplate'],
			},
		},
		default: false,
		description: 'Whether to use AI for the template or not',
		required: true,
	},
];

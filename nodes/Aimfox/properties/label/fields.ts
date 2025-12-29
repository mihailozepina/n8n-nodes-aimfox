import { INodeProperties } from 'n8n-workflow';

export const labelFields: INodeProperties[] = [
	{
		displayName: 'Label ID',
		name: 'labelId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['addLabelToLead', 'removeLabelFromLead'],
			},
		},
		default: '',
		placeholder: '83b3aa1d-cda0-42b3-845c-afccf1192dc5',
		description: 'The ID of the label',
		required: true,
	},
	{
		displayName: 'Label ID',
		name: 'workspaceLabelId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['editLabel', 'deleteLabel'],
			},
		},
		default: '',
		placeholder: '83b3aa1d-cda0-42b3-845c-afccf1192dc5',
		description: 'The ID of the label to edit or delete',
		required: true,
	},
	{
		displayName: 'Label Name',
		name: 'labelName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['addLabel', 'editLabel'],
			},
		},
		default: '',
		placeholder: 'Label Name',
		description: 'The name of the label',
		required: true,
	},
	{
		displayName: 'Label Color',
		name: 'labelColor',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['addLabel', 'editLabel'],
			},
		},
		options: [
			{ name: 'Blue', value: 'info' },
			{ name: 'Gray', value: 'quaternary' },
			{ name: 'Green', value: 'success' },
			{ name: 'Purple', value: 'secondary' },
			{ name: 'Red', value: 'danger' },
			{ name: 'Yellow', value: 'yellow' },
		],
		default: 'info',
		description: 'The color of the label',
		required: true,
	},
];

import { INodeProperties } from 'n8n-workflow';

export const noteFields: INodeProperties[] = [
	{
		displayName: 'Note Text',
		name: 'noteText',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['addNoteToLead'],
			},
		},
		default: '',
		placeholder: 'Note text',
		description: 'The text of the note to add to the lead',
		required: true,
	},
];

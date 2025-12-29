import { INodeProperties } from 'n8n-workflow';

export const noteFields: INodeProperties[] = [
	{
		displayName: 'Note Text',
		name: 'noteText',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['addNoteToLead', 'updateNote'],
			},
		},
		default: '',
		placeholder: 'Note text',
		description: 'The text of the note',
		required: true,
	},
	{
		displayName: 'Note ID',
		name: 'noteId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['updateNote', 'deleteNoteFromLead'],
			},
		},
		default: '',
		placeholder: '48ae319e-e276-4492-bacd-2eb064230c97',
		description: 'The ID of the note',
		required: true,
	},
];

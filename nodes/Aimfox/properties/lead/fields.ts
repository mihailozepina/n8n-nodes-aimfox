import { INodeProperties } from 'n8n-workflow';

export const leadFields: INodeProperties[] = [
	{
		displayName: 'Lead ID',
		name: 'leadId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['getLead', 'addLabelToLead', 'removeLabelFromLead', 'addNoteToLead'],
			},
		},
		default: '',
		placeholder: '1113575872',
		description: 'The LinkedIn ID of the lead to retrieve',
		required: true,
	},
];

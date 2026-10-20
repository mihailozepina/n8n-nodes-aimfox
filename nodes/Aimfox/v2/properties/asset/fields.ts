import { INodeProperties } from 'n8n-workflow';

const attachmentsValue = '={{$value.split(",").map(id => id.trim()).filter(Boolean)}}';

export const assetFields: INodeProperties[] = [
	{
		displayName: 'Asset ID',
		name: 'assetId',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['asset'],
				operation: ['getAsset', 'updateAsset', 'deleteAsset'],
			},
		},
		typeOptions: {
			loadOptions: {
				routing: {
					request: {
						method: 'GET',
						url: '/assets',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'assets',
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
			'Select the asset. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Type',
		name: 'assetType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['asset'],
				operation: ['createAsset'],
			},
		},
		options: [
			{ name: 'Connection Note', value: 'NOTE_ASSET' },
			{ name: 'File', value: 'FILE_ASSET' },
			{ name: 'InMail', value: 'INMAIL_ASSET' },
			{ name: 'Message', value: 'MESSAGE_ASSET' },
			{ name: 'Voice Note', value: 'VOICE_ASSET' },
		],
		default: 'MESSAGE_ASSET',
	},
	{
		displayName: 'Name',
		name: 'assetName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['asset'],
				operation: ['createAsset'],
			},
		},
		default: '',
		placeholder: 'First follow-up',
	},
	{
		displayName: 'Message',
		name: 'assetMessage',
		type: 'string',
		required: true,
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				resource: ['asset'],
				operation: ['createAsset'],
				assetType: ['MESSAGE_ASSET', 'NOTE_ASSET', 'INMAIL_ASSET'],
			},
		},
		default: '',
		placeholder: 'Thanks for connecting, {{LINKEDIN.FIRST_NAME}}!',
		description: 'The text. Can use variables like {{LINKEDIN.FIRST_NAME}}.',
		routing: {
			send: {
				type: 'body',
				property: 'message',
			},
		},
	},
	{
		displayName: 'Subject',
		name: 'assetSubject',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['asset'],
				operation: ['createAsset'],
				assetType: ['INMAIL_ASSET'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'subject',
			},
		},
	},
	{
		displayName: 'Attachment ID',
		name: 'assetAttachment',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['asset'],
				operation: ['createAsset'],
				assetType: ['VOICE_ASSET', 'FILE_ASSET'],
			},
		},
		default: '',
		description: 'ID of a file uploaded with the Aimfox API (POST /attachments)',
		routing: {
			send: {
				type: 'body',
				property: 'attachments',
				value: attachmentsValue,
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['asset'],
				operation: ['createAsset'],
				assetType: ['MESSAGE_ASSET', 'NOTE_ASSET', 'INMAIL_ASSET'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'AI Descriptors (JSON)',
				name: 'aiDescriptors',
				type: 'json',
				default: '{}',
				description: 'Prompts for AI variables in the message, e.g. {"VAR_1": "One sentence about their role"} fills {{AI.VAR_1}}',
				routing: {
					send: {
						type: 'body',
						property: 'ai_descriptors',
						value: '={{JSON.parse($value)}}',
					},
				},
			},
			{
				displayName: 'Attachment IDs',
				name: 'attachments',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of uploaded files to attach (message and InMail assets)',
				routing: {
					send: {
						type: 'body',
						property: 'attachments',
						value: attachmentsValue,
					},
				},
			},
		],
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['asset'],
				operation: ['updateAsset'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'AI Descriptors (JSON)',
				name: 'aiDescriptors',
				type: 'json',
				default: '{}',
				description: 'Prompts for AI variables in the message',
				routing: {
					send: {
						type: 'body',
						property: 'ai_descriptors',
						value: '={{JSON.parse($value)}}',
					},
				},
			},
			{
				displayName: 'Attachment IDs',
				name: 'attachments',
				type: 'string',
				default: '',
				description: 'Comma-separated IDs of uploaded files',
				routing: {
					send: {
						type: 'body',
						property: 'attachments',
						value: attachmentsValue,
					},
				},
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'message',
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
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'subject',
					},
				},
			},
		],
	},
];

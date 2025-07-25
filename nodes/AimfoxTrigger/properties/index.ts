import { INodeProperties } from 'n8n-workflow';
import { workspaceFields } from './workspace/fields';

const resourceOptions: INodeProperties = {
	displayName: 'Trigger On',
	name: 'events',
	type: 'multiOptions',
	required: true,
	default: [],
	options: [
		{
			name: 'Account Logged In Event',
			value: 'account_logged_in',
		},
		{
			name: 'Account Logged Out Event',
			value: 'account_logged_out',
		},
		{
			name: 'Connect Accepted Event',
			value: 'accepted',
		},
		{
			name: 'Connect Sent Event',
			value: 'connect',
		},
		{
			name: 'Inmail Reply Event',
			value: 'inmail_reply',
		},
		{
			name: 'Inmail Sent Event',
			value: 'inmail',
		},
		{
			name: 'Message Request Sent Event',
			value: 'message_request',
		},
		{
			name: 'Message Sent Event',
			value: 'message',
		},
		{
			name: 'New Connection Event',
			value: 'new_connection',
		},
		{
			name: 'New Reply Event',
			value: 'reply',
		},
		{
			name: 'Profile Viewed Event',
			value: 'view',
		},
	],
};

export const aimfoxTriggerProperties = [resourceOptions, ...workspaceFields];

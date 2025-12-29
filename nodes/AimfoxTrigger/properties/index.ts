import { INodeProperties } from 'n8n-workflow';

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
			name: 'Campaign Created Event',
			value: 'campaign_created',
		},
		{
			name: 'Campaign Ended Event',
			value: 'campaign_ended',
		},
		{
			name: 'Campaign Reply',
			value: 'campaign_reply',
		},
		{
			name: 'Campaign Started Event',
			value: 'campaign_started',
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
			name: 'Inbox Event',
			value: 'inbox_event',
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
			name: 'Lead Label Added Event',
			value: 'lead_label_added',
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
			value: 'new_reply',
		},
		{
			name: 'Profile Viewed Event',
			value: 'view',
		},
		{
			name: 'Reply Event',
			value: 'reply',
		},
	],
};

export const aimfoxTriggerProperties = [resourceOptions];

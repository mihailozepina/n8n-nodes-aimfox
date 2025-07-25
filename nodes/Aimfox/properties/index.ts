import { INodeProperties } from 'n8n-workflow';
import { blacklistFields as blacklistFields } from './blacklist/fields';

const resourcesOptions: INodeProperties = {
	displayName: 'Recurso',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Instancia',
			value: 'instances-api',
		},
		{
			name: 'Mensagem',
			value: 'messages-api',
		},
		{
			name: 'Grupo',
			value: 'groups-api',
		},
		{
			name: 'Chat',
			value: 'chat-api',
		},
		{
			name: 'Perfil',
			value: 'profile-api',
		},
		{
			name: 'Evento',
			value: 'events-api',
		},
		{
			name: 'Integração',
			value: 'integrations-api',
		},
	],
	default: 'instances-api',
};

export const evolutionNodeProperties = [
	resourcesOptions,
	...blacklistFields,
];

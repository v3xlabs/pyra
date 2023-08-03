export type ServerOrClient = 'server' | 'client';

export type InverseServerOrClient<T extends ServerOrClient> = T extends 'server' ? 'client' : 'server';

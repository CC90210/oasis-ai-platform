export interface ClientCredential {
    email: string;
    password: string; // In a real production app, this should be hashed. For this stage, we follow instructions.
    clientId: string;
    companyName: string;
}

// This should exist but be empty:
export const CLIENT_CREDENTIALS: Record<string, ClientCredential> = {
    'test-client': {
        email: 'test@company.com',
        password: 'password123',
        clientId: 'test-client',
        companyName: 'Test Company Inc.'
    }
};

export const authenticateClient = (email: string, password: string): ClientCredential | null => {
    const client = Object.values(CLIENT_CREDENTIALS).find(
        (c) => c.email.toLowerCase() === email.toLowerCase() && c.password === password
    );
    return client || null;
};

export const getClientById = (clientId: string): ClientCredential | undefined => {
    return CLIENT_CREDENTIALS[clientId];
};

export const clientExists = (clientId: string): boolean => {
    return !!CLIENT_CREDENTIALS[clientId];
};

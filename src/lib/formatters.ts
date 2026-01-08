// Format relative time
export const formatRelativeTime = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return then.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Format currency
export const formatCurrency = (cents: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(cents / 100);
};

// Format date
export const formatDate = (date: string | null) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

// Format datetime
export const formatDateTime = (date: string | null) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

// Parse and format automation log metadata
export const formatLogMetadata = (metadata: any) => {
    if (!metadata || typeof metadata !== 'object') return null;

    const formatted: { label: string; value: string }[] = [];

    // Extract common fields
    if (metadata.customer_email || metadata.email) {
        formatted.push({ label: 'Customer', value: metadata.customer_email || metadata.email });
    }
    if (metadata.order_number) {
        formatted.push({ label: 'Order', value: `#${metadata.order_number}` });
    }
    if (metadata.subject) {
        formatted.push({ label: 'Subject', value: metadata.subject });
    }

    return formatted;
};

// Truncate text
export const truncate = (text: string, length = 100) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
};

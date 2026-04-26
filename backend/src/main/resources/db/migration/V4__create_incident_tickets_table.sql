CREATE TABLE incident_tickets (
    id UUID PRIMARY KEY,
    resource_id UUID,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    reported_by_id UUID NOT NULL,
    assigned_to_id UUID,
    rejection_reason TEXT,
    resolution_notes TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_ticket_resource FOREIGN KEY (resource_id) REFERENCES resources(id),
    CONSTRAINT fk_ticket_reporter FOREIGN KEY (reported_by_id) REFERENCES users(id),
    CONSTRAINT fk_ticket_assignee FOREIGN KEY (assigned_to_id) REFERENCES users(id)
);

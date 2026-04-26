CREATE TABLE ticket_attachments (
    id UUID PRIMARY KEY,
    ticket_id UUID NOT NULL,
    file_url VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    uploaded_by_id UUID NOT NULL,
    uploaded_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_attachment_ticket FOREIGN KEY (ticket_id) REFERENCES incident_tickets(id) ON DELETE CASCADE,
    CONSTRAINT fk_attachment_user FOREIGN KEY (uploaded_by_id) REFERENCES users(id)
);

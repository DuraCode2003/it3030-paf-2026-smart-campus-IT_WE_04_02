CREATE TABLE bookings (
    id UUID PRIMARY KEY,
    resource_id UUID NOT NULL,
    user_id UUID NOT NULL,
    start_date_time TIMESTAMP NOT NULL,
    end_date_time TIMESTAMP NOT NULL,
    purpose VARCHAR(255) NOT NULL,
    expected_attendees INTEGER,
    status VARCHAR(50) NOT NULL,
    admin_note TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_booking_resource FOREIGN KEY (resource_id) REFERENCES resources(id),
    CONSTRAINT fk_booking_user FOREIGN KEY (user_id) REFERENCES users(id)
);

#!/bin/bash
psql -U postgres -c "CREATE DATABASE smart_campus_db;"
psql -U postgres -d smart_campus_db -c "CREATE EXTENSION IF NOT EXISTS pgcrypto;"

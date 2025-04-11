#!/bin/bash
# init-db.sh
set -e

POSTGRES_USER="${POSTGRES_USER:-user}"
SHARED_DB="${SHARED_DATABASE_NAME:-shared_db}" # DB này thường được tạo tự động
ACADEMY_DB="${ACADEMY_DATABASE_NAME:-academy_db}"
COSMETICS_DB="${COSMETICS_DATABASE_NAME:-cosmetics_db}"
SPA_DB="${SPA_DATABASE_NAME:-spa_db}"

echo "--- Initializing Databases ---"

create_db_if_not_exists() {
  local db_name=$1
  echo "Checking/Creating database '$db_name'..."
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    SELECT 'CREATE DATABASE $db_name' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$db_name')gexec
EOSQL
  if [ $? -eq 0 ]; then echo "Database '$db_name' checked/created."; else echo "Error for database '$db_name'."; exit 1; fi
}

create_db_if_not_exists "$ACADEMY_DB"
create_db_if_not_exists "$COSMETICS_DB"
create_db_if_not_exists "$SPA_DB"

echo "--- Database Initialization Complete ---"
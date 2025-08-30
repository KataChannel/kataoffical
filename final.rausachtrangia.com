# Main frontend service với domain tg.rausachtrangia.com
server {
    listen 80;
    server_name tg.rausachtrangia.com;

    location / {
        proxy_pass http://116.118.49.243:54301;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# MinIO Storage service với domain media.rausachtrangia.com
server {
    listen 80;
    server_name media.rausachtrangia.com;
    
    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    
    # MinIO specific configurations
    client_max_body_size 100M;
    
    location / {
        proxy_pass http://116.118.49.243:59000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Important for MinIO
        proxy_buffering off;
        proxy_request_buffering off;
    }
}

# API Backend service - port nội bộ
server {
    listen 53331;
    
    location / {
        proxy_pass http://116.118.49.243:53331;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# MinIO Console - port nội bộ
server {
    listen 59090;
    
    location / {
        proxy_pass http://116.118.49.243:59090;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# PgAdmin service - port nội bộ
server {
    listen 55050;
    
    location / {
        proxy_pass http://116.118.49.243:55050;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

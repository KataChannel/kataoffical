server {
    server_name storage.rausachtrangia.com;
    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    
    # MinIO specific configurations
    client_max_body_size 100M;
    
    location / {
        proxy_pass http://116.118.49.243:9000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Important for MinIO
        proxy_buffering off;
        proxy_request_buffering off;
    }
}

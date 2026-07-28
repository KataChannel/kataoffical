# Utility Scripts

This directory contains utility scripts for the Rausach application.

## Scripts Overview

### Deployment & Server Management
- `login-server.sh` - Login to production server
- `deploy.sh` - Deploy application to production
- `run-all.sh` - Run all services locally

### Database & Backup
- `backup.sh` - Create database backup
- `json-backup.sh` - Create JSON data backup

### Development & Git
- `github.sh` - Git operations helper
- `auto-git.sh` - Automated git operations

### System & Status
- `final-status-check.sh` - Check system status
- `start-inventory.sh` - Start inventory management system

## Usage

Make sure scripts are executable:
```bash
chmod +x *.sh
```

Run any script:
```bash
./script-name.sh
```

## Notes

- All scripts should be run from the project root unless specified otherwise
- Check script contents before running in production
- Some scripts may require environment variables or configuration

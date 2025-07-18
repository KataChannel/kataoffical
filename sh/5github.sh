#!/bin/bash

# GitHub Utilities Script
# Comprehensive GitHub management tools

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_color() {
    printf "${1}%s${NC}\n" "$2"
}

# Function to check if git is installed
check_git() {
    if ! command -v git &> /dev/null; then
        print_color $RED "Git is not installed. Please install git first."
        exit 1
    fi
}

# Function to check if gh CLI is installed
check_gh_cli() {
    if ! command -v gh &> /dev/null; then
        print_color $YELLOW "GitHub CLI (gh) is not installed."
        read -p "Do you want to install it? (y/n): " install_gh
        if [[ $install_gh == "y" || $install_gh == "Y" ]]; then
            install_gh_cli
        else
            print_color $RED "Some features require GitHub CLI."
        fi
    fi
}

# Function to install GitHub CLI
install_gh_cli() {
    print_color $BLUE "Installing GitHub CLI..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
        sudo apt update
        sudo apt install gh
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew install gh
    else
        print_color $RED "Please install GitHub CLI manually from https://cli.github.com/"
    fi
}

# Function to setup git configuration
setup_git_config() {
    print_color $BLUE "Setting up Git configuration..."
    read -p "Enter your name: " git_name
    read -p "Enter your email: " git_email
    
    git config --global user.name "$git_name"
    git config --global user.email "$git_email"
    
    print_color $GREEN "Git configuration completed!"
}

# Function to initialize a new repository
init_repo() {
    read -p "Enter repository name: " repo_name
    read -p "Enter description (optional): " repo_desc
    read -p "Make repository private? (y/n): " is_private
    
    mkdir -p "$repo_name"
    cd "$repo_name"
    
    git init
    echo "# $repo_name" > README.md
    if [[ -n "$repo_desc" ]]; then
        echo "$repo_desc" >> README.md
    fi
    
    git add README.md
    git commit -m "Initial commit"
    
    if command -v gh &> /dev/null; then
        if [[ $is_private == "y" || $is_private == "Y" ]]; then
            gh repo create "$repo_name" --private --source=. --remote=origin --push
        else
            gh repo create "$repo_name" --public --source=. --remote=origin --push
        fi
        print_color $GREEN "Repository created and pushed to GitHub!"
    else
        print_color $YELLOW "Created local repository. Push to GitHub manually."
    fi
}

# Function to clone a repository
clone_repo() {
    read -p "Enter GitHub repository URL or username/repo: " repo_url
    
    if [[ $repo_url == *"github.com"* ]]; then
        git clone "$repo_url"
    else
        git clone "https://github.com/$repo_url.git"
    fi
    
    print_color $GREEN "Repository cloned successfully!"
}

# Function to manage branches
manage_branches() {
    echo "Current branches:"
    git branch -a
    echo
    echo "1. Create new branch"
    echo "2. Switch branch"
    echo "3. Delete branch"
    echo "4. Merge branch"
    read -p "Choose option (1-4): " branch_option
    
    case $branch_option in
        1)
            read -p "Enter new branch name: " branch_name
            git checkout -b "$branch_name"
            print_color $GREEN "Created and switched to branch: $branch_name"
            ;;
        2)
            read -p "Enter branch name to switch: " branch_name
            git checkout "$branch_name"
            print_color $GREEN "Switched to branch: $branch_name"
            ;;
        3)
            read -p "Enter branch name to delete: " branch_name
            git branch -d "$branch_name"
            print_color $GREEN "Deleted branch: $branch_name"
            ;;
        4)
            read -p "Enter branch name to merge: " branch_name
            git merge "$branch_name"
            print_color $GREEN "Merged branch: $branch_name"
            ;;
    esac
}

# Function to handle commits
commit_changes() {
    git status
    echo
    echo "1. Add all files and commit"
    echo "2. Add specific files and commit"
    echo "3. Commit staged files"
    read -p "Choose option (1-3): " commit_option
    
    case $commit_option in
        1)
            git add .
            ;;
        2)
            read -p "Enter file names (space-separated): " files
            git add $files
            ;;
        3)
            # Files already staged
            ;;
    esac
    
    read -p "Enter commit message: " commit_msg
    git commit -m "$commit_msg"
    
    read -p "Push to remote? (y/n): " push_changes
    if [[ $push_changes == "y" || $push_changes == "Y" ]]; then
        git push
        print_color $GREEN "Changes committed and pushed!"
    else
        print_color $GREEN "Changes committed locally!"
    fi
}

# Function to manage remotes
manage_remotes() {
    echo "Current remotes:"
    git remote -v
    echo
    echo "1. Add remote"
    echo "2. Remove remote"
    echo "3. Update remote URL"
    read -p "Choose option (1-3): " remote_option
    
    case $remote_option in
        1)
            read -p "Enter remote name: " remote_name
            read -p "Enter remote URL: " remote_url
            git remote add "$remote_name" "$remote_url"
            print_color $GREEN "Remote added: $remote_name"
            ;;
        2)
            read -p "Enter remote name to remove: " remote_name
            git remote remove "$remote_name"
            print_color $GREEN "Remote removed: $remote_name"
            ;;
        3)
            read -p "Enter remote name: " remote_name
            read -p "Enter new URL: " remote_url
            git remote set-url "$remote_name" "$remote_url"
            print_color $GREEN "Remote URL updated: $remote_name"
            ;;
    esac
}

# Function to create pull request
create_pull_request() {
    if ! command -v gh &> /dev/null; then
        print_color $RED "GitHub CLI is required for this feature."
        return 1
    fi
    
    read -p "Enter PR title: " pr_title
    read -p "Enter PR description: " pr_desc
    read -p "Enter base branch (default: main): " base_branch
    base_branch=${base_branch:-main}
    
    gh pr create --title "$pr_title" --body "$pr_desc" --base "$base_branch"
    print_color $GREEN "Pull request created!"
}

# Function to view repository information
repo_info() {
    if command -v gh &> /dev/null; then
        gh repo view
    else
        echo "Repository: $(git config --get remote.origin.url)"
        echo "Current branch: $(git branch --show-current)"
        echo "Last commit: $(git log -1 --oneline)"
    fi
}

# Function to sync fork
sync_fork() {
    if ! command -v gh &> /dev/null; then
        print_color $RED "GitHub CLI is required for this feature."
        return 1
    fi
    
    gh repo sync
    print_color $GREEN "Fork synced with upstream!"
}

# Function to manage issues
manage_issues() {
    if ! command -v gh &> /dev/null; then
        print_color $RED "GitHub CLI is required for this feature."
        return 1
    fi
    
    echo "1. List issues"
    echo "2. Create issue"
    echo "3. View issue"
    echo "4. Close issue"
    read -p "Choose option (1-4): " issue_option
    
    case $issue_option in
        1)
            gh issue list
            ;;
        2)
            read -p "Enter issue title: " issue_title
            read -p "Enter issue description: " issue_desc
            gh issue create --title "$issue_title" --body "$issue_desc"
            print_color $GREEN "Issue created!"
            ;;
        3)
            read -p "Enter issue number: " issue_num
            gh issue view "$issue_num"
            ;;
        4)
            read -p "Enter issue number to close: " issue_num
            gh issue close "$issue_num"
            print_color $GREEN "Issue closed!"
            ;;
    esac
}

# Main menu
show_menu() {
    clear
    print_color $BLUE "=== GitHub Utilities ==="
    echo "1.  Setup Git Configuration"
    echo "2.  Initialize New Repository"
    echo "3.  Clone Repository"
    echo "4.  Manage Branches"
    echo "5.  Commit Changes"
    echo "6.  Manage Remotes"
    echo "7.  Create Pull Request"
    echo "8.  Repository Information"
    echo "9.  Sync Fork"
    echo "10. Manage Issues"
    echo "11. Install/Check GitHub CLI"
    echo "0.  Exit"
    echo
}

# Main loop
main() {
    check_git
    
    while true; do
        show_menu
        read -p "Choose an option (0-11): " choice
        
        case $choice in
            1) setup_git_config ;;
            2) init_repo ;;
            3) clone_repo ;;
            4) manage_branches ;;
            5) commit_changes ;;
            6) manage_remotes ;;
            7) create_pull_request ;;
            8) repo_info ;;
            9) sync_fork ;;
            10) manage_issues ;;
            11) check_gh_cli ;;
            0) 
                print_color $GREEN "Goodbye!"
                exit 0
                ;;
            *)
                print_color $RED "Invalid option. Please try again."
                ;;
        esac
        
        echo
        read -p "Press Enter to continue..."
    done
}

# Run the script
main "$@"
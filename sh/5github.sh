#!/bin/bash

# GitHub Utilities Script - Phiên bản tiếng Việt
# Các công cụ quản lý GitHub cơ bản

set -e

# Màu sắc cho output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # Không màu

# Hàm in màu
print_color() {
    printf "${1}%s${NC}\n" "$2"
}

# Kiểm tra git đã cài đặt chưa
check_git() {
    if ! command -v git &> /dev/null; then
        print_color $RED "Git chưa được cài đặt. Vui lòng cài đặt git trước."
        exit 1
    fi
}

# Kiểm tra có phải git repository không
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_color $RED "Không phải git repository. Vui lòng di chuyển đến thư mục git repository."
        return 1
    fi
}

# Hiển thị thông tin nhánh
show_branches() {
    if ! check_git_repo; then
        return 1
    fi
    
    print_color $CYAN "=== Thông tin nhánh ==="
    
    # Hiển thị nhánh hiện tại
    current_branch=$(git branch --show-current)
    print_color $GREEN "Nhánh hiện tại: $current_branch"
    echo
    
    # Hiển thị nhánh local
    print_color $BLUE "Các nhánh local:"
    git branch -v --color=always
    echo
    
    # Hiển thị nhánh remote
    print_color $PURPLE "Các nhánh remote:"
    git branch -r --color=always
    echo
}

# Commit và push
commit_and_push() {
    if ! check_git_repo; then
        return 1
    fi
    
    print_color $CYAN "=== Trạng thái Repository ==="
    git status --short
    echo
    
    echo "1. Thêm tất cả file và commit"
    echo "2. Commit các file đã staged"
    echo "3. Push nhánh hiện tại"
    read -p "Chọn tùy chọn (1-3): " commit_option
    
    case $commit_option in
        1)
            git add .
            print_color $GREEN "Đã thêm tất cả file"
            read -p "Nhập nội dung commit: " commit_msg
            git commit -m "$commit_msg"
            print_color $GREEN "Commit thành công"
            read -p "Push lên remote? (y/n): " push_changes
            if [[ $push_changes == "y" || $push_changes == "Y" ]]; then
                git push
                print_color $GREEN "Push thành công"
            fi
            ;;
        2)
            if [[ -z $(git diff --cached --name-only) ]]; then
                print_color $RED "Không có file nào được staged"
                return 1
            fi
            print_color $BLUE "Các file đã staged:"
            git diff --cached --name-only
            read -p "Nhập nội dung commit: " commit_msg
            git commit -m "$commit_msg"
            print_color $GREEN "Commit thành công"
            read -p "Push lên remote? (y/n): " push_changes
            if [[ $push_changes == "y" || $push_changes == "Y" ]]; then
                git push
                print_color $GREEN "Push thành công"
            fi
            ;;
        3)
            current_branch=$(git branch --show-current)
            git push
            print_color $GREEN "Đã push nhánh $current_branch"
            ;;
    esac
}

# Merge nhánh hiện tại với nhánh khác
merge_branches() {
    if ! check_git_repo; then
        return 1
    fi
    
    current_branch=$(git branch --show-current)
    print_color $CYAN "=== Merge nhánh ==="
    print_color $BLUE "Nhánh hiện tại: $current_branch"
    echo
    
    show_branches
    read -p "Nhập tên nhánh muốn merge vào nhánh hiện tại: " source_branch
    
    read -p "Xác nhận merge $source_branch vào $current_branch? (y/n): " confirm
    if [[ $confirm == "y" || $confirm == "Y" ]]; then
        if git merge "$source_branch"; then
            print_color $GREEN "Merge thành công"
        else
            print_color $RED "Có xung đột khi merge. Vui lòng giải quyết xung đột."
            git status
        fi
    fi
}

# Xóa nhánh
remove_branch() {
    if ! check_git_repo; then
        return 1
    fi
    
    print_color $CYAN "=== Xóa nhánh ==="
    show_branches
    
    echo "1. Xóa nhánh local"
    echo "2. Xóa nhánh remote"
    read -p "Chọn tùy chọn (1-2): " delete_option
    
    case $delete_option in
        1)
            read -p "Nhập tên nhánh local cần xóa: " branch_name
            current_branch=$(git branch --show-current)
            if [[ "$branch_name" == "$current_branch" ]]; then
                print_color $RED "Không thể xóa nhánh đang sử dụng. Vui lòng chuyển sang nhánh khác."
            else
                read -p "Xác nhận xóa nhánh $branch_name? (y/n): " confirm
                if [[ $confirm == "y" || $confirm == "Y" ]]; then
                    git branch -d "$branch_name" 2>/dev/null && print_color $GREEN "Đã xóa nhánh: $branch_name" || {
                        print_color $YELLOW "Nhánh chưa được merge. Bạn có muốn xóa bắt buộc? (y/n): "
                        read force_delete
                        if [[ $force_delete == "y" || $force_delete == "Y" ]]; then
                            git branch -D "$branch_name"
                            print_color $GREEN "Đã xóa bắt buộc nhánh: $branch_name"
                        fi
                    }
                fi
            fi
            ;;
        2)
            read -p "Nhập tên nhánh remote cần xóa (vd: origin/feature): " remote_branch
            branch_name=${remote_branch#origin/}
            read -p "Xác nhận xóa nhánh remote '$branch_name'? (y/n): " confirm
            if [[ $confirm == "y" || $confirm == "Y" ]]; then
                git push origin --delete "$branch_name" && print_color $GREEN "Đã xóa nhánh remote: $branch_name"
            fi
            ;;
    esac
}

# Menu chính
show_menu() {
    clear
    print_color $BLUE "=== Tiện ích GitHub ==="
    echo "1. Hiển thị các nhánh"
    echo "2. Commit và Push" 
    echo "3. Merge nhánh"
    echo "4. Xóa nhánh"
    echo "0. Thoát"
    echo
}

# Vòng lặp chính
main() {
    check_git
    
    while true; do
        show_menu
        read -p "Chọn một tùy chọn (0-4): " choice
        
        case $choice in
            1) show_branches ;;
            2) commit_and_push ;;
            3) merge_branches ;;
            4) remove_branch ;;
            0) 
                print_color $GREEN "Tạm biệt!"
                exit 0
                ;;
            *)
                print_color $RED "Tùy chọn không hợp lệ. Vui lòng thử lại."
                ;;
        esac
        
        echo
        read -p "Nhấn Enter để tiếp tục..."
    done
}

# Chạy script
main "$@"

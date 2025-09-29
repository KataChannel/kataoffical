import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-treequanlyctv',
    templateUrl: './treequanlyctv.component.html',
    styleUrls: ['./treequanlyctv.component.scss'],
    imports: [CommonModule, FormsModule],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreequanlyctvComponent implements OnInit, OnChanges {
    @Input() listUser: any[] = [];
    treeData: any[] = [];
    filteredTreeData: any[] = [];
    searchTerm: string = '';

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        // Khởi tạo component
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['listUser'] && changes['listUser'].currentValue) {
            console.log('List User:', this.listUser);
            this.buildTree();
            this.filteredTreeData = this.sortByChildrenCount([...this.treeData]);
            console.log('Tree Data:', this.treeData);
        }
    }

    buildTree(): void {
        const map = new Map<string, any>();
        const roots: any[] = [];

        // Tạo map từ listUser với các thuộc tính mở rộng
        this.listUser.forEach(user => {
            map.set(user.phone || user.id, { 
                ...user, 
                children: [],
                expanded: false,
                visible: true,
                matched: false
            });
        });

        // Xây dựng cây quan hệ
        this.listUser.forEach(user => {
            const node = map.get(user.phone || user.id);
            if (node) {
                if (user.affiliateCode && map.has(user.affiliateCode)) {
                    const parent = map.get(user.affiliateCode);
                    parent?.children?.push(node);
                } else {
                    roots.push(node);
                }
            }
        });

        this.treeData = roots;
    }

    // Hàm sort theo số children từ nhiều nhất đến ít nhất (recursive)
    private sortByChildrenCount(nodes: any[]): any[] {
        return nodes
            .map(node => ({
                ...node,
                children: node.children && node.children.length > 0 
                    ? this.sortByChildrenCount(node.children)
                    : []
            }))
            .sort((a, b) => {
                // Sort theo số children từ nhiều nhất đến ít nhất
                const aChildrenCount = this.getTotalChildrenCount(a);
                const bChildrenCount = this.getTotalChildrenCount(b);
                return bChildrenCount - aChildrenCount;
            });
    }

    // Hàm đếm tổng số children (bao gồm children của children)
    private getTotalChildrenCount(node: any): number {
        if (!node.children || node.children.length === 0) {
            return 0;
        }
        
        let count = node.children.length;
        node.children.forEach((child: any) => {
            count += this.getTotalChildrenCount(child);
        });
        
        return count;
    }

    onSearch(): void {
        if (!this.searchTerm.trim()) {
            // Nếu không có từ khóa tìm kiếm, hiển thị tất cả và sort
            this.resetSearch();
            this.filteredTreeData = this.sortByChildrenCount([...this.treeData]);
            return;
        }

        const searchLower = this.searchTerm.toLowerCase();
        
        // Reset trạng thái tìm kiếm
        this.resetSearch();
        
        // Đánh dấu các node phù hợp và expand parent
        this.markMatchingNodes(this.treeData, searchLower);
        
        // Lọc, hiển thị kết quả và sort
        const filtered = this.filterVisibleNodes(this.treeData);
        this.filteredTreeData = this.sortByChildrenCount(filtered);
    }

    private resetSearch(): void {
        this.resetNodeVisibility(this.treeData);
    }

    private resetNodeVisibility(nodes: any[]): void {
        nodes.forEach(node => {
            node.visible = true;
            node.matched = false;
            node.expanded = false;
            if (node.children && node.children.length > 0) {
                this.resetNodeVisibility(node.children);
            }
        });
    }

    private markMatchingNodes(nodes: any[], searchTerm: string): boolean {
        let hasMatch = false;

        nodes.forEach(node => {
            // Kiểm tra node hiện tại có match không
            const nodeMatches = this.nodeMatches(node, searchTerm);
            
            // Kiểm tra children có match không
            let childrenMatch = false;
            if (node.children && node.children.length > 0) {
                childrenMatch = this.markMatchingNodes(node.children, searchTerm);
            }

            // Node sẽ được hiển thị nếu:
            // 1. Chính nó match
            // 2. Có children match
            // 3. Parent của nó match
            node.matched = nodeMatches;
            node.visible = nodeMatches || childrenMatch;
            
            // Expand node nếu có children match
            if (childrenMatch) {
                node.expanded = true;
            }

            if (node.visible) {
                hasMatch = true;
            }
        });

        return hasMatch;
    }

    private nodeMatches(node: any, searchTerm: string): boolean {
        return (
            (node.name && node.name.toLowerCase().includes(searchTerm)) ||
            (node.email && node.email.toLowerCase().includes(searchTerm)) ||
            (node.phone && node.phone.toString().includes(searchTerm)) ||
            (node.role && node.role.toLowerCase().includes(searchTerm)) ||
            (node.status && node.status.toLowerCase().includes(searchTerm))
        );
    }

    private filterVisibleNodes(nodes: any[]): any[] {
        return nodes
            .filter(node => node.visible)
            .map(node => ({
                ...node,
                children: node.children && node.children.length > 0 
                    ? this.filterVisibleNodes(node.children) 
                    : []
            }));
    }

    toggleExpand(item: any): void {
        item.expanded = !item.expanded;
    }

    // Hàm để highlight text khi tìm kiếm
    highlightText(text: string, searchTerm: string): string {
        if (!searchTerm || !text) return text;
        
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
    }

    // Hàm để đếm số kết quả tìm kiếm
    getSearchResultCount(): number {
        return this.countVisibleNodes(this.filteredTreeData);
    }

    private countVisibleNodes(nodes: any[]): number {
        let count = 0;
        nodes.forEach(node => {
            if (node.matched) count++;
            if (node.children && node.children.length > 0) {
                count += this.countVisibleNodes(node.children);
            }
        });
        return count;
    }

    // Hàm để clear search
    clearSearch(): void {
        this.searchTerm = '';
        this.onSearch();
    }

    // Hàm để expand/collapse tất cả
    expandAll(): void {
        this.setExpandedState(this.filteredTreeData, true);
    }

    collapseAll(): void {
        this.setExpandedState(this.filteredTreeData, false);
    }

    private setExpandedState(nodes: any[], expanded: boolean): void {
        nodes.forEach(node => {
            if (node.children && node.children.length > 0) {
                node.expanded = expanded;
                this.setExpandedState(node.children, expanded);
            }
        });
    }

    // Hàm để hiển thị thông tin số children
    getChildrenInfo(node: any): string {
        const directChildren = node.children?.length || 0;
        const totalChildren = this.getTotalChildrenCount(node);
        
        if (totalChildren === directChildren) {
            return `${directChildren}`;
        }
        return `${directChildren} (${totalChildren} tổng)`;
    }
}
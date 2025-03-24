import { taskService } from './task.service';
export declare class taskController {
    private readonly taskService;
    constructor(taskService: taskService);
    create(createtaskDto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        title: string;
        status: string;
        assigneeId: string | null;
        relatedUserId: string | null;
    }>;
    findby(param: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        title: string;
        status: string;
        assigneeId: string | null;
        relatedUserId: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        title: string;
        status: string;
        assigneeId: string | null;
        relatedUserId: string | null;
    }[]>;
    getLastUpdatedtask(): Promise<{
        updatedAt: number | Date;
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        title: string;
        status: string;
        assigneeId: string | null;
        relatedUserId: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        title: string;
        status: string;
        assigneeId: string | null;
        relatedUserId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        title: string;
        status: string;
        assigneeId: string | null;
        relatedUserId: string | null;
    }>;
}

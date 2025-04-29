import { Injectable } from '@angular/core';

export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    description: string;
    type: string;
}

@Injectable({ providedIn: 'root' })
export class JobService {
    private list: Job[] = [
        {
            id: 1, title: 'Frontend Developer',
            company: 'CoolStartup',
            location: 'Copenhagen',
            description: 'Build Angular UIs',
            type: 'Full-time'
        },
        {
            id: 2, title: 'Backend Developer',
            company: 'TechCorp',
            location: 'Aarhus',
            description: 'Design REST APIs',
            type: 'Part-time'
        }
    ];

    getAll(): Job[] {
        return this.list;
    }

    getById(id: number): Job | undefined {
        return this.list.find(j => j.id === id);
    }
}
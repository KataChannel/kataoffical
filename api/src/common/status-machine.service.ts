import { Injectable } from '@nestjs/common';

export type EntityType = 'donhang' | 'dathang';
export type DonhangStatus = 'dadat' | 'dagiao' | 'danhan' | 'huy' | 'hoanthanh' | 'choxuly' | 'khonggiao';
export type DathangStatus = 'dadat' | 'dagiao' | 'danhan' | 'huy' | 'hoanthanh' | 'choxuly' | 'khonggiao';

export interface StatusTransition {
  from: string;
  to: string;
  entity: EntityType;
  isValid: boolean;
  reason?: string;
}

@Injectable()
export class StatusMachineService {
  private readonly validTransitions = {
    donhang: {
      'choxuly': ['dadat', 'huy'],
      'dadat': ['dagiao', 'danhan', 'huy'],
      'dagiao': ['danhan', 'huy', 'khonggiao'],
      'danhan': ['hoanthanh'],
      'khonggiao': ['huy', 'dadat'],
      'huy': ['choxuly', 'dadat'],
      'hoanthanh': []
    },
    dathang: {
      'choxuly': ['dadat', 'huy'],
      'dadat': ['dagiao', 'danhan', 'huy'],
      'dagiao': ['danhan', 'huy', 'khonggiao'],
      'danhan': ['hoanthanh'],
      'khonggiao': ['huy', 'dadat'],
      'huy': ['choxuly', 'dadat'],
      'hoanthanh': []
    }
  };

  private readonly reverseTransitions = {
    donhang: {
      'dadat': ['choxuly'],
      'dagiao': ['dadat', 'choxuly'],
      'danhan': ['dagiao', 'dadat', 'choxuly'],
      'huy': ['dadat', 'dagiao', 'choxuly'],
      'hoanthanh': ['danhan'],
      'khonggiao': ['dagiao', 'choxuly']
    },
    dathang: {
      'dadat': ['choxuly'],
      'dagiao': ['dadat', 'choxuly'],
      'danhan': ['dagiao', 'dadat', 'choxuly'],
      'huy': ['dadat', 'dagiao', 'choxuly'],
      'hoanthanh': ['danhan'],
      'khonggiao': ['dagiao', 'choxuly']
    }
  };

  /**
   * Validate if a status transition is allowed
   */
  validateTransition(
    entity: EntityType,
    fromStatus: string,
    toStatus: string,
    allowReverse: boolean = false
  ): StatusTransition {
    // Check forward transitions
    const validForward = this.validTransitions[entity][fromStatus]?.includes(toStatus);
    
    if (validForward) {
      return {
        from: fromStatus,
        to: toStatus,
        entity,
        isValid: true
      };
    }

    // Check reverse transitions if allowed
    if (allowReverse) {
      const validReverse = this.reverseTransitions[entity][fromStatus]?.includes(toStatus);
      if (validReverse) {
        return {
          from: fromStatus,
          to: toStatus,
          entity,
          isValid: true,
          reason: 'Reverse transition'
        };
      }
    }

    return {
      from: fromStatus,
      to: toStatus,
      entity,
      isValid: false,
      reason: `Invalid transition from ${fromStatus} to ${toStatus} for ${entity}`
    };
  }

  /**
   * Get all valid next statuses for a given status
   */
  getValidNextStatuses(entity: EntityType, currentStatus: string, includeReverse: boolean = false): string[] {
    const forward = this.validTransitions[entity][currentStatus] || [];
    
    if (!includeReverse) {
      return forward;
    }

    const reverse = this.reverseTransitions[entity][currentStatus] || [];
    return [...forward, ...reverse];
  }

  /**
   * Check if a status is final (no further transitions possible)
   */
  isFinalStatus(entity: EntityType, status: string): boolean {
    const validNext = this.validTransitions[entity][status];
    return !validNext || validNext.length === 0;
  }

  /**
   * Get status flow description
   */
  getStatusFlow(entity: EntityType): Record<string, string[]> {
    return this.validTransitions[entity];
  }
}

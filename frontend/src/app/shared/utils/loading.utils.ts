// Loading utility functions for preventing server overload
export class LoadingUtils {
  private static debounceTimers = new Map<string, any>();
  private static throttleTimers = new Map<string, number>();

  /**
   * Debounce function - delays execution until after wait milliseconds have passed since last call
   * Useful for search inputs, form validation
   */
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    key: string
  ): (...args: Parameters<T>) => void {
    return (...args: Parameters<T>) => {
      // Clear previous timeout
      if (this.debounceTimers.has(key)) {
        clearTimeout(this.debounceTimers.get(key));
      }

      // Set new timeout
      const timeoutId = setTimeout(() => {
        func(...args);
        this.debounceTimers.delete(key);
      }, wait);

      this.debounceTimers.set(key, timeoutId);
    };
  }

  /**
   * Throttle function - ensures function is called at most once per wait milliseconds
   * Useful for scroll events, resize events, API calls with user interaction
   */
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    key: string
  ): (...args: Parameters<T>) => void {
    return (...args: Parameters<T>) => {
      const lastCallTime = this.throttleTimers.get(key) || 0;
      const now = Date.now();

      if (now - lastCallTime >= wait) {
        this.throttleTimers.set(key, now);
        func(...args);
      }
    };
  }

  /**
   * Rate limiter - combines debounce and throttle
   * Ensures immediate execution on first call, then throttles subsequent calls
   */
  static rateLimitedDebounce<T extends (...args: any[]) => any>(
    func: T,
    throttleWait: number,
    debounceWait: number,
    key: string
  ): (...args: Parameters<T>) => void {
    let isThrottled = false;
    
    return (...args: Parameters<T>) => {
      // If not throttled, execute immediately and set throttle
      if (!isThrottled) {
        func(...args);
        isThrottled = true;
        
        setTimeout(() => {
          isThrottled = false;
        }, throttleWait);
        
        return;
      }

      // If throttled, use debounce
      this.debounce(func, debounceWait, `${key}_debounced`)(...args);
    };
  }

  /**
   * Cleanup all timers for a specific component/key
   */
  static cleanup(keyPrefix: string) {
    // Cleanup debounce timers
    for (const [key, timer] of this.debounceTimers.entries()) {
      if (key.startsWith(keyPrefix)) {
        clearTimeout(timer);
        this.debounceTimers.delete(key);
      }
    }

    // Cleanup throttle timers
    for (const key of this.throttleTimers.keys()) {
      if (key.startsWith(keyPrefix)) {
        this.throttleTimers.delete(key);
      }
    }
  }

  /**
   * Request queue for handling multiple API calls
   */
  private static requestQueues = new Map<string, Promise<any>>();

  /**
   * Queue API requests to prevent concurrent calls to the same endpoint
   */
  static queueRequest<T>(
    key: string,
    requestFn: () => Promise<T>
  ): Promise<T> {
    // If there's already a request in progress, return it
    if (this.requestQueues.has(key)) {
      return this.requestQueues.get(key)!;
    }

    // Create new request and add to queue
    const request = requestFn().finally(() => {
      this.requestQueues.delete(key);
    });

    this.requestQueues.set(key, request);
    return request;
  }
}

/**
 * Utility class for managing loading states
 */
export class LoadingStateManager {
  private loadingStates = new Map<string, boolean>();
  private callbacks = new Map<string, Set<(isLoading: boolean) => void>>();

  /**
   * Set loading state for a specific operation
   */
  setLoading(key: string, isLoading: boolean): void {
    this.loadingStates.set(key, isLoading);
    
    // Notify all callbacks for this key
    const keyCallbacks = this.callbacks.get(key);
    if (keyCallbacks) {
      keyCallbacks.forEach(callback => callback(isLoading));
    }
  }

  /**
   * Get loading state for a specific operation
   */
  isLoading(key: string): boolean {
    return this.loadingStates.get(key) || false;
  }

  /**
   * Check if any operations are loading
   */
  hasAnyLoading(): boolean {
    return Array.from(this.loadingStates.values()).some(state => state);
  }

  /**
   * Subscribe to loading state changes
   */
  onLoadingStateChange(key: string, callback: (isLoading: boolean) => void): () => void {
    if (!this.callbacks.has(key)) {
      this.callbacks.set(key, new Set());
    }
    
    this.callbacks.get(key)!.add(callback);
    
    // Return unsubscribe function
    return () => {
      const keyCallbacks = this.callbacks.get(key);
      if (keyCallbacks) {
        keyCallbacks.delete(callback);
        if (keyCallbacks.size === 0) {
          this.callbacks.delete(key);
        }
      }
    };
  }

  /**
   * Clear all loading states
   */
  clear(): void {
    this.loadingStates.clear();
    this.callbacks.clear();
  }
}
export class EventBus {
  private events: Record<string, Array<(data?: any) => void>> = {};

  on(event: string, callback: (data?: any) => void) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);

    // return unsubscribe function
    return () => {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    };
  }

  emit(event: string, data?: any) {
    if (!this.events[event]) return;
    this.events[event].forEach(cb => cb(data));
  }

  off(event: string, callback: (data?: any) => void) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }
}

const eventBus = new EventBus();
export default eventBus;

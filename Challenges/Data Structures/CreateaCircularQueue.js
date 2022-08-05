class CircularQueue {
    constructor(size) {
  
      this.queue = [];
      this.read = 0;
      this.write = 0;
      this.max = size - 1;
  
      while (size > 0) {
        this.queue.push(null);
        size--;
      }
    }
  
    print() {
      return this.queue;
    }
  
    enqueue(item) {
      if (this.queue[this.write]) return null
  
      this.queue[this.write] = item
      this.write++
  
      if (this.max < this.write) this.write = 0
      
      return item
    }
  
    dequeue() {¶
      if (!this.queue[this.read]) return null
  
      const item = this.queue[this.read]
  
      this.queue[this.read] = null
      this.read++
  
      if (this.max < this.read) this.read = 0
  
      return item
    }
  }
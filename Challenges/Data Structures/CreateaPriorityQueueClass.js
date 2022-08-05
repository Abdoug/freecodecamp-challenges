function PriorityQueue () {
  this.collection = [];

  this.printCollection = function() {
    console.log(this.collection);
  };

  this.enqueue = function(item) {
    const itemPriority = item[1]
    
    console.log('A ', this.collection, item)
    
    if (this.size()) {
      for (let i = 0; i < this.size(); i++) {
          const pastIteration = i - 1
          const nextIteration = i + 1
          const currentPriority = this.collection[i][1]
          const prioritiesAreTheSame = currentPriority === itemPriority

          if (currentPriority >= itemPriority &&
              (i ? this.collection[pastIteration] <= itemPriority : true)) {
                this.collection = [...this.collection.slice(0, prioritiesAreTheSame ? (i + 1) : i), item, ...this.collection.slice(prioritiesAreTheSame ? (i + 1) : i, this.size())]

                break
              }

          if (currentPriority <= itemPriority &&
          (this.collection[nextIteration] ? this.collection[nextIteration][1] >= itemPriority : true)) {
            const a = this.collection.filter((item) => itemPriority >= item[1]);
            
            this.collection = [...a, item, ...this.collection.slice(a.length, this.size())]

            break
          }
        }
    } else {
      this.collection.push(item)
    }

    console.log('B ', this.collection)
  }

  this.dequeue = function() {
    console.log('dequeue')
    const removedItem = this.collection.shift()

    return removedItem[0]
  }

  this.size = function() {
    console.log('size ', this.collection.length)
    return this.collection.length
  }

  this.front = function() {
    console.log('front ', this.collection[0][0])

    return this.collection[0][0]
  }

  this.isEmpty = function() {
    console.log('isEmpty ', !this.collection.length)

    return !this.collection.length
  }
}

// const p = new PriorityQueue()

// // console.log(p.size())
// p.enqueue(['A', 1])
// // console.log(p.size())
// p.enqueue(['B', 5])
// // p.dequeue()
// // console.log('F ', p.front())

// p.enqueue(['E', 3])
// p.enqueue(['I', 3])
// p.enqueue(['P', 1])
// p.enqueue(['C', 0])
// p.enqueue(['R', 6])
// p.enqueue(['S', -2])
// p.enqueue(['Q', 3])
// p.enqueue(['W', -2])

// // console.log('F ', p.front())

// p.printCollection()

// console.log(p.size())
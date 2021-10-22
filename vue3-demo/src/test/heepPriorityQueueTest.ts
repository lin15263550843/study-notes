import { MaxPQ } from '@/commons/heepPriorityQueue';

const maxPQ = new MaxPQ();
// const dataSource = [58, 1, 5, 32, 21, 76, 8, 2, 23, 9, 3, 96, 7, 6, 12, 75, 43, 45, 23, 99, 56, 78, 90];
const dataSource = [4, 1, 2, 3, 5];

dataSource.forEach(value => {
    maxPQ.insert(value);
});
console.log('pq----------------------', maxPQ.pq);
console.log('pq----------------------', maxPQ.size());
console.log('pq----------------------', maxPQ.pq);
console.log('pq----------------------', maxPQ.insert(8));
console.log('pq----------------------', maxPQ.pq);
console.log('pq----------------------', maxPQ.delMax());
console.log('pq----------------------', maxPQ.delMax());
console.log('pq----------------------', maxPQ.delMax());
console.log('pq----------------------', maxPQ.delMax());
console.log('pq----------------------', maxPQ.delMax());
console.log('pq----------------------', maxPQ.delMax());
console.log('pq----------------------', maxPQ.delMax());
console.log('pq----------------------', maxPQ.delMax());
console.log('pq----------------------', maxPQ.delMax());
console.log('pq----------------------', maxPQ.delMax());
console.log('pq----------------------', maxPQ.delMax());
console.log('pq----------------------', maxPQ.insert(8));
console.log('pq----------------------', maxPQ.insert(-4));
console.log('pq----------------------', maxPQ.insert(4));
console.log('pq----------------------', maxPQ.insert(-2));
console.log('pq----------------------', maxPQ.delMax());
console.log('pq----------------------', maxPQ.delMax());
console.log('pq----------------------', maxPQ.pq);

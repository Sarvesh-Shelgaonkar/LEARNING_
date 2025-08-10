A **queue** is a linear data structure that follows the **FIFO** (**First In, First Out**) principle — the first element added is the first one to be removed.

Think of it like a line at a ticket counter:

* The first person to join the line gets served first.
* New people join at the back.

---

## **Key Points**

* **Insertion** happens at the **rear** (also called enqueue).
* **Deletion** happens at the **front** (also called dequeue).
* Used for managing tasks in the order they arrive.

---

## **Basic Operations**

1. **Enqueue** – Add an element to the rear.
2. **Dequeue** – Remove an element from the front.
3. **Peek/Front** – View the front element without removing it.
4. **isEmpty** – Check if the queue is empty.
5. **isFull** – (in fixed-size queues) Check if the queue is full.

---

## **Types of Queues**

1. **Simple Queue** – Standard FIFO.
2. **Circular Queue** – Last position connects back to the first (prevents wasted space in fixed arrays).
3. **Priority Queue** – Elements are dequeued based on priority, not arrival order.
4. **Deque** – Double-ended queue, allows insertion and deletion from both ends.

---

## **Queue Implementation**

### Using Array (C++ Example)

```cpp
#include <iostream>
using namespace std;

#define SIZE 5
class Queue {
    int arr[SIZE], front, rear;
public:
    Queue() { front = -1; rear = -1; }

    bool isEmpty() { return front == -1; }
    bool isFull() { return rear == SIZE - 1; }

    void enqueue(int value) {
        if (isFull()) {
            cout << "Queue is full\n";
            return;
        }
        if (front == -1) front = 0;
        arr[++rear] = value;
        cout << value << " enqueued\n";
    }

    void dequeue() {
        if (isEmpty()) {
            cout << "Queue is empty\n";
            return;
        }
        cout << arr[front++] << " dequeued\n";
        if (front > rear) front = rear = -1; // reset
    }

    void display() {
        if (isEmpty()) {
            cout << "Queue is empty\n";
            return;
        }
        cout << "Queue: ";
        for (int i = front; i <= rear; i++) cout << arr[i] << " ";
        cout << "\n";
    }
};

int main() {
    Queue q;
    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.display();
    q.dequeue();
    q.display();
}
```

---

## **Applications of Queue**

* CPU task scheduling
* Print job management
* Order processing systems
* Breadth-first search in graphs
* Network packet handling

---

If you want, I can also show you **queue implementation using linked list** which avoids the fixed-size limitation. Would you like me to?






Got it — now let’s do the **Dequeue Efficient** approach for **queue using two stacks**.

Here, **dequeue** is **O(1)**, but **enqueue** is **O(n)** because we rearrange elements every time we push.

---

## **Idea**

We always keep **the front of the queue at the top of `stack1`**.
So:

1. **Enqueue (Push)**:

   * Move all elements from `stack1` to `stack2`.
   * Push the new element into `stack1` (it becomes the bottom of the queue).
   * Move everything from `stack2` back to `stack1`.
2. **Dequeue (Pop)**:

   * Just pop from `stack1` (front is always on top).

---

## **C++ Implementation**

```cpp
#include <iostream>
#include <stack>
using namespace std;

class QueueUsingStacks {
    stack<int> s1, s2; // s1 will always have the front element on top

public:
    // Push operation (O(n))
    void enqueue(int value) {
        // Step 1: Move all elements from s1 to s2
        while (!s1.empty()) {
            s2.push(s1.top());
            s1.pop();
        }

        // Step 2: Push new element into s1
        s1.push(value);

        // Step 3: Move all elements back from s2 to s1
        while (!s2.empty()) {
            s1.push(s2.top());
            s2.pop();
        }

        cout << value << " enqueued\n";
    }

    // Pop operation (O(1))
    void dequeue() {
        if (s1.empty()) {
            cout << "Queue is empty\n";
            return;
        }
        cout << s1.top() << " dequeued\n";
        s1.pop();
    }

    // Peek operation (O(1))
    void peek() {
        if (s1.empty()) {
            cout << "Queue is empty\n";
            return;
        }
        cout << "Front element: " << s1.top() << "\n";
    }

    bool isEmpty() {
        return s1.empty();
    }
};

int main() {
    QueueUsingStacks q;

    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);

    q.peek();     // Should be 10
    q.dequeue();  // Removes 10
    q.peek();     // Should be 20

    q.enqueue(40);
    q.peek();     // Should be 20
    q.dequeue();  // Removes 20

    return 0;
}
```

---

## **Time Complexity**

* **Enqueue** → O(n) (because we move all elements twice for each push)
* **Dequeue** → O(1)
* **Space** → O(n)

---

If you want, I can give you **a comparison table** between **Enqueue Efficient** and **Dequeue Efficient** two-stack approaches so you can quickly choose the right one for interviews.
Do you want me to make that table?










Ah, I see — you’re describing the **Push Efficient** version of **stack using two queues** where:

1. **Before pushing** a new element, we first make sure `q1` is empty.
2. Push the new element into `q1`.
3. Then move all elements from `q2` back into `q1`.
4. Swap the roles of `q1` and `q2` when needed.

But this is actually closer to **Pop Efficient**, just with the logic written differently.
Let’s implement **exactly what you wrote**:

---

## **C++ Implementation – Your described approach**

```cpp
#include <iostream>
#include <queue>
using namespace std;

class StackUsingQueues {
    queue<int> q1, q2;

public:
    void push(int value) {
        // Step 1: Move everything from q1 to q2
        while (!q1.empty()) {
            q2.push(q1.front());
            q1.pop();
        }

        // Step 2: Push new element into q1
        q1.push(value);

        // Step 3: Move all elements back from q2 to q1
        while (!q2.empty()) {
            q1.push(q2.front());
            q2.pop();
        }

        cout << value << " pushed\n";
    }

    void pop() {
        if (q1.empty()) {
            cout << "Stack is empty\n";
            return;
        }
        cout << q1.front() << " popped\n";
        q1.pop();
    }

    void top() {
        if (q1.empty()) {
            cout << "Stack is empty\n";
            return;
        }
        cout << "Top element: " << q1.front() << "\n";
    }

    bool isEmpty() {
        return q1.empty();
    }
};

int main() {
    StackUsingQueues s;

    s.push(10);
    s.push(20);
    s.push(30);

    s.top();     // 30
    s.pop();     // removes 30
    s.top();     // 20

    s.push(40);
    s.top();     // 40
}
```

---

## **How it Works**

* **Push (O(n))**:

  * Clear the way in `q1` by moving all elements to `q2`.
  * Insert the new value into `q1`.
  * Move everything back from `q2` to `q1` so the new element is always at the front.
* **Pop (O(1))**: Just remove from `q1`.

---

If you want, I can also draw a **step-by-step diagram** showing how the elements move between `q1` and `q2` during push so you can remember it easily in interviews.
Do you want me to add that?











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







You mean **finding the first non-repeating letter** in a string?
That’s a common problem — often asked in interviews.

---

## **Idea**

* Count how many times each character appears.
* Then check the string in order, and return the first character whose count is **1**.

---

## **C++ Implementation**

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

char firstNonRepeatingChar(string s) {
    unordered_map<char, int> freq;

    // Count frequency of each character
    for (char c : s) {
        freq[c]++;
    }

    // Find first character with frequency 1
    for (char c : s) {
        if (freq[c] == 1) {
            return c;
        }
    }

    return '\0'; // no non-repeating character
}

int main() {
    string s = "swiss";
    char result = firstNonRepeatingChar(s);

    if (result != '\0')
        cout << "First non-repeating character: " << result << "\n";
    else
        cout << "No non-repeating character found\n";

    return 0;
}
```

---

## **Example**

```
Input:  swiss
Count:  s → 3, w → 1, i → 1
First non-repeating: w
```

---

If you want, I can also show you a **version without extra space (O(1) memory)** but it works only for lowercase alphabets.
Do you want me to make that one too?




Got it — you want to find the **first non-repeating character** using a **queue** approach.
This method is nice because it works **online** — meaning you can process characters as they arrive (like in a stream).

---

## **Idea**

1. Keep a **frequency map** to count how many times each character has appeared.
2. Keep a **queue** to store characters in the order they are seen.
3. For each character:

   * Increase its frequency.
   * Push it into the queue.
   * While the queue's front has a frequency > 1, pop it (because it’s repeating).
4. The front of the queue is always the **first non-repeating character so far**.

---

## **C++ Implementation**

```cpp
#include <iostream>
#include <queue>
#include <unordered_map>
using namespace std;

char firstNonRepeatingChar(string s) {
    unordered_map<char, int> freq;
    queue<char> q;

    for (char c : s) {
        freq[c]++;
        q.push(c);

        // Remove repeating characters from the front
        while (!q.empty() && freq[q.front()] > 1) {
            q.pop();
        }
    }

    // If queue is empty, no non-repeating character
    if (!q.empty()) {
        return q.front();
    }
    return '\0';
}

int main() {
    string s = "swiss";
    char result = firstNonRepeatingChar(s);

    if (result != '\0')
        cout << "First non-repeating character: " << result << "\n";
    else
        cout << "No non-repeating character found\n";

    return 0;
}
```

---

## **Example Walkthrough** ("swiss")

| Step | Char | Freq Map      | Queue | First Non-Repeating |
| ---- | ---- | ------------- | ----- | ------------------- |
| 1    | s    | s:1           | s     | s                   |
| 2    | w    | s:1, w:1      | s,w   | s                   |
| 3    | i    | s:1, w:1, i:1 | s,w,i | s                   |
| 4    | s    | s:2, w:1, i:1 | w,i   | w                   |
| 5    | s    | s:3, w:1, i:1 | w,i   | w                   |

---

If you like, I can also make this **print the first non-repeating character at every step** (stream processing style) instead of just the final one. That’s often what interviewers expect for the queue method.
Do you want me to make that version?




Alright — let’s analyze the **time complexity** and **space complexity** for the **first non-repeating character using a queue** approach.

---

## **Algorithm Recap**

We:

1. Maintain a **frequency map** → stores counts of characters.
2. Maintain a **queue** → stores characters in the order they are seen.
3. For each character:

   * Increment its frequency in `O(1)`
   * Push it into the queue in `O(1)`
   * Pop from the queue until the front has frequency = 1 (each element is popped at most once overall).

---

## **Time Complexity Analysis**

Let **n** = length of the string.

* **Frequency update** → `O(1)` per character.
* **Queue push** → `O(1)` per character.
* **Queue pop** inside the while loop:

  * Each character is popped **at most once** during the whole run.
  * So total pops across the entire string = **O(n)**, not `O(n^2)`.

**Total:**

$$
O(n) \text{ for all operations combined}
$$

---

## **Space Complexity Analysis**

* **Frequency map** → Stores counts for each unique character.

  * If only lowercase letters → `O(26)` → `O(1)` space.
  * If extended ASCII → `O(256)` → still `O(1)` space.
  * If Unicode / general → `O(k)` where k is character set size.
* **Queue** → Can hold up to **n** characters in the worst case (when no repetition occurs until the end).

**Total:**

$$
O(n + k) \quad \text{(but if k is constant, it's just } O(n) \text{)}
$$

---

## **Final Complexity**

* **Time:** `O(n)`
* **Space:** `O(n)` in the worst case (queue + map storage)

---

If you want, I can also compare this **queue approach** with the **simple two-pass hashmap approach** in a table so you can decide which is better for an interview.
Do you want me to make that comparison?




A **deque** (pronounced “deck”) stands for **Double-Ended Queue** — a data structure where you can **insert** and **remove** elements from **both the front and the rear** in **O(1)** time.

---

## **Key Features**

* Supports **push\_front**, **push\_back**, **pop\_front**, and **pop\_back**.
* Can be implemented using a **doubly linked list** or a **circular buffer**.
* In C++: available as `std::deque` in `<deque>` header.

---

## **Why Use a Deque?**

Because sometimes you need **both stack and queue functionality** in the same structure.

---

### **Common Uses**

1. **Sliding Window Problems**

   * Used to find **maximum/minimum** in every sliding window of size `k` in `O(n)` time.
   * Store only useful elements in order.

2. **Palindrome Checking**

   * Can pop from both ends to compare characters.

3. **Undo/Redo Functionality**

   * Push new actions at the back, remove from the front when needed.

4. **Implementing Stacks and Queues**

   * You can use a deque as:

     * **Queue** → only use `push_back` + `pop_front`
     * **Stack** → only use `push_back` + `pop_back`

5. **BFS Variants (0-1 BFS)**

   * In graph algorithms where edge weights are 0 or 1, a deque helps keep **O(V + E)** time.

6. **Job Scheduling / Task Management**

   * Easily insert high-priority tasks at the front and normal ones at the back.

---

## **Example (C++ deque usage)**

```cpp
#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq;

    dq.push_back(10);   // [10]
    dq.push_front(20);  // [20, 10]
    dq.push_back(30);   // [20, 10, 30]

    cout << "Front: " << dq.front() << "\n"; // 20
    cout << "Back: " << dq.back() << "\n";   // 30

    dq.pop_front(); // removes 20
    dq.pop_back();  // removes 30

    cout << "Remaining: " << dq.front() << "\n"; // 10
}
```

---

✅ **Advantages of deque**

* Flexible insert/remove from both ends.
* No reallocation issues like `vector` for middle insertions.

⚠️ **Disadvantages**

* Slightly more overhead than `vector` or `queue` if you only use one end.

---

If you want, I can also **explain how deque works internally** (circular array vs. doubly linked list) so you understand why it’s `O(1)` for both ends.
Do you want me to explain that part?




Alright — since a **deque** already supports push/pop at both ends in **O(1)** time,
we can easily build **stack** and **queue** on top of it without extra tricks.

---

## **1. Stack using deque**

* Use **push\_back** to add an element.
* Use **pop\_back** to remove the top element.
* **top()** = `back()`.

**C++ Implementation**

```cpp
#include <iostream>
#include <deque>
using namespace std;

class Stack {
    deque<int> dq;

public:
    void push(int value) {
        dq.push_back(value);
        cout << value << " pushed\n";
    }

    void pop() {
        if (dq.empty()) {
            cout << "Stack is empty\n";
            return;
        }
        cout << dq.back() << " popped\n";
        dq.pop_back();
    }

    void top() {
        if (dq.empty()) {
            cout << "Stack is empty\n";
            return;
        }
        cout << "Top: " << dq.back() << "\n";
    }

    bool isEmpty() {
        return dq.empty();
    }
};

int main() {
    Stack s;
    s.push(10);
    s.push(20);
    s.push(30);

    s.top();  // 30
    s.pop();  // removes 30
    s.top();  // 20
}
```

---

## **2. Queue using deque**

* Use **push\_back** to enqueue.
* Use **pop\_front** to dequeue.
* **front()** = `front()`.

**C++ Implementation**

```cpp
#include <iostream>
#include <deque>
using namespace std;

class Queue {
    deque<int> dq;

public:
    void enqueue(int value) {
        dq.push_back(value);
        cout << value << " enqueued\n";
    }

    void dequeue() {
        if (dq.empty()) {
            cout << "Queue is empty\n";
            return;
        }
        cout << dq.front() << " dequeued\n";
        dq.pop_front();
    }

    void frontElement() {
        if (dq.empty()) {
            cout << "Queue is empty\n";
            return;
        }
        cout << "Front: " << dq.front() << "\n";
    }

    bool isEmpty() {
        return dq.empty();
    }
};

int main() {
    Queue q;
    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);

    q.frontElement(); // 10
    q.dequeue();      // removes 10
    q.frontElement(); // 20
}
```

---

## **Why deque works well here**

* **Stack** → LIFO → back end only.
* **Queue** → FIFO → push at back, pop at front.
* All these operations are **O(1)** with deque, unlike vector or list where some operations might be O(n).

---

If you want, I can also give you **a table comparing complexity for stack/queue/deque operations** so you have it ready for interviews.
Do you want me to prepare that table?








Yes — those are classic **deque** use cases. Let me break them down for you so it’s super clear why a **deque** is perfect for each:

---

## **1. Sliding Window Problems (Max/Min in O(n))**

* **Problem**: For each window of size `k`, find the maximum/minimum.
* **Why Deque?**

  * We can **push** new elements at the back.
  * Remove smaller (or larger) elements from the back before adding a new one (keeps it monotonic).
  * Remove the front if it’s outside the current window.
* **Benefit**:

  * Each element is pushed and popped at most once → **O(n)** total.
* **Example**: Finding max in window of size `k`

```cpp
#include <deque>
#include <vector>
using namespace std;

vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq; // stores indices
    vector<int> result;

    for (int i = 0; i < nums.size(); i++) {
        // Remove indices outside current window
        if (!dq.empty() && dq.front() <= i - k)
            dq.pop_front();

        // Remove smaller elements from back
        while (!dq.empty() && nums[dq.back()] <= nums[i])
            dq.pop_back();

        dq.push_back(i);

        // Window becomes valid after i >= k-1
        if (i >= k - 1)
            result.push_back(nums[dq.front()]);
    }

    return result;
}
```

**Time Complexity:** O(n)
**Space Complexity:** O(k)

---

## **2. Palindrome Checking**

* **Problem**: Check if a string is a palindrome.
* **Why Deque?**

  * Can remove characters from both ends efficiently (`O(1)` each pop).
  * Compare first and last character repeatedly until the deque is empty or mismatch found.
* **Example**:

```cpp
#include <deque>
#include <string>
using namespace std;

bool isPalindrome(string s) {
    deque<char> dq;
    for (char c : s) {
        if (isalnum(c))
            dq.push_back(tolower(c));
    }

    while (dq.size() > 1) {
        if (dq.front() != dq.back())
            return false;
        dq.pop_front();
        dq.pop_back();
    }
    return true;
}
```

**Time Complexity:** O(n)
**Space Complexity:** O(n) (for storing characters)

---

If you want, I can also add **"stack using deque"** and **"queue using deque"** with full examples so you have **all deque use cases in one sheet**.
Do you want me to compile that?

class LinkedList {
private:
    Node* head;

public:
    LinkedList() {
        head = nullptr;
    }

    // 1. Push Front
    void pushFront(int data) {
        Node* newNode = new Node(data);
        newNode->next = head;
        head = newNode;
    }
    // TC: O(1) - Always inserts at beginning

    // 2. Push Back
    void pushBack(int data) {
        Node* newNode = new Node(data);
        if (!head) {
            head = newNode;
            return;
        }
        Node* temp = head;
        while (temp->next) temp = temp->next;
        temp->next = newNode;
    }
    // TC: O(n) - Traverses to the end

    // 3. Pop Front
    void popFront() {
        if (!head) {
            cout << "List is empty\n";
            return;
        }
        Node* temp = head;
        head = head->next;
        delete temp;
    }
    // TC: O(1)

    // 4. Pop Back
    void popBack() {
        if (!head) {
            cout << "List is empty\n";
            return;
        }
        if (!head->next) {
            delete head;
            head = nullptr;
            return;
        }
        Node* temp = head;
        while (temp->next->next) temp = temp->next;
        delete temp->next;
        temp->next = nullptr;
    }
    // TC: O(n)

    // 5. Insert At Position (0-based indexing)
    void insertAtPosition(int data, int pos) {
        if (pos < 0) {
            cout << "Invalid position\n";
            return;
        }

        if (pos == 0) {
            pushFront(data);
            return;
        }

        Node* temp = head;
        for (int i = 0; i < pos - 1 && temp; i++)
            temp = temp->next;

        if (!temp) {
            cout << "Position out of bounds\n";
            return;
        }

        Node* newNode = new Node(data);
        newNode->next = temp->next;
        temp->next = newNode;
    }
    // TC: O(pos) → Worst case O(n)

    // 6. Delete At Position (0-based indexing)
    void deleteAtPosition(int pos) {
        if (!head || pos < 0) {
            cout << "Invalid operation\n";
            return;
        }

        if (pos == 0) {
            popFront();
            return;
        }

        Node* temp = head;
        for (int i = 0; i < pos - 1 && temp; i++)
            temp = temp->next;

        if (!temp || !temp->next) {
            cout << "Position out of bounds\n";
            return;
        }

        Node* delNode = temp->next;
        temp->next = temp->next->next;
        delete delNode;
    }
    // TC: O(pos) → Worst case O(n)

    // 7. Search for value
    bool search(int key) {
        Node* temp = head;
        while (temp) {
            if (temp->data == key) return true;
            temp = temp->next;
        }
        return false;
    }
    // TC: O(n)

    // Utility: Print list
    void print() {
        Node* temp = head;
        while (temp) {
            cout << temp->data << " -> ";
            temp = temp->next;
        }
        cout << "NULL\n";
    }
};
int main() {
    LinkedList list;

    list.pushFront(30);
    list.pushFront(20);
    list.pushBack(40);
    list.insertAtPosition(25, 1); // Insert 25 at pos 1

    list.print(); // 20 -> 25 -> 30 -> 40 -> NULL

    list.deleteAtPosition(2);
    list.print(); // 20 -> 25 -> 40 -> NULL

    list.popFront();
    list.popBack();
    list.print(); // 25 -> NULL

    cout << "Search 25: " << (list.search(25) ? "Found" : "Not Found") << endl;
    cout << "Search 99: " << (list.search(99) ? "Found" : "Not Found") << endl;

    return 0;
}



# reverse ll


class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* newHead = nullptr;
        helper(head, nullptr, newHead);
        return newHead;
    }

    void helper(ListNode* curr, ListNode* prev, ListNode*& newHead) {
        if (curr == nullptr) {
            newHead = prev;
            return;
        }

        ListNode* nextnode = curr->next;
        curr->next = prev;
        helper(nextnode, curr, newHead);
    }
};

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        return helper(head, nullptr);
    }

    ListNode* helper(ListNode* curr, ListNode* prev) {
        if (curr == nullptr)
            return prev; // prev is the new head

        ListNode* nextnode = curr->next;
        curr->next = prev;

        return helper(nextnode, curr);
    }
};


# find middle of ll
class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        
        int count=0;
         ListNode* temp=head;
         while(temp!=nullptr){
            temp=temp->next;
            count++;
         }
            ListNode* middle=head;
         for(int i=0;i<count/2;i++){
            middle=middle->next;
         }
         return middle;

    }
};

### 🔍 Explanation of Your Code:

1. **First pass** (count total nodes):

   ```cpp
   while (temp != nullptr) {
       temp = temp->next;
       count++;
   }
   ```

2. **Second pass** (go to `count / 2`):

   ```cpp
   for (int i = 0; i < count / 2; i++) {
       middle = middle->next;
   }
   ```

3. Return the `middle` node.

---

### 🧠 Time and Space Complexity:

* **Time:** `O(n)` for counting + `O(n/2)` for second loop = **O(n)**
* **Space:** `O(1)` (no extra memory used)

---

### 💡 Alternative (Faster - One-Pass with Two Pointers):

You can do it in **one pass** using **slow and fast pointers**:

```cpp
class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;

        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }

        return slow;
    }
};
```

* `slow` moves 1 step
* `fast` moves 2 steps
* When `fast` reaches end, `slow` will be at the middle





---The **Tortoise and Hare method**, also known as the **slow and fast pointer technique**, is a classic algorithmic strategy used on linked lists and arrays to solve problems efficiently in **one traversal**.

---

## 🐢🐇 What is It?

* **"Tortoise" = slow pointer** → moves **1 step at a time**
* **"Hare" = fast pointer** → moves **2 steps at a time**

---

## 📌 Common Use Cases:

1. **Finding the middle of a linked list**
2. **Detecting a cycle in a linked list**
3. **Finding the starting node of the cycle**
4. **Checking palindrome in a linked list**

---

## ✅ 1. Finding the Middle (Example):

```cpp
ListNode* middleNode(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;

    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }

    return slow; // middle node
}
```

When `fast` reaches the end, `slow` will be at the middle.

---

## ✅ 2. Detecting a Cycle:

```cpp
bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;

    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;

        if (slow == fast) return true; // cycle found
    }

    return false;
}
```

If a cycle exists, fast and slow will eventually **meet**.

---

## 🧠 Why It Works:

* The hare (fast pointer) "laps" the tortoise (slow pointer) in case of a cycle.
* In linear structure, fast reaches the end twice as fast as slow.
* Time: **O(n)** | Space: **O(1)** — no extra memory.

---

## 🧪 Visualization (Middle Finder):

For list: `1 → 2 → 3 → 4 → 5`

| Step  | slow  | fast  |
| ----- | ----- | ----- |
| 1     | 1     | 1     |
| 2     | 2     | 3     |
| 3     | 3     | 5     |

→ `slow` stops at 3 (middle)


Yes! Let’s look at the **Brute Force approach** for **cycle detection** in a linked list before using the Tortoise-Hare method.

---

## 🔁 Problem:

Given a singly linked list, **detect if it has a cycle** (i.e., if a node's `next` pointer eventually points back to a previous node).

---

## ✅ Brute Force Approach: Using Hashing (Visited Set)

### 💡 Idea:

* Store each visited node's address in a `set` or `unordered_map`.
* If you revisit a node you've already seen → there's a **cycle**.

### 🔧 Code (C++):

```cpp
class Solution {
public:
    bool hasCycle(ListNode *head) {
        unordered_set<ListNode*> visited;

        while (head != nullptr) {
            if (visited.count(head)) {
                return true; // cycle found
            }
            visited.insert(head);
            head = head->next;
        }

        return false; // no cycle
    }
};
```

---

## 🧠 Time and Space:

| Metric  | Value                                        |
| ------- | -------------------------------------------- |
| Time    | O(n)  – at most `n` nodes visited once       |
| Space   | O(n)  – due to extra `unordered_set` storage |

---

## 📌 Why Not Ideal?

While it's easy to implement and understand, it **uses extra memory**.
That's why the **Floyd’s Cycle Detection (Tortoise and Hare)** method is preferred — it's **O(1) space**.

---

## 🔄 Tortoise-Hare (Optimized):

* Slow and fast pointers
* Meet inside the cycle if it exists
* Time: O(n), Space: O(1)



Great question! The **intuition** behind **Floyd’s Cycle Detection Algorithm** (aka **Tortoise and Hare**) is simple yet powerful — it uses two pointers moving at different speeds to detect a loop in a linked list **without extra space**.

---

## 🧠 **Intuition (Real-World Analogy):**

Imagine two people (Tortoise 🐢 and Hare 🐇) running on a circular track:

* The **Tortoise** moves 1 step at a time.
* The **Hare** moves 2 steps at a time.

If the track is **circular**, then eventually the **Hare will lap the Tortoise** — i.e., they'll **meet at some point** on the track.

If the track is **linear (no cycle)**, the Hare will reach the end (`nullptr`) and never meet the Tortoise.

---

## 💡 Why Does It Work in a Linked List?

### 🔁 If there is a **cycle**:

* Let’s say the cycle starts at node C.
* When both pointers enter the cycle, the distance between them decreases by 1 in every iteration (because `hare` moves 2 steps, `slow` moves 1).
* Eventually, **they meet inside the cycle** — just like in the real-world analogy.

### 🧷 If there is **no cycle**:

* `fast` will reach the end (`nullptr`) before `slow`.
* Hence, no meeting = no cycle.

---

## ✅ Example:

```cpp
bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;

    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;

        if (slow == fast) return true; // pointers meet ⇒ cycle
    }

    return false; // fast hit nullptr ⇒ no cycle
}
```

---

## ⏱ Time and Space:

| Metric    | Value      |
| --------- | ---------- |
| Time      | O(n)       |
| Space     | O(1)       |

No extra memory — that’s the beauty of Floyd’s Algorithm!

---

## 📌 Summary:

* **Core idea:** Two pointers at different speeds.
* **If there's a cycle**, they **must meet**.
* **If no cycle**, `fast` reaches null → return false.



Absolutely! Let's go through the **mathematical proof** (intuition + equations) behind **Floyd's Cycle Detection Algorithm** — why the **Tortoise and Hare** will always meet **if a cycle exists** in a linked list.

---

## 🧩 Notation Setup:

Let’s assume:

* Linked list: `head → ... → C → ... → M → ... → C`
  where `C` is the **start of the cycle** and `M` is the **meeting point inside the cycle**.

Let:

* `L` = number of nodes **before** the cycle starts
* `C` = **length of the cycle**
* `x` = number of steps **from cycle start to meeting point**
* `s` = steps taken by **slow pointer** to reach meeting
* `2s` = steps taken by **fast pointer** to reach meeting (since fast moves 2× speed)

Then the **distance covered** can be split:

* Slow pointer travels: `s = L + x`
* Fast pointer travels: `2s = L + x + n·C` (because fast may loop around the cycle `n` times)

---

## 📐 Key Equation:

From above:

```
2s = s + n·C
```

Subtracting `s`:

```
s = n·C
```

→ So the number of steps taken by slow pointer is a **multiple of the cycle length**
→ Therefore, **both pointers must meet inside the cycle** after some full turns by the fast pointer

---

## 🔁 Why do they meet?

At each step **inside the cycle**:

* Slow moves by `+1`
* Fast moves by `+2`

So **relative movement = 1 node per step toward catching up**

→ Just like in modular arithmetic, they must meet **within `C` steps**, since you're effectively moving in a **mod C loop** with relative speed `1`.

---

## 🔍 Visual Summary:

```
[Linear Part (L nodes)] → [Cycle Start C] → x steps → [Meeting Point M]

Let s = L + x steps by slow
Then fast = 2s = L + x + nC
⇒ s = nC ⇒ L + x = nC ⇒ x = nC - L
```

This guarantees that both pointers land at the **same point inside the cycle**.

---

## 📌 Conclusion:

### If a cycle exists:

* Fast will always lap slow (like two runners on a track).
* Their relative distance reduces by 1 each step (mod C), ensuring a meeting.

### If no cycle:

* Fast hits `nullptr`, no meeting ⇒ return false.

---





**length of a loop in a linked list**

 using **Floyd's Cycle Detection Algorithm (Tortoise and Hare)**:

---

### ✅ **Goal:**

To return the number of nodes in the loop of a linked list. If no loop, return `0`.

---

### ✅ **Approach: Floyd's Cycle Detection (Tortoise-Hare Method)**

#### 🚀 Step-by-step logic:

1. **Initialize two pointers:**

   ```cpp
   Node* slow = head;
   Node* fast = head;
   ```

2. **Traverse the list:**

   * Move `slow` by 1 step.
   * Move `fast` by 2 steps.
   * If `slow == fast`, a loop is detected.

3. **Count the loop length:**

   * From the meeting point, keep moving one pointer until it reaches back to itself, incrementing a counter.

---

### ✅ **Dry Run Example:**

Suppose loop: `3 → 4 → 5 → 6 → 3 ...`
Once `slow` and `fast` meet at node 5, we count loop length from node 5 till it cycles back.

---

### ✅ **Code Breakdown:**

```cpp
int countNodesinLoop(Node *head) {
    Node* slow = head;
    Node* fast = head;

    // Base case check
    if (head == NULL || head->next == NULL)
        return 0;

    // Detecting loop
    while (fast->next != NULL && fast->next->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;

        // Loop found
        if (slow == fast) {
            Node* temp = slow->next;
            int cnt = 1;

            while (temp != slow) {
                temp = temp->next;
                cnt++;
            }

            return cnt;
        }
    }

    return 0; // No loop found
}
```

---

### ✅ **Time & Space Complexity:**

* **Time:** O(N) — worst case traversal.
* **Space:** O(1) — constant extra space.

---

### ✅ **Alternate (Brute Force) Approach:**

Using a `map` to store visited nodes and detect revisits:

```cpp
unordered_map<Node*, int> mp;
Node* temp = head;
int i = 1;

while (temp != nullptr) {
    if (mp.find(temp) != mp.end()) {
        return i - mp[temp];
    }
    mp[temp] = i;
    temp = temp->next;
    i++;
}
```

* ❌ But this uses **O(N)** extra space.

---

### ✅ **Final Notes:**

* Floyd's algorithm is preferred due to **space efficiency**.
* Once a cycle is detected, counting nodes is straightforward by cycling through until pointer reaches the start again.


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











Excellent question — you're noticing a subtle but important **difference between use cases** of `unordered_map` (or `map`) and **when comparing pointers (`ListNode*`) is valid vs when it's not**. Let’s break it down clearly:

---

### ✅ When comparing or storing `ListNode*` in a map **makes sense**

#### 📌 Example: Detecting a loop or computing length of cycle

In problems like:

* Detecting cycle in a linked list (Floyd’s or using hashmap)
* Finding length of a list by tracking visited nodes

You **do** store nodes (`ListNode*`) as keys in a `map` or `unordered_map`:

```cpp
unordered_map<ListNode*, bool> visited;
while (head != nullptr) {
    if (visited[head]) return true; // Already seen this node
    visited[head] = true;
    head = head->next;
}
```

✅ This works because we want to **track whether we've seen the *same node in memory***.

---

### ❌ But in palindrome check: we don't care about pointer identity

In a **palindrome**, we only care whether the **values match in forward and reverse**, like:

```
1 → 2 → 3 → 2 → 1   (is a palindrome)
```

Here, the two `2`s or two `1`s are **different nodes in memory**, but have **same value**.

So:

```cpp
st.top() == temp       // ❌ pointer comparison (wrong)
st.top()->val == temp->val  // ✅ value comparison (correct)
```

If you stored node pointers in a `stack`, comparing them like:

```cpp
if (st.top() == temp)
```

is like asking:

> “Is the first `2` in the list the exact same object as the last `2`?”

That’s **false**, even though the values match.

---

### ⚠️ Why pointer comparison works in hashmap for loops, but not here:

| Task                       | Compare Nodes (`ListNode*`) | Compare Values (`val`)        |
| -------------------------- | --------------------------- | ----------------------------- |
| Cycle Detection / Visited? | ✅ Yes — same memory         | ❌ No — values can repeat      |
| Length by unique nodes     | ✅ Yes — avoid revisiting    | ❌ No — same value ≠ same node |
| Palindrome Check           | ❌ No — different nodes      | ✅ Yes — values must match     |

---

### 🔁 Final Analogy

Imagine a list like this:

```
Node A (val=2) → Node B (val=2)
```

Even though both have `val = 2`, `A != B` in memory:

```cpp
if (A == B) → false  ❌
if (A->val == B->val) → true ✅
```

---

### ✅ Summary:

* You can **store `ListNode*` in maps/sets** when you care about the **actual node object** (like detecting cycles).
* You must compare **values (`node->val`)** when solving problems like **palindromes**, where **value symmetry** matters — not identity.





Here are clean, handwritten-style **notes for the question `oddEvenList`** (Leetcode 328) — rearranging a singly linked list such that all odd-indexed nodes come first, followed by all even-indexed nodes:

---

### ✅ **Problem Statement**

Given a singly linked list, group all the **odd-indexed** nodes together followed by the **even-indexed** nodes.
**1-based indexing**.

---

### 🧠 **Approach (In-place, O(1) space):**

We maintain **two separate lists** during traversal:

| Pointer    | Points to                                      |
| ---------- | ---------------------------------------------- |
| `oddtemp`  | Last node of the odd list                      |
| `eventemp` | Last node of the even list                     |
| `head`     | First node of the full list                    |
| `test`     | Stores start of even list for final connection |

We alternate pointers to build two separate chains:

* `odd → odd → odd`
* `even → even → even`

Finally, connect the last odd node to the first even node.

---

### 🔁 **Loop Condition:**

```cpp
while (eventemp && eventemp->next)
```

To avoid heap error:

* `eventemp->next` must not be accessed when `eventemp == nullptr`

---

### 🔍 **Dry Run Example:**

```txt
Input: 1 → 2 → 3 → 4 → 5 → NULL
Odd list:   1 → 3 → 5
Even list:    2 → 4
Final: 1 → 3 → 5 → 2 → 4 → NULL
```

---

### ✨ **Code (Final):**

```cpp
class Solution {
public:
    ListNode* oddEvenList(ListNode* head) {
        if (!head || !head->next) return head;

        ListNode* oddtemp = head;
        ListNode* eventemp = head->next;
        ListNode* test = head->next; // start of even list

        while (eventemp && eventemp->next) {
            oddtemp->next = eventemp->next;
            oddtemp = oddtemp->next;

            eventemp->next = oddtemp->next;
            eventemp = eventemp->next;
        }

        oddtemp->next = test;
        return head;
    }
};
```

---

### 🕒 **Time and Space Complexity:**

* **Time:** O(n) → One full pass
* **Space:** O(1) → In-place rearrangement

---

### 💡 Important Concepts:

* Always **check `ptr && ptr->next`** before pointer jumps
* Use **extra pointer** (`test`) to remember even list start
* Move two pointers alternately (odd then even)

---



Yes! You are exactly right.
For the problem **“Sort a linked list of 0s, 1s, and 2s”**, here are the two approaches you mentioned:

---

### ✅ **Brute Force Approach: Count and Overwrite**

**Idea:** Count number of 0s, 1s, and 2s in the list, then update node values accordingly.

#### Steps:

1. Traverse and count: `cnt0`, `cnt1`, `cnt2`
2. Traverse again and overwrite:

   * First `cnt0` nodes as 0
   * Then `cnt1` nodes as 1
   * Then `cnt2` nodes as 2

#### Code (Brute Force):

```cpp
void sortList(ListNode* head) {
    int count[3] = {0};

    ListNode* temp = head;
    while (temp != NULL) {
        count[temp->val]++;
        temp = temp->next;
    }

    temp = head;
    int i = 0;
    while (temp != NULL) {
        if (count[i] == 0) i++;
        else {
            temp->val = i;
            count[i]--;
            temp = temp->next;
        }
    }
}
```

#### ✅ Time: O(n), Space: O(1)

But **you modify values**, which may not be allowed in some cases.

---

### ✅ **Optimal Approach: Create 3 Dummy Lists (0s, 1s, 2s)**

**Idea:** Don't change values. Instead, create three new lists for 0s, 1s, and 2s using dummy nodes, then link them together.

#### Steps:

1. Create dummy heads for 0, 1, and 2.
2. Traverse original list, attach nodes to respective lists.
3. Merge the three lists.
4. Return the new head.

#### Code (Optimal - No value change):

```cpp
ListNode* sortList(ListNode* head) {
    if (!head || !head->next) return head;

    // Dummy nodes
    ListNode *zeroDummy = new ListNode(-1);
    ListNode *oneDummy = new ListNode(-1);
    ListNode *twoDummy = new ListNode(-1);

    ListNode *zero = zeroDummy, *one = oneDummy, *two = twoDummy;

    // Distribute nodes
    ListNode* curr = head;
    while (curr) {
        if (curr->val == 0) {
            zero->next = curr;
            zero = zero->next;
        }
        else if (curr->val == 1) {
            one->next = curr;
            one = one->next;
        }
        else {
            two->next = curr;
            two = two->next;
        }
        curr = curr->next;
    }

    // Connect lists
    zero->next = oneDummy->next ? oneDummy->next : twoDummy->next;
    one->next = twoDummy->next;
    two->next = NULL;

    // Final head
    ListNode* newHead = zeroDummy->next;

    // Free dummy nodes
    delete zeroDummy;
    delete oneDummy;
    delete twoDummy;

    return newHead;
}
```

---

### ✅ Time: O(n)

### ✅ Space: O(1) (ignoring dummy nodes)

### ✅ No value modification

---

### Summary Table:

| Approach          | Value Modified | Extra Space | Time | Notes                             |
| ----------------- | -------------- | ----------- | ---- | --------------------------------- |
| Count & Overwrite | Yes ✅          | O(1)        | O(n) | Easy, but changes data            |
| Dummy Node Lists  | No ❌           | O(1)        | O(n) | Best for preserving original data |

---




Here's a **simple and clean C++ code** to **merge two sorted linked lists**:

---

### ✅ Optimal Approach (Iterative)

```cpp
ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    ListNode dummy(0);              // Dummy head node
    ListNode* tail = &dummy;

    while (list1 && list2) {
        if (list1->val < list2->val) {
            tail->next = list1;
            list1 = list1->next;
        } else {
            tail->next = list2;
            list2 = list2->next;
        }
        tail = tail->next;
    }

    // Attach the remaining list
    if (list1) tail->next = list1;
    if (list2) tail->next = list2;

    return dummy.next;
}
```

---

### 🔁 Recursive Version (Optional)

```cpp
ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    if (!list1) return list2;
    if (!list2) return list1;

    if (list1->val < list2->val) {
        list1->next = mergeTwoLists(list1->next, list2);
        return list1;
    } else {
        list2->next = mergeTwoLists(list1, list2->next);
        return list2;
    }
}
```

---


Here's the **C++ code to copy a linked list with random pointer using an `unordered_map`** (brute force but intuitive):

---

### ✅ Approach: Using `unordered_map`

We use a hash map to store the mapping from original nodes → cloned nodes.

---

### ✅ Code:

```cpp
class Node {
public:
    int val;
    Node* next;
    Node* random;

    Node(int _val) {
        val = _val;
        next = nullptr;
        random = nullptr;
    }
};

class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return NULL;

        unordered_map<Node*, Node*> mp;

        // Step 1: Create clone nodes and store mapping
        Node* temp = head;
        while (temp) {
            mp[temp] = new Node(temp->val);
            temp = temp->next;
        }

        // Step 2: Assign next and random pointers using the map
        temp = head;
        while (temp) {
            mp[temp]->next = mp[temp->next];      // clone next
            mp[temp]->random = mp[temp->random];  // clone random
            temp = temp->next;
        }

        return mp[head];
    }
};
```

---

### 🧠 Time & Space Complexity:

* **Time:** `O(N)` – two passes over the list.
* **Space:** `O(N)` – map stores N mappings.

---
Here’s a **clean and optimal C++ code** for **Copy List with Random Pointer**:

---

### ✅ Problem:

Each node has:

* `next` pointer to the next node,
* `random` pointer to any node (or NULL).

You need to **create a deep copy** of the list.

---

### 💡 Optimal Approach (O(N) time, O(1) space):

**3 Steps:**

1. **Clone and insert copy nodes** in between original nodes.
2. **Set random pointers** of copied nodes.
3. **Split the combined list** into original and copied.

---

### ✅ Code:

```cpp
class Node {
public:
    int val;
    Node* next;
    Node* random;

    Node(int _val) {
        val = _val;
        next = nullptr;
        random = nullptr;
    }
};

class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return NULL;

        // Step 1: Clone nodes and insert after original
        Node* temp = head;
        while (temp) {
            Node* copy = new Node(temp->val);
            copy->next = temp->next;
            temp->next = copy;
            temp = copy->next;
        }

        // Step 2: Set random pointers for copy nodes
        temp = head;
        while (temp) {
            if (temp->random)
                temp->next->random = temp->random->next;
            temp = temp->next->next;
        }

        // Step 3: Separate the original and copied list
        temp = head;
        Node* newHead = head->next;
        Node* copy = newHead;

        while (temp) {
            temp->next = temp->next->next;
            if (copy->next)
                copy->next = copy->next->next;
            temp = temp->next;
            copy = copy->next;
        }

        return newHead;
    }
};
```

---

### 🧠 Time & Space Complexity:

* **Time:** `O(N)` – each node visited a few times.
* **Space:** `O(1)` – no extra map used (in-place trick).

---



Perfect! Here's the **summary** for the **“Check if Linked List is Palindrome”** question, covering both brute force (stack) and optimal approach:

---

## ✅ **Check if Linked List is a Palindrome**

---

### 🔹 **Brute Force Approach (Using Stack)**

**Idea:** Store all elements in a stack, then iterate again and compare.

#### 🔧 Steps:

1. Traverse and push all values into a stack.
2. Again traverse the list and pop from stack.
3. If any mismatch, return `false`.

#### 🧠 Code Snippet:

```cpp
bool isPalindrome(Node* head) {
    stack<int> st;
    Node* temp = head;
    while (temp) {
        st.push(temp->data);
        temp = temp->next;
    }
    temp = head;
    while (temp) {
        if (st.top() != temp->data) return false;
        st.pop();
        temp = temp->next;
    }
    return true;
}
```

#### 🕒 Time: O(N), 🔁 Space: O(N)

---

### 🔹 **Optimal Approach (Reverse Half and Compare)**

**Idea:** Find middle, reverse second half, compare halves, then restore.

#### 🔧 Steps:

1. Use **slow and fast pointers** to find the middle.
2. Reverse the **second half** of the list.
3. Compare **first half and second half** node-by-node.
4. If mismatch → return `false`.
5. **Re-reverse** the second half to restore original list.

#### 🧠 Code Snippet:

```cpp
Node* reverse(Node* head) {
    Node* prev = NULL;
    while (head) {
        Node* next = head->next;
        head->next = prev;
        prev = head;
        head = next;
    }
    return prev;
}

bool isPalindrome(Node* head) {
    if (!head || !head->next) return true;
    
    // Find middle
    Node *slow = head, *fast = head;
    while (fast->next && fast->next->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    
    // Reverse second half
    Node* secondHalf = reverse(slow->next);
    Node* firstHalf = head;
    Node* temp = secondHalf;
    
    // Compare
    while (temp) {
        if (firstHalf->data != temp->data) return false;
        firstHalf = firstHalf->next;
        temp = temp->next;
    }

    // Restore
    slow->next = reverse(secondHalf);
    
    return true;
}
```

#### 🕒 Time: O(N), 🔁 Space: O(1)

---

### ✅ Summary:

| Approach           | Time | Space | Extra Notes                |
| ------------------ | ---- | ----- | -------------------------- |
| Stack              | O(N) | O(N)  | Easy but not optimal       |
| Reverse Half (opt) | O(N) | O(1)  | Recommended for interviews |

---



Here is a **complete summary** of all the **linked list questions** you mentioned, including:

* Problem explanation
* Brute Force (BF) approach + code
* Optimal approach + code
* Key points

---

### ✅ 1. **Remove Nth Node from the End of the LL**

**📝 Problem**: Remove the Nth node from the end of the list.

#### 💡 Brute Force:

* Count total nodes.
* Remove `(length - n + 1)`th node from start.

```cpp
ListNode* removeNthFromEnd(ListNode* head, int n) {
    int len = 0;
    ListNode* temp = head;
    while (temp) {
        len++;
        temp = temp->next;
    }
    if (len == n) return head->next;
    temp = head;
    for (int i = 1; i < len - n; i++) temp = temp->next;
    temp->next = temp->next->next;
    return head;
}
```

#### ✅ Optimal (Two Pointer):

* Use slow and fast pointer with gap of `n`.

```cpp
ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0);
    dummy.next = head;
    ListNode* fast = &dummy;
    ListNode* slow = &dummy;

    for (int i = 0; i < n; i++) fast = fast->next;
    while (fast->next) {
        fast = fast->next;
        slow = slow->next;
    }
    slow->next = slow->next->next;
    return dummy.next;
}
```

---

### ✅ 2. **Delete the Middle Node of a LL**

**📝 Problem**: Delete the middle node of the list.

#### 💡 Brute Force:

* Count nodes and delete the middle.

```cpp
ListNode* deleteMiddle(ListNode* head) {
    if (!head || !head->next) return nullptr;
    int len = 0;
    ListNode* temp = head;
    while (temp) { len++; temp = temp->next; }

    int mid = len / 2;
    temp = head;
    for (int i = 1; i < mid; i++) temp = temp->next;
    temp->next = temp->next->next;
    return head;
}
```

#### ✅ Optimal (Slow-Fast):

* Use slow-fast pointer to find and delete middle.

```cpp
ListNode* deleteMiddle(ListNode* head) {
    if (!head || !head->next) return nullptr;
    ListNode* slow = head;
    ListNode* fast = head;
    ListNode* prev = nullptr;

    while (fast && fast->next) {
        prev = slow;
        slow = slow->next;
        fast = fast->next->next;
    }
    prev->next = slow->next;
    return head;
}
```

---

### ✅ 3. **Sort LL**

**📝 Problem**: Sort a linked list.

#### 💡 Brute Force:

* Copy to array → sort → reassign.

#### ✅ Optimal:

* Use **Merge Sort** for O(n log n).

```cpp
ListNode* merge(ListNode* l1, ListNode* l2) {
    ListNode dummy(0), *tail = &dummy;
    while (l1 && l2) {
        if (l1->val < l2->val) { tail->next = l1; l1 = l1->next; }
        else { tail->next = l2; l2 = l2->next; }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}

ListNode* sortList(ListNode* head) {
    if (!head || !head->next) return head;
    ListNode* slow = head;
    ListNode* fast = head->next;

    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }

    ListNode* mid = slow->next;
    slow->next = nullptr;

    ListNode* left = sortList(head);
    ListNode* right = sortList(mid);
    return merge(left, right);
}
```

---

### ✅ 4. **Sort LL of 0s, 1s, 2s (by links)**

**📝 Problem**: Given a list with values 0, 1, 2 — sort it.

#### 💡 Brute Force:

* Count 0s, 1s, 2s → update nodes.

```cpp
void sortList012(ListNode* head) {
    int cnt[3] = {0};
    ListNode* temp = head;
    while (temp) {
        cnt[temp->val]++;
        temp = temp->next;
    }
    temp = head;
    int i = 0;
    while (temp) {
        if (cnt[i] == 0) i++;
        else {
            temp->val = i;
            cnt[i]--;
            temp = temp->next;
        }
    }
}
```

#### ✅ Optimal:

* Use 3 dummy lists for 0s, 1s, 2s and merge.

```cpp
ListNode* sortList(ListNode* head) {
    ListNode zeroDummy(0), oneDummy(0), twoDummy(0);
    ListNode *zero = &zeroDummy, *one = &oneDummy, *two = &twoDummy;

    while (head) {
        if (head->val == 0) zero->next = head, zero = zero->next;
        else if (head->val == 1) one->next = head, one = one->next;
        else two->next = head, two = two->next;
        head = head->next;
    }

    zero->next = oneDummy.next ? oneDummy.next : twoDummy.next;
    one->next = twoDummy.next;
    two->next = nullptr;
    return zeroDummy.next;
}
```

---

### ✅ 5. **Find Intersection Point of Y-shaped LL**

**📝 Problem**: Find node where two LLs intersect.

#### 💡 Brute Force:

* Compare each node in list A to all nodes in list B — O(n²)

#### ✅ Optimal:

* Use difference in length technique.

```cpp
int getLength(ListNode* head) {
    int len = 0;
    while (head) { len++; head = head->next; }
    return len;
}

ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
    int lenA = getLength(headA);
    int lenB = getLength(headB);

    while (lenA > lenB) { headA = headA->next; lenA--; }
    while (lenB > lenA) { headB = headB->next; lenB--; }

    while (headA && headB && headA != headB) {
        headA = headA->next;
        headB = headB->next;
    }
    return headA;
}
```

---

### ✅ 6. **Add 1 to a Number Represented by LL**

**📝 Problem**: LL like `1->9->9` represents 199. Add 1 → 200.

#### 💡 Brute Force:

* Reverse LL → Add 1 → Reverse back.

```cpp
ListNode* reverse(ListNode* head) {
    ListNode* prev = nullptr;
    while (head) {
        ListNode* next = head->next;
        head->next = prev;
        prev = head;
        head = next;
    }
    return prev;
}

ListNode* addOne(ListNode* head) {
    head = reverse(head);
    ListNode* temp = head;
    int carry = 1;

    while (temp && carry) {
        int sum = temp->val + carry;
        temp->val = sum % 10;
        carry = sum / 10;
        if (!temp->next && carry) {
            temp->next = new ListNode(carry);
            carry = 0;
        }
        temp = temp->next;
    }

    return reverse(head);
}
```

---

### ✅ 7. **Add 2 Numbers Represented by LL**

**📝 Problem**: Each LL represents a number (reverse order). Add both.

#### 💡 Brute Force / Optimal: (same here)

```cpp
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* temp = &dummy;
    int carry = 0;

    while (l1 || l2 || carry) {
        int sum = carry;
        if (l1) sum += l1->val, l1 = l1->next;
        if (l2) sum += l2->val, l2 = l2->next;

        carry = sum / 10;
        temp->next = new ListNode(sum % 10);
        temp = temp->next;
    }
    return dummy.next;
}
```

---

lavanyamahalle: i will ask u codin gmcs will u give me answers

GitHub Copilot: Yes, I can help you with coding questions and provide answers. Please share your coding questions or problems, and I'll assist you.

lavanyamahalle: can i give me summary of all ques in this

GitHub Copilot: Here’s a concise summary of all the linked list questions and solutions covered in your notes:

---

### 1. **Basic Linked List Operations**
- **Push Front/Back, Pop Front/Back, Insert/Delete at Position, Search, Print**
- **Complexity:** Most are O(1) or O(n) depending on operation.

---

### 2. **Reverse Linked List**
- **Recursive and Iterative approaches**
- Reverse pointers one by one.
- **Complexity:** O(n) time, O(1) space.

---

### 3. **Find Middle of Linked List**
- **Two-pass:** Count nodes, then go to middle.
- **Optimal:** Use slow and fast pointers (Tortoise and Hare).
- **Complexity:** O(n) time, O(1) space.

---

### 4. **Detect Cycle in Linked List**
- **Brute Force:** Use a hash set to track visited nodes.
- **Optimal:** Floyd’s Cycle Detection (Tortoise and Hare).
- **Complexity:** O(n) time, O(1) space.

---

### 5. **Length of Loop in Linked List**
- After detecting cycle, count nodes in the loop.
- **Complexity:** O(n) time, O(1) space.

---

### 6. **Odd-Even Linked List**
- Rearrange nodes so all odd-indexed nodes come before even-indexed.
- Use two pointers for odd/even chains.
- **Complexity:** O(n) time, O(1) space.

---

### 7. **Sort Linked List of 0s, 1s, 2s**
- **Brute Force:** Count and overwrite values.
- **Optimal:** Create three dummy lists for 0s, 1s, 2s and merge.
- **Complexity:** O(n) time, O(1) space.

---

### 8. **Merge Two Sorted Linked Lists**
- **Iterative and Recursive solutions**
- Merge nodes in sorted order.
- **Complexity:** O(n) time, O(1) space.

---

### 9. **Copy List with Random Pointer**
- **Brute Force:** Use hash map to store original→copy mapping.
- **Optimal:** Interleave copy nodes, set random pointers, then split.
- **Complexity:** O(n) time, O(1) space (optimal).

---

If you want a summary for a specific question or code, let me know!

lavanyamahalle: give me the sumarry of all que

GitHub Copilot: Here’s a summary of all the major linked list questions and their approaches from your notes:

---

### 1. **Basic Linked List Operations**
- Push/Pop Front & Back, Insert/Delete at Position, Search, Print.
- **Time Complexity:** O(1) for front ops, O(n) for back/position ops.

---

### 2. **Reverse Linked List**
- **Recursive & Iterative:** Reverse pointers.
- **Time:** O(n), **Space:** O(1).

---

### 3. **Find Middle of Linked List**
- **Two-pass:** Count nodes, go to middle.
- **Optimal:** Slow/Fast pointers (Tortoise-Hare).
- **Time:** O(n), **Space:** O(1).

---

### 4. **Detect Cycle in Linked List**
- **Brute Force:** Hash set for visited nodes.
- **Optimal:** Floyd’s Cycle Detection (Tortoise-Hare).
- **Time:** O(n), **Space:** O(1).

---

### 5. **Length of Loop in Linked List**
- Use Floyd’s algorithm, count nodes in loop.
- **Time:** O(n), **Space:** O(1).

---

### 6. **Odd-Even Linked List**
- Rearrange nodes: odd-indexed first, then even-indexed.
- **Time:** O(n), **Space:** O(1).

---

### 7. **Sort Linked List of 0s, 1s, 2s**
- **Brute Force:** Count and overwrite values.
- **Optimal:** Dummy lists for 0s, 1s, 2s, then merge.
- **Time:** O(n), **Space:** O(1).

---

### 8. **Merge Two Sorted Linked Lists**
- **Iterative/Recursive:** Merge nodes in sorted order.
- **Time:** O(n), **Space:** O(1).

---

### 9. **Copy List with Random Pointer**
- **Brute Force:** Hash map for original→copy mapping.
- **Optimal:** Interleave copy nodes, set random pointers, split.
- **Time:** O(n), **Space:** O(1) (optimal).

---

### 10. **Check if Linked List is Palindrome**
- **Brute Force:** Stack to compare values.
- **Optimal:** Reverse second half, compare, restore.
- **Time:** O(n), **Space:** O(1) (optimal).

---

### 11. **Remove Nth Node from End**
- **Brute Force:** Count nodes, remove (length-n+1)th.
- **Optimal:** Two pointers with gap n.
- **Time:** O(n), **Space:** O(1).

---

### 12. **Delete Middle Node**
- **Brute Force:** Count nodes, delete middle.
- **Optimal:** Slow/Fast pointers, delete middle.
- **Time:** O(n), **Space:** O(1).

---

### 13. **Sort Linked List**
- **Optimal:** Merge Sort for O(n log n).
- **Time:** O(n log n), **Space:** O(1).

---

### 14. **Find Intersection Point of Y-shaped LL**
- **Optimal:** Align lengths, move together to find intersection.
- **Time:** O(n), **Space:** O(1).

---

### 15. **Add 1 to Number Represented by LL**
- Reverse, add 1, reverse back.
- **Time:** O(n), **Space:** O(1).

---

### 16. **Add Two Numbers Represented by LL**
- Traverse both, add digits, manage carry.
- **Time:** O(n), **Space:** O(1).

---

lavanyamahalle: i will ask u codin gmcs will u give me answers

GitHub Copilot: Yes, I can help you with coding questions and provide answers. Please share your coding questions or problems, and I'll assist you.

lavanyamahalle: can i give me summary of all ques in this

GitHub Copilot: Here’s a concise summary of all the linked list questions and solutions covered in your notes:

---

### 1. **Basic Linked List Operations**
- **Push Front/Back, Pop Front/Back, Insert/Delete at Position, Search, Print**
- **Complexity:** Most are O(1) or O(n) depending on operation.

---

### 2. **Reverse Linked List**
- **Recursive and Iterative approaches**
- Reverse pointers one by one.
- **Complexity:** O(n) time, O(1) space.

---

### 3. **Find Middle of Linked List**
- **Two-pass:** Count nodes, then go to middle.
- **Optimal:** Use slow and fast pointers (Tortoise and Hare).
- **Complexity:** O(n) time, O(1) space.

---

### 4. **Detect Cycle in Linked List**
- **Brute Force:** Use a hash set to track visited nodes.
- **Optimal:** Floyd’s Cycle Detection (Tortoise and Hare).
- **Complexity:** O(n) time, O(1) space.

---

### 5. **Length of Loop in Linked List**
- After detecting cycle, count nodes in the loop.
- **Complexity:** O(n) time, O(1) space.

---

### 6. **Odd-Even Linked List**
- Rearrange nodes so all odd-indexed nodes come before even-indexed.
- Use two pointers for odd/even chains.
- **Complexity:** O(n) time, O(1) space.

---

### 7. **Sort Linked List of 0s, 1s, 2s**
- **Brute Force:** Count and overwrite values.
- **Optimal:** Create three dummy lists for 0s, 1s, 2s and merge.
- **Complexity:** O(n) time, O(1) space.

---

### 8. **Merge Two Sorted Linked Lists**
- **Iterative and Recursive solutions**
- Merge nodes in sorted order.
- **Complexity:** O(n) time, O(1) space.

---

### 9. **Copy List with Random Pointer**
- **Brute Force:** Use hash map to store original→copy mapping.
- **Optimal:** Interleave copy nodes, set random pointers, then split.
- **Complexity:** O(n) time, O(1) space (optimal).

---

If you want a summary for a specific question or code, let me know!

lavanyamahalle: give me the sumarry of all que

GitHub Copilot: Here’s a summary of all the major linked list questions and their approaches from your notes:

---

### 1. **Basic Linked List Operations**
- Push/Pop Front & Back, Insert/Delete at Position, Search, Print.
- **Time Complexity:** O(1) for front ops, O(n) for back/position ops.

---

### 2. **Reverse Linked List**
- **Recursive & Iterative:** Reverse pointers.
- **Time:** O(n), **Space:** O(1).

---

### 3. **Find Middle of Linked List**
- **Two-pass:** Count nodes, go to middle.
- **Optimal:** Slow/Fast pointers (Tortoise-Hare).
- **Time:** O(n), **Space:** O(1).

---

### 4. **Detect Cycle in Linked List**
- **Brute Force:** Hash set for visited nodes.
- **Optimal:** Floyd’s Cycle Detection (Tortoise-Hare).
- **Time:** O(n), **Space:** O(1).

---

### 5. **Length of Loop in Linked List**
- Use Floyd’s algorithm, count nodes in loop.
- **Time:** O(n), **Space:** O(1).

---

### 6. **Odd-Even Linked List**
- Rearrange nodes: odd-indexed first, then even-indexed.
- **Time:** O(n), **Space:** O(1).

---

### 7. **Sort Linked List of 0s, 1s, 2s**
- **Brute Force:** Count and overwrite values.
- **Optimal:** Dummy lists for 0s, 1s, 2s, then merge.
- **Time:** O(n), **Space:** O(1).

---

### 8. **Merge Two Sorted Linked Lists**
- **Iterative/Recursive:** Merge nodes in sorted order.
- **Time:** O(n), **Space:** O(1).

---

### 9. **Copy List with Random Pointer**
- **Brute Force:** Hash map for original→copy mapping.
- **Optimal:** Interleave copy nodes, set random pointers, split.
- **Time:** O(n), **Space:** O(1) (optimal).

---

### 10. **Check if Linked List is Palindrome**
- **Brute Force:** Stack to compare values.
- **Optimal:** Reverse second half, compare, restore.
- **Time:** O(n), **Space:** O(1) (optimal).

---

### 11. **Remove Nth Node from End**
- **Brute Force:** Count nodes, remove (length-n+1)th.
- **Optimal:** Two pointers with gap n.
- **Time:** O(n), **Space:** O(1).

---

### 12. **Delete Middle Node**
- **Brute Force:** Count nodes, delete middle.
- **Optimal:** Slow/Fast pointers, delete middle.
- **Time:** O(n), **Space:** O(1).

---

### 13. **Sort Linked List**
- **Optimal:** Merge Sort for O(n log n).
- **Time:** O(n log n), **Space:** O(1).

---

### 14. **Find Intersection Point of Y-shaped LL**
- **Optimal:** Align lengths, move together to find intersection.
- **Time:** O(n), **Space:** O(1).

---

### 15. **Add 1 to Number Represented by LL**
- Reverse, add 1, reverse back.
- **Time:** O(n), **Space:** O(1).

---

### 16. **Add Two Numbers Represented by LL**
- Traverse both, add digits, manage carry.
- **Time:** O(n), **Space:** O(1).

---

If you want details or code for any specific question, let me know!

lavanyamahalle: write ques together with similar pattern

GitHub Copilot: Here’s a summary of all linked list questions from your notes, written in a similar pattern for easy revision:

---

### 1. **Basic Linked List Operations**
- **Push/Pop Front & Back, Insert/Delete at Position, Search, Print**
- *Time Complexity:* O(1) for front ops, O(n) for back/position ops

---

### 2. **Reverse Linked List**
- **Reverse pointers (Recursive/Iterative)**
- *Time:* O(n), *Space:* O(1)

---

### 3. **Find Middle of Linked List**
- **Find middle using two-pass or slow/fast pointers**
- *Time:* O(n), *Space:* O(1)

---

### 4. **Detect Cycle in Linked List**
- **Detect cycle using hash set or Floyd’s Tortoise-Hare**
- *Time:* O(n), *Space:* O(1)

---

### 5. **Length of Loop in Linked List**
- **Count nodes in loop after cycle detection**
- *Time:* O(n), *Space:* O(1)

---

### 6. **Odd-Even Linked List**
- **Rearrange nodes: odd-indexed first, then even-indexed**
- *Time:* O(n), *Space:* O(1)

---

### 7. **Sort Linked List of 0s, 1s, 2s**
- **Sort using count & overwrite or dummy lists**
- *Time:* O(n), *Space:* O(1)

---

### 8. **Merge Two Sorted Linked Lists**
- **Merge nodes in sorted order (Iterative/Recursive)**
- *Time:* O(n), *Space:* O(1)

---

### 9. **Copy List with Random Pointer**
- **Deep copy using hash map or interleaving nodes**
- *Time:* O(n), *Space:* O(1) (optimal)

---

### 10. **Check if Linked List is Palindrome**
- **Check palindrome using stack or reverse second half**
- *Time:* O(n), *Space:* O(1) (optimal)

---

### 11. **Remove Nth Node from End**
- **Remove nth node using count or two pointers**
- *Time:* O(n), *Space:* O(1)

---

### 12. **Delete Middle Node**
- **Delete middle node using count or slow/fast pointers**
- *Time:* O(n), *Space:* O(1)

---

### 13. **Sort Linked List**
- **Sort using merge sort**
- *Time:* O(n log n), *Space:* O(1)

---

### 14. **Find Intersection Point of Y-shaped LL**
- **Find intersection by aligning lengths**
- *Time:* O(n), *Space:* O(1)

---

### 15. **Add 1 to Number Represented by LL**
- **Reverse, add 1, reverse back**
- *Time:* O(n), *Space:* O(1)

---

### 16. **Add Two Numbers Represented by LL**
- **Traverse both, add digits, manage carry**
- *Time:* O(n), *Space:* O(1)

---

Let me know if you want code or explanation for any question!

lavanyamahalle: give me brute f and optimal approaches for all these que in detail as same like in this file

GitHub Copilot: Here’s a detailed summary of **brute force and optimal approaches** for all major linked list questions, following the same style as your notes:

---

### 1. **Reverse Linked List**

**Brute Force:**  
- Copy values to array, reverse array, reassign to nodes.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Reverse pointers in-place (iterative or recursive).  
- **Time:** O(n), **Space:** O(1)

---

### 2. **Find Middle of Linked List**

**Brute Force:**  
- Count nodes, go to middle (`count/2`th node).  
- **Time:** O(n), **Space:** O(1)

**Optimal:**  
- Use slow and fast pointers (Tortoise-Hare).  
- **Time:** O(n), **Space:** O(1)

---

### 3. **Detect Cycle in Linked List**

**Brute Force:**  
- Use hash set to store visited nodes, check for repeats.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Floyd’s Cycle Detection (slow/fast pointers).  
- **Time:** O(n), **Space:** O(1)

---

### 4. **Length of Loop in Linked List**

**Brute Force:**  
- Use map to store node positions, detect revisit, calculate loop length.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- After cycle detected (Floyd’s), count nodes in loop by moving pointer until it meets again.  
- **Time:** O(n), **Space:** O(1)

---

### 5. **Odd-Even Linked List**

**Brute Force:**  
- Copy odd and even nodes to separate arrays, rebuild list.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Use two pointers to build odd and even chains, connect at end.  
- **Time:** O(n), **Space:** O(1)

---

### 6. **Sort Linked List of 0s, 1s, 2s**

**Brute Force:**  
- Count 0s, 1s, 2s, overwrite node values.  
- **Time:** O(n), **Space:** O(1)

**Optimal:**  
- Create three dummy lists for 0s, 1s, 2s, merge them.  
- **Time:** O(n), **Space:** O(1)

---

### 7. **Merge Two Sorted Linked Lists**

**Brute Force:**  
- Copy all nodes to array, sort, rebuild list.  
- **Time:** O(n log n), **Space:** O(n)

**Optimal:**  
- Merge nodes one by one (iterative or recursive).  
- **Time:** O(n), **Space:** O(1)

---

### 8. **Copy List with Random Pointer**

**Brute Force:**  
- Use hash map to store original→copy mapping, set next/random pointers.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Interleave copy nodes, set random pointers, split lists.  
- **Time:** O(n), **Space:** O(1)

---

### 9. **Check if Linked List is Palindrome**

**Brute Force:**  
- Store values in stack, compare with original list.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Reverse second half, compare halves, restore list.  
- **Time:** O(n), **Space:** O(1)

---

### 10. **Remove Nth Node from End**

**Brute Force:**  
- Count nodes, remove `(length-n+1)`th node.  
- **Time:** O(n), **Space:** O(1)

**Optimal:**  
- Use two pointers with gap n, remove node.  
- **Time:** O(n), **Space:** O(1)

---

### 11. **Delete Middle Node**

**Brute Force:**  
- Count nodes, delete middle.  
- **Time:** O(n), **Space:** O(1)

**Optimal:**  
- Use slow/fast pointers, delete middle.  
- **Time:** O(n), **Space:** O(1)

---

### 12. **Sort Linked List**

**Brute Force:**  
- Copy to array, sort, reassign.  
- **Time:** O(n log n), **Space:** O(n)

**Optimal:**  
- Merge sort on linked list.  
- **Time:** O(n log n), **Space:** O(1)

---

### 13. **Find Intersection Point of Y-shaped LL**

**Brute Force:**  
- Compare each node in list A to all nodes in list B.  
- **Time:** O(n²), **Space:** O(1)

**Optimal:**  
- Align lengths, move together to find intersection.  
- **Time:** O(n), **Space:** O(1)

---

### 14. **Add 1 to Number Represented by LL**

**Brute Force:**  
- Convert to integer, add 1, rebuild list.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Reverse, add 1, reverse back.  
- **Time:** O(n), **Space:** O(1)

---

### 15. **Add Two Numbers Represented by LL**

**Brute Force:**  
- Convert both to integers, add, rebuild list.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Traverse both, add digits, manage carry.  
- **Time:** O(n), **Space:** O(1)

---

Let me know if you want code snippets for any specific approach!

lavanyamahalle: give me brute f and optimal approaches for all these que in detail as same like in this file

GitHub Copilot: Here are the brute force and optimal approaches for all major linked list questions, written in the same detailed style as your file:

---

### 1. Reverse Linked List

**Brute Force:**  
- Copy all node values to an array, reverse the array, reassign values to nodes.  
- **Time:** O(n), **Space:** O(n)

**Optimal (In-place):**  
- Reverse pointers using iterative or recursive method.  
- **Time:** O(n), **Space:** O(1)

---

### 2. Find Middle of Linked List

**Brute Force:**  
- Count total nodes, then go to the middle (`count/2`th node).  
- **Time:** O(n), **Space:** O(1)

**Optimal:**  
- Use slow and fast pointers (Tortoise-Hare).  
- **Time:** O(n), **Space:** O(1)

---

### 3. Detect Cycle in Linked List

**Brute Force:**  
- Use a hash set to store visited nodes, return true if a node is revisited.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Floyd’s Cycle Detection (slow/fast pointers).  
- **Time:** O(n), **Space:** O(1)

---

### 4. Length of Loop in Linked List

**Brute Force:**  
- Use a map to store node positions, detect revisit, calculate loop length.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- After cycle detected (Floyd’s), count nodes in loop by moving pointer until it meets again.  
- **Time:** O(n), **Space:** O(1)

---

### 5. Odd-Even Linked List

**Brute Force:**  
- Copy odd and even nodes to separate arrays, rebuild list.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Use two pointers to build odd and even chains, connect at end.  
- **Time:** O(n), **Space:** O(1)

---

### 6. Sort Linked List of 0s, 1s, 2s

**Brute Force:**  
- Count 0s, 1s, 2s, overwrite node values.  
- **Time:** O(n), **Space:** O(1)

**Optimal:**  
- Create three dummy lists for 0s, 1s, 2s, merge them.  
- **Time:** O(n), **Space:** O(1)

---

### 7. Merge Two Sorted Linked Lists

**Brute Force:**  
- Copy all nodes to array, sort, rebuild list.  
- **Time:** O(n log n), **Space:** O(n)

**Optimal:**  
- Merge nodes one by one (iterative or recursive).  
- **Time:** O(n), **Space:** O(1)

---

### 8. Copy List with Random Pointer

**Brute Force:**  
- Use hash map to store original→copy mapping, set next/random pointers.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Interleave copy nodes, set random pointers, split lists.  
- **Time:** O(n), **Space:** O(1)

---

### 9. Check if Linked List is Palindrome

**Brute Force:**  
- Store values in stack, compare with original list.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Reverse second half, compare halves, restore list.  
- **Time:** O(n), **Space:** O(1)

---

### 10. Remove Nth Node from End

**Brute Force:**  
- Count nodes, remove `(length-n+1)`th node.  
- **Time:** O(n), **Space:** O(1)

**Optimal:**  
- Use two pointers with gap n, remove node.  
- **Time:** O(n), **Space:** O(1)

---

### 11. Delete Middle Node

**Brute Force:**  
- Count nodes, delete middle.  
- **Time:** O(n), **Space:** O(1)

**Optimal:**  
- Use slow/fast pointers, delete middle.  
- **Time:** O(n), **Space:** O(1)

---

### 12. Sort Linked List

**Brute Force:**  
- Copy to array, sort, reassign.  
- **Time:** O(n log n), **Space:** O(n)

**Optimal:**  
- Merge sort on linked list.  
- **Time:** O(n log n), **Space:** O(1)

---

### 13. Find Intersection Point of Y-shaped LL

**Brute Force:**  
- Compare each node in list A to all nodes in list B.  
- **Time:** O(n²), **Space:** O(1)

**Optimal:**  
- Align lengths, move together to find intersection.  
- **Time:** O(n), **Space:** O(1)

---

### 14. Add 1 to Number Represented by LL

**Brute Force:**  
- Convert to integer, add 1, rebuild list.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Reverse, add 1, reverse back.  
- **Time:** O(n), **Space:** O(1)

---

### 15. Add Two Numbers Represented by LL

**Brute Force:**  
- Convert both to integers, add, rebuild list.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Traverse both, add digits, manage carry.  
- **Time:** O(n), **Space:** O(1)

---



---

### 1. Push/Pop Front & Back, Insert/Delete at Position, Search, Print

**Approach:**  
- Use pointer manipulation for each operation.
- For push/pop front: update head.
- For push/pop back: traverse to end.
- For insert/delete at position: traverse to position, update links.
- For search: traverse and compare values.
- For print: traverse and print values.

**Pseudocode:**
```
pushFront(data):
    newNode = Node(data)
    newNode.next = head
    head = newNode

pushBack(data):
    newNode = Node(data)
    if head == NULL: head = newNode
    else: traverse to end, last.next = newNode

popFront():
    if head == NULL: return
    temp = head
    head = head.next
    delete temp

popBack():
    if head == NULL: return
    if head.next == NULL: delete head; head = NULL
    else: traverse to second last, delete last

insertAtPosition(data, pos):
    if pos == 0: pushFront(data)
    else: traverse to pos-1, insert newNode

deleteAtPosition(pos):
    if pos == 0: popFront()
    else: traverse to pos-1, delete node at pos

search(key):
    traverse, if node.data == key: return true
    return false

print():
    traverse, print node.data
```

---

### 2. Reverse Linked List

**Brute Force:**  
- Copy values to array, reverse array, reassign to nodes.

**Optimal:**  
- Reverse pointers in-place.

**Pseudocode:**
```
reverseList(head):
    prev = NULL
    curr = head
    while curr != NULL:
        next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    return prev
```

---

### 3. Find Middle of Linked List

**Brute Force:**  
- Count nodes, go to middle.

**Optimal:**  
- Use slow/fast pointers.

**Pseudocode:**
```
middleNode(head):
    slow = head
    fast = head
    while fast != NULL and fast.next != NULL:
        slow = slow.next
        fast = fast.next.next
    return slow
```

---

### 4. Detect Cycle in Linked List

**Brute Force:**  
- Use hash set to store visited nodes.

**Optimal:**  
- Floyd’s Cycle Detection (slow/fast pointers).

**Pseudocode:**
```
hasCycle(head):
    slow = head
    fast = head
    while fast != NULL and fast.next != NULL:
        slow = slow.next
        fast = fast.next.next
        if slow == fast: return true
    return false
```

---

### 5. Length of Loop in Linked List

**Brute Force:**  
- Use map to store node positions, detect revisit.

**Optimal:**  
- After cycle detected, count nodes in loop.

**Pseudocode:**
```
countNodesinLoop(head):
    slow = head
    fast = head
    while fast != NULL and fast.next != NULL:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            count = 1
            temp = slow.next
            while temp != slow:
                count += 1
                temp = temp.next
            return count
    return 0
```

---

### 6. Odd-Even Linked List

**Brute Force:**  
- Copy odd/even nodes to arrays, rebuild list.

**Optimal:**  
- Use two pointers to build odd/even chains, connect at end.

**Pseudocode:**
```
oddEvenList(head):
    if head == NULL or head.next == NULL: return head
    odd = head
    even = head.next
    evenHead = even
    while even != NULL and even.next != NULL:
        odd.next = even.next
        odd = odd.next
        even.next = odd.next
        even = even.next
    odd.next = evenHead
    return head
```

---

### 7. Sort Linked List of 0s, 1s, 2s

**Brute Force:**  
- Count 0s, 1s, 2s, overwrite node values.

**Optimal:**  
- Create three dummy lists for 0s, 1s, 2s, merge.

**Pseudocode:**
```
sortList(head):
    zeroDummy, oneDummy, twoDummy = new Node(), new Node(), new Node()
    zero, one, two = zeroDummy, oneDummy, twoDummy
    curr = head
    while curr != NULL:
        if curr.val == 0: zero.next = curr; zero = zero.next
        elif curr.val == 1: one.next = curr; one = one.next
        else: two.next = curr; two = two.next
        curr = curr.next
    zero.next = oneDummy.next if oneDummy.next else twoDummy.next
    one.next = twoDummy.next
    two.next = NULL
    return zeroDummy.next
```

---

### 8. Merge Two Sorted Linked Lists

**Brute Force:**  
- Copy all nodes to array, sort, rebuild list.

**Optimal:**  
- Merge nodes one by one (iterative/recursive).

**Pseudocode:**
```
mergeTwoLists(list1, list2):
    dummy = new Node()
    tail = dummy
    while list1 != NULL and list2 != NULL:
        if list1.val < list2.val:
            tail.next = list1
            list1 = list1.next
        else:
            tail.next = list2
            list2 = list2.next
        tail = tail.next
    if list1 != NULL: tail.next = list1
    if list2 != NULL: tail.next = list2
    return dummy.next
```

---

### 9. Copy List with Random Pointer

**Brute Force:**  
- Use hash map to store original→copy mapping, set next/random pointers.

**Optimal:**  
- Interleave copy nodes, set random pointers, split lists.

**Pseudocode:**
```
copyRandomList(head):
    if head == NULL: return NULL
    # Step 1: Clone nodes and insert after original
    temp = head
    while temp != NULL:
        copy = new Node(temp.val)
        copy.next = temp.next
        temp.next = copy
        temp = copy.next
    # Step 2: Set random pointers
    temp = head
    while temp != NULL:
        if temp.random != NULL:
            temp.next.random = temp.random.next
        temp = temp.next.next
    # Step 3: Separate lists
    temp = head
    newHead = head.next
    copy = newHead
    while temp != NULL:
        temp.next = temp.next.next
        if copy.next != NULL:
            copy.next = copy.next.next
        temp = temp.next
        copy = copy.next
    return newHead
```

---

### 10. Check if Linked List is Palindrome

**Brute Force:**  
- Store values in stack, compare with original list.

**Optimal:**  
- Reverse second half, compare halves, restore list.

**Pseudocode:**
```
isPalindrome(head):
    if head == NULL or head.next == NULL: return true
    # Find middle
    slow, fast = head, head
    while fast.next != NULL and fast.next.next != NULL:
        slow = slow.next
        fast = fast.next.next
    # Reverse second half
    secondHalf = reverse(slow.next)
    firstHalf = head
    temp = secondHalf
    while temp != NULL:
        if firstHalf.val != temp.val: return false
        firstHalf = firstHalf.next
        temp = temp.next
    # Restore
    slow.next = reverse(secondHalf)
    return true
```

---

### 11. Remove Nth Node from End

**Brute Force:**  
- Count nodes, remove `(length-n+1)`th node.

**Optimal:**  
- Use two pointers with gap n, remove node.

**Pseudocode:**
```
removeNthFromEnd(head, n):
    dummy = new Node()
    dummy.next = head
    fast = dummy
    slow = dummy
    for i in range(n): fast = fast.next
    while fast.next != NULL:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next
```

---

### 12. Delete Middle Node

**Brute Force:**  
- Count nodes, delete middle.

**Optimal:**  
- Use slow/fast pointers, delete middle.

**Pseudocode:**
```
deleteMiddle(head):
    if head == NULL or head.next == NULL: return NULL
    slow = head
    fast = head
    prev = NULL
    while fast != NULL and fast.next != NULL:
        prev = slow
        slow = slow.next
        fast = fast.next.next
    prev.next = slow.next
    return head
```

---

### 13. Sort Linked List

**Brute Force:**  
- Copy to array, sort, reassign.

**Optimal:**  
- Merge sort on linked list.

**Pseudocode:**
```
sortList(head):
    if head == NULL or head.next == NULL: return head
    slow = head
    fast = head.next
    while fast != NULL and fast.next != NULL:
        slow = slow.next
        fast = fast.next.next
    mid = slow.next
    slow.next = NULL
    left = sortList(head)
    right = sortList(mid)
    return merge(left, right)
```

---

### 14. Find Intersection Point of Y-shaped LL

**Brute Force:**  
- Compare each node in list A to all nodes in list B.

**Optimal:**  
- Align lengths, move together to find intersection.

**Pseudocode:**
```
getIntersectionNode(headA, headB):
    lenA = getLength(headA)
    lenB = getLength(headB)
    while lenA > lenB: headA = headA.next; lenA -= 1
    while lenB > lenA: headB = headB.next; lenB -= 1
    while headA != NULL and headB != NULL:
        if headA == headB: return headA
        headA = headA.next
        headB = headB.next
    return NULL
```

---

### 15. Add 1 to Number Represented by LL

**Brute Force:**  
- Convert to integer, add 1, rebuild list.

**Optimal:**  
- Reverse, add 1, reverse back.

**Pseudocode:**
```
addOne(head):
    head = reverse(head)
    temp = head
    carry = 1
    while temp != NULL and carry:
        sum = temp.val + carry
        temp.val = sum % 10
        carry = sum // 10
        if temp.next == NULL and carry:
            temp.next = Node(carry)
            carry = 0
        temp = temp.next
    return reverse(head)
```

---

### 16. Add Two Numbers Represented by LL

**Brute Force:**  
- Convert both to integers, add, rebuild list.

**Optimal:**  
- Traverse both, add digits, manage carry.

**Pseudocode:**
```
addTwoNumbers(l1, l2):
    dummy = Node(0)
    temp = dummy
    carry = 0
    while l1 != NULL or l2 != NULL or carry:
        sum = carry
        if l1 != NULL: sum += l1.val; l1 = l1.next
        if l2 != NULL: sum += l2.val; l2 = l2.next
        carry = sum // 10
        temp.next = Node(sum % 10)
        temp = temp.next
    return dummy.next
```

---

lavanyamahalle: i will ask u codin gmcs will u give me answers

GitHub Copilot: Yes, I can help you with coding questions and provide answers. Please share your coding questions or problems, and I'll assist you.

lavanyamahalle: can i give me summary of all ques in this

GitHub Copilot: Here’s a concise summary of all the linked list questions and solutions covered in your notes:

---

### 1. **Basic Linked List Operations**
- **Push Front/Back, Pop Front/Back, Insert/Delete at Position, Search, Print**
- **Complexity:** Most are O(1) or O(n) depending on operation.

---

### 2. **Reverse Linked List**
- **Recursive and Iterative approaches**
- Reverse pointers one by one.
- **Complexity:** O(n) time, O(1) space.

---

### 3. **Find Middle of Linked List**
- **Two-pass:** Count nodes, then go to middle.
- **Optimal:** Use slow and fast pointers (Tortoise and Hare).
- **Complexity:** O(n) time, O(1) space.

---

### 4. **Detect Cycle in Linked List**
- **Brute Force:** Use a hash set to track visited nodes.
- **Optimal:** Floyd’s Cycle Detection (Tortoise and Hare).
- **Complexity:** O(n) time, O(1) space.

---

### 5. **Length of Loop in Linked List**
- After detecting cycle, count nodes in the loop.
- **Complexity:** O(n) time, O(1) space.

---

### 6. **Odd-Even Linked List**
- Rearrange nodes so all odd-indexed nodes come before even-indexed.
- Use two pointers for odd/even chains.
- **Complexity:** O(n) time, O(1) space.

---

### 7. **Sort Linked List of 0s, 1s, 2s**
- **Brute Force:** Count and overwrite values.
- **Optimal:** Create three dummy lists for 0s, 1s, 2s and merge.
- **Complexity:** O(n) time, O(1) space.

---

### 8. **Merge Two Sorted Linked Lists**
- **Iterative and Recursive solutions**
- Merge nodes in sorted order.
- **Complexity:** O(n) time, O(1) space.

---

### 9. **Copy List with Random Pointer**
- **Brute Force:** Use hash map to store original→copy mapping.
- **Optimal:** Interleave copy nodes, set random pointers, then split.
- **Complexity:** O(n) time, O(1) space (optimal).

---

If you want a summary for a specific question or code, let me know!

lavanyamahalle: give me the sumarry of all que

GitHub Copilot: Here’s a summary of all the major linked list questions and their approaches from your notes:

---

### 1. **Basic Linked List Operations**
- Push/Pop Front & Back, Insert/Delete at Position, Search, Print.
- **Time Complexity:** O(1) for front ops, O(n) for back/position ops.

---

### 2. **Reverse Linked List**
- **Recursive & Iterative:** Reverse pointers.
- **Time:** O(n), **Space:** O(1).

---

### 3. **Find Middle of Linked List**
- **Two-pass:** Count nodes, go to middle.
- **Optimal:** Slow/Fast pointers (Tortoise-Hare).
- **Time:** O(n), **Space:** O(1).

---

### 4. **Detect Cycle in Linked List**
- **Brute Force:** Hash set for visited nodes.
- **Optimal:** Floyd’s Cycle Detection (Tortoise-Hare).
- **Time:** O(n), **Space:** O(1).

---

### 5. **Length of Loop in Linked List**
- Use Floyd’s algorithm, count nodes in loop.
- **Time:** O(n), **Space:** O(1).

---

### 6. **Odd-Even Linked List**
- Rearrange nodes: odd-indexed first, then even-indexed.
- **Time:** O(n), **Space:** O(1).

---

### 7. **Sort Linked List of 0s, 1s, 2s**
- **Brute Force:** Count and overwrite values.
- **Optimal:** Dummy lists for 0s, 1s, 2s, then merge.
- **Time:** O(n), **Space:** O(1).

---

### 8. **Merge Two Sorted Linked Lists**
- **Iterative/Recursive:** Merge nodes in sorted order.
- **Time:** O(n), **Space:** O(1).

---

### 9. **Copy List with Random Pointer**
- **Brute Force:** Hash map for original→copy mapping.
- **Optimal:** Interleave copy nodes, set random pointers, split.
- **Time:** O(n), **Space:** O(1) (optimal).

---

### 10. **Check if Linked List is Palindrome**
- **Brute Force:** Stack to compare values.
- **Optimal:** Reverse second half, compare, restore.
- **Time:** O(n), **Space:** O(1) (optimal).

---

### 11. **Remove Nth Node from End**
- **Brute Force:** Count nodes, remove (length-n+1)th.
- **Optimal:** Two pointers with gap n.
- **Time:** O(n), **Space:** O(1).

---

### 12. **Delete Middle Node**
- **Brute Force:** Count nodes, delete middle.
- **Optimal:** Slow/Fast pointers, delete middle.
- **Time:** O(n), **Space:** O(1).

---

### 13. **Sort Linked List**
- **Optimal:** Merge Sort for O(n log n).
- **Time:** O(n log n), **Space:** O(1).

---

### 14. **Find Intersection Point of Y-shaped LL**
- **Optimal:** Align lengths, move together to find intersection.
- **Time:** O(n), **Space:** O(1).

---

### 15. **Add 1 to Number Represented by LL**
- Reverse, add 1, reverse back.
- **Time:** O(n), **Space:** O(1).

---

### 16. **Add Two Numbers Represented by LL**
- Traverse both, add digits, manage carry.
- **Time:** O(n), **Space:** O(1).

---

If you want details or code for any specific question, let me know!

lavanyamahalle: write ques together with similar pattern

GitHub Copilot: Here’s a summary of all linked list questions from your notes, written in a similar pattern for easy revision:

---

### 1. **Basic Linked List Operations**
- **Push/Pop Front & Back, Insert/Delete at Position, Search, Print**
- *Time Complexity:* O(1) for front ops, O(n) for back/position ops

---

### 2. **Reverse Linked List**
- **Reverse pointers (Recursive/Iterative)**
- *Time:* O(n), *Space:* O(1)

---

### 3. **Find Middle of Linked List**
- **Find middle using two-pass or slow/fast pointers**
- *Time:* O(n), *Space:* O(1)

---

### 4. **Detect Cycle in Linked List**
- **Detect cycle using hash set or Floyd’s Tortoise-Hare**
- *Time:* O(n), *Space:* O(1)

---

### 5. **Length of Loop in Linked List**
- **Count nodes in loop after cycle detection**
- *Time:* O(n), *Space:* O(1)

---

### 6. **Odd-Even Linked List**
- **Rearrange nodes: odd-indexed first, then even-indexed**
- *Time:* O(n), *Space:* O(1)

---

### 7. **Sort Linked List of 0s, 1s, 2s**
- **Sort using count & overwrite or dummy lists**
- *Time:* O(n), *Space:* O(1)

---

### 8. **Merge Two Sorted Linked Lists**
- **Merge nodes in sorted order (Iterative/Recursive)**
- *Time:* O(n), *Space:* O(1)

---

### 9. **Copy List with Random Pointer**
- **Deep copy using hash map or interleaving nodes**
- *Time:* O(n), *Space:* O(1) (optimal)

---

### 10. **Check if Linked List is Palindrome**
- **Check palindrome using stack or reverse second half**
- *Time:* O(n), *Space:* O(1) (optimal)

---

### 11. **Remove Nth Node from End**
- **Remove nth node using count or two pointers**
- *Time:* O(n), *Space:* O(1)

---

### 12. **Delete Middle Node**
- **Delete middle node using count or slow/fast pointers**
- *Time:* O(n), *Space:* O(1)

---

### 13. **Sort Linked List**
- **Sort using merge sort**
- *Time:* O(n log n), *Space:* O(1)

---

### 14. **Find Intersection Point of Y-shaped LL**
- **Find intersection by aligning lengths**
- *Time:* O(n), *Space:* O(1)

---

### 15. **Add 1 to Number Represented by LL**
- **Reverse, add 1, reverse back**
- *Time:* O(n), *Space:* O(1)

---

### 16. **Add Two Numbers Represented by LL**
- **Traverse both, add digits, manage carry**
- *Time:* O(n), *Space:* O(1)

---

Let me know if you want code or explanation for any question!

lavanyamahalle: give me brute f and optimal approaches for all these que in detail as same like in this file

GitHub Copilot: Here’s a detailed summary of **brute force and optimal approaches** for all major linked list questions, following the same style as your notes:

---

### 1. **Reverse Linked List**

**Brute Force:**  
- Copy values to array, reverse array, reassign to nodes.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Reverse pointers in-place (iterative or recursive).  
- **Time:** O(n), **Space:** O(1)

---

### 2. **Find Middle of Linked List**

**Brute Force:**  
- Count nodes, go to middle (`count/2`th node).  
- **Time:** O(n), **Space:** O(1)

**Optimal:**  
- Use slow and fast pointers (Tortoise-Hare).  
- **Time:** O(n), **Space:** O(1)

---

### 3. **Detect Cycle in Linked List**

**Brute Force:**  
- Use hash set to store visited nodes, check for repeats.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Floyd’s Cycle Detection (slow/fast pointers).  
- **Time:** O(n), **Space:** O(1)

---

### 4. **Length of Loop in Linked List**

**Brute Force:**  
- Use map to store node positions, detect revisit, calculate loop length.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- After cycle detected (Floyd’s), count nodes in loop by moving pointer until it meets again.  
- **Time:** O(n), **Space:** O(1)

---

### 5. **Odd-Even Linked List**

**Brute Force:**  
- Copy odd and even nodes to separate arrays, rebuild list.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Use two pointers to build odd and even chains, connect at end.  
- **Time:** O(n), **Space:** O(1)

---

### 6. **Sort Linked List of 0s, 1s, 2s**

**Brute Force:**  
- Count 0s, 1s, 2s, overwrite node values.  
- **Time:** O(n), **Space:** O(1)

**Optimal:**  
- Create three dummy lists for 0s, 1s, 2s, merge them.  
- **Time:** O(n), **Space:** O(1)

---

### 7. **Merge Two Sorted Linked Lists**

**Brute Force:**  
- Copy all nodes to array, sort, rebuild list.  
- **Time:** O(n log n), **Space:** O(n)

**Optimal:**  
- Merge nodes one by one (iterative or recursive).  
- **Time:** O(n), **Space:** O(1)

---

### 8. **Copy List with Random Pointer**

**Brute Force:**  
- Use hash map to store original→copy mapping, set next/random pointers.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Interleave copy nodes, set random pointers, split lists.  
- **Time:** O(n), **Space:** O(1)

---

### 9. **Check if Linked List is Palindrome**

**Brute Force:**  
- Store values in stack, compare with original list.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Reverse second half, compare halves, restore list.  
- **Time:** O(n), **Space:** O(1)

---

### 10. **Remove Nth Node from End**

**Brute Force:**  
- Count nodes, remove `(length-n+1)`th node.  
- **Time:** O(n), **Space:** O(1)

**Optimal:**  
- Use two pointers with gap n, remove node.  
- **Time:** O(n), **Space:** O(1)

---

### 11. **Delete Middle Node**

**Brute Force:**  
- Count nodes, delete middle.  
- **Time:** O(n), **Space:** O(1)

**Optimal:**  
- Use slow/fast pointers, delete middle.  
- **Time:** O(n), **Space:** O(1)

---

### 12. **Sort Linked List**

**Brute Force:**  
- Copy to array, sort, reassign.  
- **Time:** O(n log n), **Space:** O(n)

**Optimal:**  
- Merge sort on linked list.  
- **Time:** O(n log n), **Space:** O(1)

---

### 13. **Find Intersection Point of Y-shaped LL**

**Brute Force:**  
- Compare each node in list A to all nodes in list B.  
- **Time:** O(n²), **Space:** O(1)

**Optimal:**  
- Align lengths, move together to find intersection.  
- **Time:** O(n), **Space:** O(1)

---

### 14. **Add 1 to Number Represented by LL**

**Brute Force:**  
- Convert to integer, add 1, rebuild list.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Reverse, add 1, reverse back.  
- **Time:** O(n), **Space:** O(1)

---

### 15. **Add Two Numbers Represented by LL**

**Brute Force:**  
- Convert both to integers, add, rebuild list.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Traverse both, add digits, manage carry.  
- **Time:** O(n), **Space:** O(1)

---

Let me know if you want code snippets for any specific approach!

lavanyamahalle: give me brute f and optimal approaches for all these que in detail as same like in this file

GitHub Copilot: Here are the brute force and optimal approaches for all major linked list questions, written in the same detailed style as your file:

---

### 1. Reverse Linked List

**Brute Force:**  
- Copy all node values to an array, reverse the array, reassign values to nodes.  
- **Time:** O(n), **Space:** O(n)

**Optimal (In-place):**  
- Reverse pointers using iterative or recursive method.  
- **Time:** O(n), **Space:** O(1)

---

### 2. Find Middle of Linked List

**Brute Force:**  
- Count total nodes, then go to the middle (`count/2`th node).  
- **Time:** O(n), **Space:** O(1)

**Optimal:**  
- Use slow and fast pointers (Tortoise-Hare).  
- **Time:** O(n), **Space:** O(1)

---

### 3. Detect Cycle in Linked List

**Brute Force:**  
- Use a hash set to store visited nodes, return true if a node is revisited.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Floyd’s Cycle Detection (slow/fast pointers).  
- **Time:** O(n), **Space:** O(1)

---

### 4. Length of Loop in Linked List

**Brute Force:**  
- Use a map to store node positions, detect revisit, calculate loop length.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- After cycle detected (Floyd’s), count nodes in loop by moving pointer until it meets again.  
- **Time:** O(n), **Space:** O(1)

---

### 5. Odd-Even Linked List

**Brute Force:**  
- Copy odd and even nodes to separate arrays, rebuild list.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Use two pointers to build odd and even chains, connect at end.  
- **Time:** O(n), **Space:** O(1)

---

### 6. Sort Linked List of 0s, 1s, 2s

**Brute Force:**  
- Count 0s, 1s, 2s, overwrite node values.  
- **Time:** O(n), **Space:** O(1)

**Optimal:**  
- Create three dummy lists for 0s, 1s, 2s, merge them.  
- **Time:** O(n), **Space:** O(1)

---

### 7. Merge Two Sorted Linked Lists

**Brute Force:**  
- Copy all nodes to array, sort, rebuild list.  
- **Time:** O(n log n), **Space:** O(n)

**Optimal:**  
- Merge nodes one by one (iterative or recursive).  
- **Time:** O(n), **Space:** O(1)

---

### 8. Copy List with Random Pointer

**Brute Force:**  
- Use hash map to store original→copy mapping, set next/random pointers.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Interleave copy nodes, set random pointers, split lists.  
- **Time:** O(n), **Space:** O(1)

---

### 9. Check if Linked List is Palindrome

**Brute Force:**  
- Store values in stack, compare with original list.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Reverse second half, compare halves, restore list.  
- **Time:** O(n), **Space:** O(1)

---

### 10. Remove Nth Node from End

**Brute Force:**  
- Count nodes, remove `(length-n+1)`th node.  
- **Time:** O(n), **Space:** O(1)

**Optimal:**  
- Use two pointers with gap n, remove node.  
- **Time:** O(n), **Space:** O(1)

---

### 11. Delete Middle Node

**Brute Force:**  
- Count nodes, delete middle.  
- **Time:** O(n), **Space:** O(1)

**Optimal:**  
- Use slow/fast pointers, delete middle.  
- **Time:** O(n), **Space:** O(1)

---

### 12. Sort Linked List

**Brute Force:**  
- Copy to array, sort, reassign.  
- **Time:** O(n log n), **Space:** O(n)

**Optimal:**  
- Merge sort on linked list.  
- **Time:** O(n log n), **Space:** O(1)

---

### 13. Find Intersection Point of Y-shaped LL

**Brute Force:**  
- Compare each node in list A to all nodes in list B.  
- **Time:** O(n²), **Space:** O(1)

**Optimal:**  
- Align lengths, move together to find intersection.  
- **Time:** O(n), **Space:** O(1)

---

### 14. Add 1 to Number Represented by LL

**Brute Force:**  
- Convert to integer, add 1, rebuild list.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Reverse, add 1, reverse back.  
- **Time:** O(n), **Space:** O(1)

---

### 15. Add Two Numbers Represented by LL

**Brute Force:**  
- Convert both to integers, add, rebuild list.  
- **Time:** O(n), **Space:** O(n)

**Optimal:**  
- Traverse both, add digits, manage carry.  
- **Time:** O(n), **Space:** O(1)

---

If you want code snippets for any specific approach, let me know!

lavanyamahalle: i want detailed explanation of approach and qseudo code 

GitHub Copilot: Here’s a detailed explanation of the approach and pseudocode for each major linked list question, following the style in your file:

---

### 1. Reverse Linked List

**Brute Force Approach:**  
- Copy all node values to an array, reverse the array, reassign values to nodes.  
- Not recommended for interviews (modifies values, uses extra space).

**Optimal Approach (In-place):**  
- Reverse the pointers of the nodes so that the list is reversed.

**Steps:**
1. Initialize `prev = NULL`, `curr = head`.
2. While `curr` is not NULL:
   - Store `next = curr->next`.
   - Set `curr->next = prev`.
   - Move `prev = curr`, `curr = next`.
3. Return `prev` as new head.

**Pseudocode:**
```
function reverseList(head):
    prev = NULL
    curr = head
    while curr != NULL:
        next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    return prev
```

---

### 2. Find Middle of Linked List

**Brute Force Approach:**  
- Count total nodes, then go to the middle (`count/2`th node).

**Optimal Approach (Tortoise-Hare):**  
- Use two pointers: slow moves 1 step, fast moves 2 steps.

**Steps:**
1. Initialize `slow = head`, `fast = head`.
2. While `fast` and `fast.next` are not NULL:
   - Move `slow = slow.next`.
   - Move `fast = fast.next.next`.
3. When loop ends, `slow` is at the middle.

**Pseudocode:**
```
function middleNode(head):
    slow = head
    fast = head
    while fast != NULL and fast.next != NULL:
        slow = slow.next
        fast = fast.next.next
    return slow
```

---

### 3. Detect Cycle in Linked List

**Brute Force Approach:**  
- Use a hash set to store visited nodes, return true if a node is revisited.

**Optimal Approach (Floyd’s Cycle Detection):**  
- Use slow and fast pointers.

**Steps:**
1. Initialize `slow = head`, `fast = head`.
2. While `fast` and `fast.next` are not NULL:
   - Move `slow = slow.next`.
   - Move `fast = fast.next.next`.
   - If `slow == fast`, cycle exists.
3. If loop ends, no cycle.

**Pseudocode:**
```
function hasCycle(head):
    slow = head
    fast = head
    while fast != NULL and fast.next != NULL:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return true
    return false
```

---

### 4. Length of Loop in Linked List

**Brute Force Approach:**  
- Use a map to store node positions, detect revisit, calculate loop length.

**Optimal Approach:**  
- After cycle detected, count nodes in loop.

**Steps:**
1. Detect cycle using Floyd’s algorithm.
2. When `slow == fast`, start counting:
   - Initialize `count = 1`, `temp = slow.next`.
   - While `temp != slow`:
     - `count++`, `temp = temp.next`.
3. Return `count`.

**Pseudocode:**
```
function countNodesinLoop(head):
    slow = head
    fast = head
    while fast != NULL and fast.next != NULL:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            count = 1
            temp = slow.next
            while temp != slow:
                count += 1
                temp = temp.next
            return count
    return 0
```

---

### 5. Odd-Even Linked List

**Brute Force Approach:**  
- Copy odd and even nodes to separate arrays, rebuild list.

**Optimal Approach:**  
- Use two pointers to build odd and even chains, connect at end.

**Steps:**
1. If list is empty or has one node, return head.
2. Initialize `odd = head`, `even = head.next`, `evenHead = even`.
3. While `even` and `even.next`:
   - `odd.next = even.next`, `odd = odd.next`
   - `even.next = odd.next`, `even = even.next`
4. Connect `odd.next = evenHead`.
5. Return head.

**Pseudocode:**
```
function oddEvenList(head):
    if head == NULL or head.next == NULL:
        return head
    odd = head
    even = head.next
    evenHead = even
    while even != NULL and even.next != NULL:
        odd.next = even.next
        odd = odd.next
        even.next = odd.next
        even = even.next
    odd.next = evenHead
    return head
```

---

### 6. Sort Linked List of 0s, 1s, 2s

**Brute Force Approach:**  
- Count 0s, 1s, 2s, overwrite node values.

**Optimal Approach:**  
- Create three dummy lists for 0s, 1s, 2s, merge them.

**Steps:**
1. Create dummy heads for 0, 1, 2.
2. Traverse original list, attach nodes to respective lists.
3. Merge the three lists.
4. Return the new head.

**Pseudocode:**
```
function sortList(head):
    zeroDummy, oneDummy, twoDummy = new Node(), new Node(), new Node()
    zero, one, two = zeroDummy, oneDummy, twoDummy
    curr = head
    while curr != NULL:
        if curr.val == 0:
            zero.next = curr
            zero = zero.next
        else if curr.val == 1:
            one.next = curr
            one = one.next
        else:
            two.next = curr
            two = two.next
        curr = curr.next
    zero.next = oneDummy.next if oneDummy.next else twoDummy.next
    one.next = twoDummy.next
    two.next = NULL
    return zeroDummy.next
```

---

### 7. Merge Two Sorted Linked Lists

**Brute Force Approach:**  
- Copy all nodes to array, sort, rebuild list.

**Optimal Approach:**  
- Merge nodes one by one (iterative or recursive).

**Steps:**
1. Create dummy node.
2. While both lists are not empty:
   - Attach smaller node to tail.
   - Move pointer in that list.
3. Attach remaining nodes.
4. Return dummy.next.

**Pseudocode:**
```
function mergeTwoLists(list1, list2):
    dummy = new Node()
    tail = dummy
    while list1 != NULL and list2 != NULL:
        if list1.val < list2.val:
            tail.next = list1
            list1 = list1.next
        else:
            tail.next = list2
            list2 = list2.next
        tail = tail.next
    if list1 != NULL:
        tail.next = list1
    if list2 != NULL:
        tail.next = list2
    return dummy.next
```

---

### 8. Copy List with Random Pointer

**Brute Force Approach:**  
- Use hash map to store original→copy mapping, set next/random pointers.

**Optimal Approach:**  
- Interleave copy nodes, set random pointers, split lists.

**Steps:**
1. Clone nodes and insert after original.
2. Set random pointers for copy nodes.
3. Separate the original and copied list.

**Pseudocode:**
```
function copyRandomList(head):
    if head == NULL:
        return NULL
    # Step 1: Clone nodes and insert after original
    temp = head
    while temp != NULL:
        copy = new Node(temp.val)
        copy.next = temp.next
        temp.next = copy
        temp = copy.next
    # Step 2: Set random pointers
    temp = head
    while temp != NULL:
        if temp.random != NULL:
            temp.next.random = temp.random.next
        temp = temp.next.next
    # Step 3: Separate lists
    temp = head
    newHead = head.next
    copy = newHead
    while temp != NULL:
        temp.next = temp.next.next
        if copy.next != NULL:
            copy.next = copy.next.next
        temp = temp.next
        copy = copy.next
    return newHead
```

---

### 9. Check if Linked List is Palindrome

**Brute Force Approach:**  
- Store values in stack, compare with original list.

**Optimal Approach:**  
- Reverse second half, compare halves, restore list.

**Steps:**
1. Find middle using slow/fast pointers.
2. Reverse second half.
3. Compare first half and second half.
4. Restore second half.

**Pseudocode:**
```
function isPalindrome(head):
    if head == NULL or head.next == NULL:
        return true
    # Find middle
    slow, fast = head, head
    while fast.next != NULL and fast.next.next != NULL:
        slow = slow.next
        fast = fast.next.next
    # Reverse second half
    secondHalf = reverse(slow.next)
    firstHalf = head
    temp = secondHalf
    while temp != NULL:
        if firstHalf.val != temp.val:
            return false
        firstHalf = firstHalf.next
        temp = temp.next
    # Restore
    slow.next = reverse(secondHalf)
    return true
```

---

If you want detailed explanation and pseudocode for any other specific question, let me know!

lavanyamahalle: all 16 ques

GitHub Copilot: Here are detailed explanations and pseudocode for all 16 classic linked list questions, following your notes’ style:

---

### 1. Push/Pop Front & Back, Insert/Delete at Position, Search, Print

**Approach:**  
- Use pointer manipulation for each operation.
- For push/pop front: update head.
- For push/pop back: traverse to end.
- For insert/delete at position: traverse to position, update links.
- For search: traverse and compare values.
- For print: traverse and print values.

**Pseudocode:**
```
pushFront(data):
    newNode = Node(data)
    newNode.next = head
    head = newNode

pushBack(data):
    newNode = Node(data)
    if head == NULL: head = newNode
    else: traverse to end, last.next = newNode

popFront():
    if head == NULL: return
    temp = head
    head = head.next
    delete temp

popBack():
    if head == NULL: return
    if head.next == NULL: delete head; head = NULL
    else: traverse to second last, delete last

insertAtPosition(data, pos):
    if pos == 0: pushFront(data)
    else: traverse to pos-1, insert newNode

deleteAtPosition(pos):
    if pos == 0: popFront()
    else: traverse to pos-1, delete node at pos

search(key):
    traverse, if node.data == key: return true
    return false

print():
    traverse, print node.data
```

---

### 2. Reverse Linked List

**Brute Force:**  
- Copy values to array, reverse array, reassign to nodes.

**Optimal:**  
- Reverse pointers in-place.

**Pseudocode:**
```
reverseList(head):
    prev = NULL
    curr = head
    while curr != NULL:
        next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    return prev
```

---

### 3. Find Middle of Linked List

**Brute Force:**  
- Count nodes, go to middle.

**Optimal:**  
- Use slow/fast pointers.

**Pseudocode:**
```
middleNode(head):
    slow = head
    fast = head
    while fast != NULL and fast.next != NULL:
        slow = slow.next
        fast = fast.next.next
    return slow
```

---

### 4. Detect Cycle in Linked List

**Brute Force:**  
- Use hash set to store visited nodes.

**Optimal:**  
- Floyd’s Cycle Detection (slow/fast pointers).

**Pseudocode:**
```
hasCycle(head):
    slow = head
    fast = head
    while fast != NULL and fast.next != NULL:
        slow = slow.next
        fast = fast.next.next
        if slow == fast: return true
    return false
```

---

### 5. Length of Loop in Linked List

**Brute Force:**  
- Use map to store node positions, detect revisit.

**Optimal:**  
- After cycle detected, count nodes in loop.

**Pseudocode:**
```
countNodesinLoop(head):
    slow = head
    fast = head
    while fast != NULL and fast.next != NULL:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            count = 1
            temp = slow.next
            while temp != slow:
                count += 1
                temp = temp.next
            return count
    return 0
```

---

### 6. Odd-Even Linked List

**Brute Force:**  
- Copy odd/even nodes to arrays, rebuild list.

**Optimal:**  
- Use two pointers to build odd/even chains, connect at end.

**Pseudocode:**
```
oddEvenList(head):
    if head == NULL or head.next == NULL: return head
    odd = head
    even = head.next
    evenHead = even
    while even != NULL and even.next != NULL:
        odd.next = even.next
        odd = odd.next
        even.next = odd.next
        even = even.next
    odd.next = evenHead
    return head
```

---

### 7. Sort Linked List of 0s, 1s, 2s

**Brute Force:**  
- Count 0s, 1s, 2s, overwrite node values.

**Optimal:**  
- Create three dummy lists for 0s, 1s, 2s, merge.

**Pseudocode:**
```
sortList(head):
    zeroDummy, oneDummy, twoDummy = new Node(), new Node(), new Node()
    zero, one, two = zeroDummy, oneDummy, twoDummy
    curr = head
    while curr != NULL:
        if curr.val == 0: zero.next = curr; zero = zero.next
        elif curr.val == 1: one.next = curr; one = one.next
        else: two.next = curr; two = two.next
        curr = curr.next
    zero.next = oneDummy.next if oneDummy.next else twoDummy.next
    one.next = twoDummy.next
    two.next = NULL
    return zeroDummy.next
```

---

### 8. Merge Two Sorted Linked Lists

**Brute Force:**  
- Copy all nodes to array, sort, rebuild list.

**Optimal:**  
- Merge nodes one by one (iterative/recursive).

**Pseudocode:**
```
mergeTwoLists(list1, list2):
    dummy = new Node()
    tail = dummy
    while list1 != NULL and list2 != NULL:
        if list1.val < list2.val:
            tail.next = list1
            list1 = list1.next
        else:
            tail.next = list2
            list2 = list2.next
        tail = tail.next
    if list1 != NULL: tail.next = list1
    if list2 != NULL: tail.next = list2
    return dummy.next
```

---

### 9. Copy List with Random Pointer

**Brute Force:**  
- Use hash map to store original→copy mapping, set next/random pointers.

**Optimal:**  
- Interleave copy nodes, set random pointers, split lists.

**Pseudocode:**
```
copyRandomList(head):
    if head == NULL: return NULL
    # Step 1: Clone nodes and insert after original
    temp = head
    while temp != NULL:
        copy = new Node(temp.val)
        copy.next = temp.next
        temp.next = copy
        temp = copy.next
    # Step 2: Set random pointers
    temp = head
    while temp != NULL:
        if temp.random != NULL:
            temp.next.random = temp.random.next
        temp = temp.next.next
    # Step 3: Separate lists
    temp = head
    newHead = head.next
    copy = newHead
    while temp != NULL:
        temp.next = temp.next.next
        if copy.next != NULL:
            copy.next = copy.next.next
        temp = temp.next
        copy = copy.next
    return newHead
```

---

### 10. Check if Linked List is Palindrome

**Brute Force:**  
- Store values in stack, compare with original list.

**Optimal:**  
- Reverse second half, compare halves, restore list.

**Pseudocode:**
```
isPalindrome(head):
    if head == NULL or head.next == NULL: return true
    # Find middle
    slow, fast = head, head
    while fast.next != NULL and fast.next.next != NULL:
        slow = slow.next
        fast = fast.next.next
    # Reverse second half
    secondHalf = reverse(slow.next)
    firstHalf = head
    temp = secondHalf
    while temp != NULL:
        if firstHalf.val != temp.val: return false
        firstHalf = firstHalf.next
        temp = temp.next
    # Restore
    slow.next = reverse(secondHalf)
    return true
```

---

### 11. Remove Nth Node from End

**Brute Force:**  
- Count nodes, remove `(length-n+1)`th node.

**Optimal:**  
- Use two pointers with gap n, remove node.

**Pseudocode:**
```
removeNthFromEnd(head, n):
    dummy = new Node()
    dummy.next = head
    fast = dummy
    slow = dummy
    for i in range(n): fast = fast.next
    while fast.next != NULL:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next
```

---

### 12. Delete Middle Node

**Brute Force:**  
- Count nodes, delete middle.

**Optimal:**  
- Use slow/fast pointers, delete middle.

**Pseudocode:**
```
deleteMiddle(head):
    if head == NULL or head.next == NULL: return NULL
    slow = head
    fast = head
    prev = NULL
    while fast != NULL and fast.next != NULL:
        prev = slow
        slow = slow.next
        fast = fast.next.next
    prev.next = slow.next
    return head
```

---

### 13. Sort Linked List

**Brute Force:**  
- Copy to array, sort, reassign.

**Optimal:**  
- Merge sort on linked list.

**Pseudocode:**
```
sortList(head):
    if head == NULL or head.next == NULL: return head
    slow = head
    fast = head.next
    while fast != NULL and fast.next != NULL:
        slow = slow.next
        fast = fast.next.next
    mid = slow.next
    slow.next = NULL
    left = sortList(head)
    right = sortList(mid)
    return merge(left, right)
```

---

### 14. Find Intersection Point of Y-shaped LL

**Brute Force:**  
- Compare each node in list A to all nodes in list B.

**Optimal:**  
- Align lengths, move together to find intersection.

**Pseudocode:**
```
getIntersectionNode(headA, headB):
    lenA = getLength(headA)
    lenB = getLength(headB)
    while lenA > lenB: headA = headA.next; lenA -= 1
    while lenB > lenA: headB = headB.next; lenB -= 1
    while headA != NULL and headB != NULL:
        if headA == headB: return headA
        headA = headA.next
        headB = headB.next
    return NULL
```

---

### 15. Add 1 to Number Represented by LL

**Brute Force:**  
- Convert to integer, add 1, rebuild list.

**Optimal:**  
- Reverse, add 1, reverse back.

**Pseudocode:**
```
addOne(head):
    head = reverse(head)
    temp = head
    carry = 1
    while temp != NULL and carry:
        sum = temp.val + carry
        temp.val = sum % 10
        carry = sum // 10
        if temp.next == NULL and carry:
            temp.next = Node(carry)
            carry = 0
        temp = temp.next
    return reverse(head)
```

---

### 16. Add Two Numbers Represented by LL

**Brute Force:**  
- Convert both to integers, add, rebuild list.

**Optimal:**  
- Traverse both, add digits, manage carry.

**Pseudocode:**
```
addTwoNumbers(l1, l2):
    dummy = Node(0)
    temp = dummy
    carry = 0
    while l1 != NULL or l2 != NULL or carry:
        sum = carry
        if l1 != NULL: sum += l1.val; l1 = l1.next
        if l2 != NULL: sum += l2.val; l2 = l2.next
        carry = sum // 10
        temp.next = Node(sum % 10)
        temp = temp.next
    return dummy.next
```

---
## How to Identify Patterns for Solving Linked List Problems Using Brute Force and Optimal Methods

Understanding the underlying patterns behind linked list questions is the key to efficiently selecting brute force and optimal solutions. Here’s how you can approach this systematically:

### 1. Recognizing Problem Types and Patterns

Linked list questions usually belong to certain categories, each with proven strategies:

| Pattern                      | Description                                                    | Common Problems                                      |
|------------------------------|----------------------------------------------------------------|------------------------------------------------------|
| Pointer Manipulation         | Adjust `next` pointers to insert, delete, reverse, rearrange   | Reverse list, Odd-Even list, Merge two lists         |
| Two-Pointer Technique        | Use slow/fast pointers to traverse at different speeds         | Cycle detection, Find middle, Remove Nth from end    |
| Counting or Array Storage    | Store node values/counts in arrays for value-based processes   | Palindrome, Sort 0s/1s/2s, Rebuilding from values    |
| Hashing/Extra Storage        | Use maps or sets for node tracking or value mapping            | Cycle detection (BF), Copy with random pointers      |
| Dummy Node                   | Use an extra node to simplify edge cases                      | Merge lists, Remove Nth node, Sorting by links       |
| Divide and Conquer           | Split and recursively process sublists (often Merge Sort)      | Sorting a linked list                                |
| List/Number Conversion       | Convert list to number (and back) for arithmetic operations    | Add 1 to list, Add Two Numbers                      |
| Length Alignment             | Align start points for simultaneous traversal of multiple lists| Y-shaped intersection problem                        |
| Interleaving Nodes           | Insert new nodes between originals for in-place solutions      | Copy with random pointer (optimal)                   |

### 2. Brute Force Approach: What To Look For

Brute force methods often rely on:

- **Auxiliary data structures**: Arrays, stacks, hash maps, or sets.
- **Multiple passes**: Traversing the list multiple times to collect and process data.
- **Direct value manipulation**: Extract node values for easier computation.
- **Trade-off**: Faster to code, but not efficient in memory or time for large datasets.

**Examples:**
- Storing values in an array to reverse, check palindrome, or sort.
- Tracking visited nodes using a hash set for cycle detection.
- Mapping nodes for deep copy problems with random pointers.

### 3. Optimal Approach: Recognizing Efficient Patterns

Optimal methods typically:

- Rely on **pointer adjustments** and **in-place modifications**.
- Use **two-pointer techniques** to minimize passes.
- Avoid extra space unless essential.
- Employ **divide-and-conquer** strategies directly on node structures (e.g., merge sort on lists).

**Examples:**
- Two-pointer (slow/fast) methods for finding middles and detecting cycles.
- In-place reversal of the list by manipulating `.next` pointers.
- Using dummy nodes to handle edge-case insertions and deletions elegantly.
- Interleaving node creation for “random pointer copy” in O(1) space.

### 4. Pattern-to-Problem Table

| Problem Type                     | Brute Force Approach              | Optimal Approach                         | Key Recognizable Pattern             |
|-----------------------------------|-----------------------------------|------------------------------------------|--------------------------------------|
| Reverse Linked List               | Array copy & rewrite              | In-place pointer reversal                | Pointer Manipulation                 |
| Find Middle of List               | Node count, index to mid          | Two-pointer slow/fast                    | Two-Pointer                          |
| Detect Cycle                      | Hash set of visited nodes         | Floyd’s slow/fast pointer                | Two-Pointer & Hashing                |
| Length of Loop                    | Map node visit indices            | Count nodes in detected cycle            | Two-Pointer                          |
| Odd-Even Linked List              | Separate and rebuild via arrays   | Rearrange pointers in-place              | Multi-pointer Rearrangement          |
| Sort 0s/1s/2s                     | Count & overwrite values          | Dummy zero/one/two lists, merge          | Counting or Dummy Node Partitioning  |
| Merge Two Sorted Lists            | Extract, sort & rebuild           | In-place merge                           | Dummy Node & Merging                 |
| Copy with Random Pointer          | Node/clone mapping via hashmap    | Interleave nodes for O(1) space copy     | Interleaving Nodes                   |
| Palindrome Check                  | Store stack, compare both passes  | Reverse second half, compare halves      | Array/Stack vs In-place Reversal     |
| Remove Nth Node from End          | Full count, direct deletion       | Two-pointer with n-step gap              | Two-Pointer                          |
| Delete Middle Node                | Count, delete at mid index        | Two-pointer (slow/fast), previous        | Two-Pointer                          |
| Sort Linked List                  | Copy to array, sort, rewrite      | Recursive merge sort in-place            | Divide and Conquer                   |
| Find Intersection Point (Y-LL)    | Compare all node pairs            | Equalize lengths, simultaneous advance   | Length Alignment                     |
| Add 1 to Number in List           | Convert to int, add, rebuild      | Reverse, add with carry, reverse again   | In-place Reversal & Addition         |
| Add Two Numbers in Lists          | Convert both to ints, add, rebuild| Traverse both, add/carry, new list       | Parallel Traverse with Carry         |

### 5. Strategy for Identifying Patterns

- **Read the Problem Statement Carefully:** Look for hints – do you need the middle, detect repetition, merge, rearrange, or check values?
- **Check for Constraints:** Time and space constraints often suggest whether brute force or optimal is desired.
- **Identify List Operations:** Reverse, merge, insert, delete, compare, or search?
- **Spot Keywords:** Words like "in-place", "O(1) space", "two pointers", or "rearrange nodes" direct you towards optimal patterns.
- **Look for Possible Reductions:** Can the problem be turned into a value or index problem (thus allowing for brute force) or does it inherently require pointer skills?
- **Map to Known Patterns:** Relate the problem to the standard types and remember the proven methods outlined above.

### 6. Quick Reference: Brute Force vs. Optimal

| Feature                | Brute Force                   | Optimal                                   |
|------------------------|-------------------------------|-------------------------------------------|
| Space                  | O(n) (extra) for arrays/maps  | Usually O(1)—works with pointers only     |
| Time                   | Usually ≥ O(n), sometimes O(n²)| O(n) or O(n log n)                        |
| Coding Simplicity      | Often simpler                 | More careful with edge cases              |
| Interview Preference   | OK for first try, not for top marks | Required for high credit           |
| When to Use            | Small datasets, prototyping   | Production, interview settings            |

### 7. Practice Makes Patterns Obvious

The more problems you solve and the more you review the solutions, the quicker you'll spot and apply these patterns. Begin with brute force to understand the structure—then aim for the optimal solution!

If you want worked-through examples or code templates for any class of problem, just ask.

[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/64901923/cacfdc9f-d154-4f0d-bffb-276d1678a8c7/linkedlist.md




## Key Indicators for Identifying Efficient Linked List Problem-Solving Patterns

Detecting the right pattern is crucial for solving linked list problems both quickly and optimally. Here are several *key indicators* that hint at specific strategies:

### 1. Need for Position-Based Navigation

- **Indicator:** “Find the middle”, “Nth node from end”, “delete middle”, “find intersection”.
- **Pattern:** **Two-Pointer Technique (Slow/Fast Pointers)**
  - Use slow and fast pointers to traverse at different speeds for single-pass solutions.
  - Typical problems: Find Middle Node, Cycle Detection, Remove Nth Node from End.

### 2. Value Grouping or Modification

- **Indicator:** “Sort 0s, 1s, 2s", “group odd/even nodes”, “check palindrome”, “reorder nodes”.
- **Pattern:** **Counting/Array Storage or Pointer Rearrangement**
  - Brute force via value extraction; optimal using pointer restructuring or auxiliary dummy nodes.
  - Typical problems: Sort Linked List of 0s, 1s, 2s; Odd-Even List; Check Palindrome.

### 3. Request for Cycle, Duplicate, or Loop Detection

- **Indicator:** “Detect cycle/loop”, “find length of loop”, “has duplicate/visited nodes”.
- **Pattern:** **Hashing/Set Storage (Brute Force) or Two-Pointer Cycle Detection (Optimal)**
  - Store node addresses in a set/map for O(n) detection, or use Floyd's Cycle Detection for O(1) space.
  - Typical problems: Detect Cycle, Find Loop Length.

### 4. Need to Insert/Delete Near Head, Handle Edge Cases

- **Indicator:** “Always insert/delete at head/tail”, “may need to change head”, “edge case handling”.
- **Pattern:** **Dummy Node Usage**
  - Simplifies list manipulations at the head without special cases.

### 5. Requirements for List Merging, Splitting, or Deep Copy

- **Indicator:** “Merge sorted lists”, “copy list with random pointers”, “combine/split lists”.
- **Pattern:** **Pointer Manipulation with Dummy Nodes/Interleaving**
  - Efficient merging/pasting by manipulating `next` and sometimes `random` pointers.
  - For deep copies, optimal solutions often interleave new nodes within the original[1].

### 6. In-Place Transformation or Structure Modification

- **Indicator:** “Reverse in-place”, “sort in-place”, “no extra space allowed”.
- **Pattern:** **Pointer Reversals, Divide and Conquer, In-Place Algorithms**
  - Modify pointers directly rather than copying data for O(1) space.
  - Example: Reverse Linked List, Merge Sort for Linked List.

### 7. Numeric Representation/Calculation

- **Indicator:** “Add numbers represented by lists”, “increment number”, “carry/overflow”.
- **Pattern:** **List Reversal or Parallel Traversal with Carry**
  - Reverse list to process low-order digits first, or traverse in parallel and handle carry propagation.

### 8. Symmetrical Matching or Comparison

- **Indicator:** “Check if palindrome”, “compare two halves”.
- **Pattern:** **Half Reversal and Comparison, Stack Usage (Brute Force)**
  - Compare first half with reversed second half or stack-based approach.

### Reference Table: Indicator to Pattern

| Problem Cue                      | Pattern                               | Example Problems                             |
|-----------------------------------|---------------------------------------|----------------------------------------------|
| Position, Nth, Middle             | Two-Pointer (Slow/Fast)               | Find Middle, Remove Nth Node from End        |
| Group/Rearrange by Value          | Counting/Pointer Structuring          | Sort 0s-1s-2s, Odd-Even LL                   |
| Detect Cycle/Duplicate            | Set/Map or Floyd’s Cycle Detection    | Detect Cycle, Loop Length                    |
| Merge/Copy/Split                  | Dummy Node/Interleaving/Pointer Ops   | Merge Lists, Copy Random Pointer LL          |
| In-Place Transformation           | Reverse, Sort, Divide and Conquer     | Reverse LL, Merge Sort LL                    |
| Numeric Calculation in LL         | Reverse & Traverse, Carry Handling    | Add 1, Add Two Numbers                       |
| Compare Halves/Symmetry           | Half-Reverse, Stack                   | Palindrome Check                             |

### General Tips

- *Keywords* like “in-place”, “O(1) space”, “single pass”, “restore the list” almost always signal pointer-based solutions.
- If the problem asks for checking unique nodes or revisits, try first with a set/map; for optimal, look for two-pointer or in-place cycle detection.
- For head or tail insert/delete that affect the top of the list, consider using a dummy node to minimize special-case handling.
- Sorting or merging should trigger thoughts about dummy nodes and pointer manipulation for linked lists, rather than value-based (array) methods.

**Spotting these cues in problem statements quickly guides you to the right solving pattern for linked list problems, ensuring efficiency and correctness.**

[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/64901923/cacfdc9f-d154-4f0d-bffb-276d1678a8c7/linkedlist.md





## Linked List Problem Patterns with Brute Force and Optimal C++ Code

Below, all classic linked list problems are grouped by *pattern*. Each includes both the brute force and optimal C++ solutions.

### 1. **Pointer Manipulation**

#### a. Reverse Linked List

**Brute Force:** (Copy values, reverse array, assign back)

```cpp
ListNode* reverseList(ListNode* head) {
    vector vals;
    for (ListNode* curr = head; curr; curr = curr->next) vals.push_back(curr->val);
    for (ListNode* curr = head; curr; curr = curr->next) {
        curr->val = vals.back();
        vals.pop_back();
    }
    return head;
}
```

**Optimal:** (Pointer reversal, iterative)

```cpp
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    while (head) {
        ListNode* nextNode = head->next;
        head->next = prev;
        prev = head;
        head = nextNode;
    }
    return prev;
}
```

### 2. **Two-Pointer Technique**

#### a. Find Middle of Linked List

**Brute Force:**

```cpp
ListNode* middleNode(ListNode* head) {
    int count = 0;
    ListNode* temp = head;
    while (temp) { ++count; temp = temp->next; }
    temp = head;
    for (int i = 0; i next;
    return temp;
}
```

**Optimal:** (Tortoise-Hare)

```cpp
ListNode* middleNode(ListNode* head) {
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}
```

#### b. Detect Cycle in Linked List

**Brute Force:** (Using set)

```cpp
bool hasCycle(ListNode* head) {
    unordered_set seen;
    while (head) {
        if (seen.count(head)) return true;
        seen.insert(head);
        head = head->next;
    }
    return false;
}
```

**Optimal:** (Floyd’s, Tortoise-Hare)

```cpp
bool hasCycle(ListNode* head) {
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}
```

#### c. Remove Nth Node from End

**Brute Force:**

```cpp
ListNode* removeNthFromEnd(ListNode* head, int n) {
    int len = 0;
    ListNode* temp = head;
    while (temp) { len++; temp = temp->next; }
    if (len == n) return head->next;
    temp = head;
    for (int i = 1; i next;
    temp->next = temp->next->next;
    return head;
}
```

**Optimal:** (Two-pointer technique)

```cpp
ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0); dummy.next = head;
    ListNode *fast = &dummy, *slow = &dummy;
    for (int i = 0; i next;
    while (fast->next) {
        fast = fast->next; slow = slow->next;
    }
    slow->next = slow->next->next;
    return dummy.next;
}
```

#### d. Delete Middle Node

**Brute Force:**

```cpp
ListNode* deleteMiddle(ListNode* head) {
    if (!head || !head->next) return nullptr;
    int len = 0;
    ListNode* temp = head;
    while (temp) { ++len; temp = temp->next; }
    int mid = len / 2;
    temp = head;
    for (int i = 1; i next;
    temp->next = temp->next->next;
    return head;
}
```

**Optimal:**

```cpp
ListNode* deleteMiddle(ListNode* head) {
    if (!head || !head->next) return nullptr;
    ListNode *slow = head, *fast = head, *prev = nullptr;
    while (fast && fast->next) {
        prev = slow; slow = slow->next; fast = fast->next->next;
    }
    prev->next = slow->next;
    return head;
}
```

### 3. **Dummy Node / Partitioning**

#### a. Sort Linked List of 0s, 1s, 2s

**Brute Force:** (Value count and overwrite)

```cpp
void sortList(ListNode* head) {
    int count[3] = {0};
    ListNode* temp = head;
    while (temp) { count[temp->val]++; temp = temp->next; }
    temp = head; int i = 0;
    while (temp) {
        if (count[i] == 0) ++i;
        else { temp->val = i; --count[i]; temp = temp->next; }
    }
}
```

**Optimal:** (Dummy node buckets)

```cpp
ListNode* sortList(ListNode* head) {
    ListNode zeroDummy(0), oneDummy(0), twoDummy(0);
    ListNode *zero = &zeroDummy, *one = &oneDummy, *two = &twoDummy;
    while (head) {
        if (head->val == 0) zero->next = head, zero = zero->next;
        else if (head->val == 1) one->next = head, one = one->next;
        else two->next = head, two = two->next;
        head = head->next;
    }
    zero->next = oneDummy.next ? oneDummy.next : twoDummy.next;
    one->next = twoDummy.next;
    two->next = nullptr;
    return zeroDummy.next;
}
```

#### b. Merge Two Sorted Linked Lists

**Brute Force:** (Collect all, sort, rebuild)

```cpp
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    vector vals;
    for (ListNode* t = l1; t; t = t->next) vals.push_back(t->val);
    for (ListNode* t = l2; t; t = t->next) vals.push_back(t->val);
    sort(vals.begin(), vals.end());
    ListNode dummy(0), *cur = &dummy;
    for (int v : vals) { cur->next = new ListNode(v); cur = cur->next; }
    return dummy.next;
}
```

**Optimal:** (Iterative merge)

```cpp
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0), *cur = &dummy;
    while (l1 && l2) {
        if (l1->val val) { cur->next = l1; l1 = l1->next; }
        else { cur->next = l2; l2 = l2->next; }
        cur = cur->next;
    }
    cur->next = (l1) ? l1 : l2;
    return dummy.next;
}
```

### 4. **Hashing / Extra Space**

#### a. Copy List with Random Pointer

**Brute Force:** (unordered_map node mapping)

```cpp
Node* copyRandomList(Node* head) {
    if (!head) return nullptr;
    unordered_map mp;
    Node* temp = head;
    while (temp) { mp[temp] = new Node(temp->val); temp = temp->next; }
    temp = head;
    while (temp) {
        mp[temp]->next = mp[temp->next];
        mp[temp]->random = mp[temp->random];
        temp = temp->next;
    }
    return mp[head];
}
```

**Optimal:** (Interleaving O(1) space)

```cpp
Node* copyRandomList(Node* head) {
    if (!head) return nullptr;
    Node* temp = head;
    while (temp) { // Clone nodes interleaved with original
        Node* copy = new Node(temp->val);
        copy->next = temp->next;
        temp->next = copy;
        temp = copy->next;
    }
    temp = head;
    while (temp) { // Set random pointers
        if (temp->random) temp->next->random = temp->random->next;
        temp = temp->next->next;
    }
    Node* newHead = head->next, *copy = newHead;
    temp = head;
    while (temp) { // Separate lists
        temp->next = temp->next->next;
        if (copy->next) copy->next = copy->next->next;
        temp = temp->next;
        copy = copy->next;
    }
    return newHead;
}
```

#### b. Detect Cycle Length

**Brute Force:** (unordered_map for positions)

```cpp
int countNodesinLoop(ListNode* head) {
    unordered_map mp;
    ListNode* temp = head; int idx = 1;
    while (temp) {
        if (mp.count(temp)) return idx - mp[temp];
        mp[temp] = idx++;
        temp = temp->next;
    }
    return 0;
}
```

**Optimal:** (Floyd’s, measure after cycle found)

```cpp
int countNodesinLoop(ListNode* head) {
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next, fast = fast->next->next;
        if (slow == fast) {
            int cnt = 1; ListNode* temp = slow->next;
            while (temp != slow) { ++cnt; temp = temp->next; }
            return cnt;
        }
    }
    return 0;
}
```

### 5. **Counting/Stack/Array Storage**

#### a. Check if Linked List is Palindrome

**Brute Force:** (store values in stack)

```cpp
bool isPalindrome(ListNode* head) {
    stack st;
    ListNode* temp = head;
    while (temp) { st.push(temp->val); temp = temp->next; }
    temp = head;
    while (temp) {
        if (temp->val != st.top()) return false;
        st.pop(); temp = temp->next;
    }
    return true;
}
```

**Optimal:** (Reverse second half, compare halves)

```cpp
ListNode* reverse(ListNode* head) {
    ListNode* prev = nullptr;
    while (head) {
        ListNode* next = head->next;
        head->next = prev;
        prev = head;
        head = next;
    }
    return prev;
}
bool isPalindrome(ListNode* head) {
    if (!head || !head->next) return true;
    ListNode *slow = head, *fast = head;
    while (fast->next && fast->next->next) {
        slow = slow->next; fast = fast->next->next;
    }
    ListNode* secondHalf = reverse(slow->next);
    ListNode *firstHalf = head, *temp = secondHalf;
    bool res = true;
    while (temp) {
        if (firstHalf->val != temp->val) { res = false; break; }
        firstHalf = firstHalf->next; temp = temp->next;
    }
    slow->next = reverse(secondHalf);
    return res;
}
```

#### b. Odd-Even Linked List (Rearrange by Index)

**Brute Force:** (Separate arrays, rebuild)

```cpp
ListNode* oddEvenList(ListNode* head) {
    vector odds, evens;
    int idx = 1; ListNode* temp = head;
    while (temp) {
        (idx % 2 ? odds : evens).push_back(temp);
        temp = temp->next; ++idx;
    }
    ListNode* dummy = new ListNode(0), *curr = dummy;
    for (auto node : odds) curr->next = node, curr = curr->next;
    for (auto node : evens) curr->next = node, curr = curr->next;
    curr->next = nullptr;
    return dummy->next;
}
```

**Optimal:** (Two pointers, in-place)

```cpp
ListNode* oddEvenList(ListNode* head) {
    if (!head || !head->next) return head;
    ListNode* odd = head, *even = head->next, *evenHead = even;
    while (even && even->next) {
        odd->next = even->next; odd = odd->next;
        even->next = odd->next; even = even->next;
    }
    odd->next = evenHead;
    return head;
}
```

### 6. **Divide and Conquer: Sorting Linked List**

#### a. Sort Linked List (Merge Sort)

**Brute Force:** (Copy to array, sort, reassign)

```cpp
ListNode* sortList(ListNode* head) {
    vector vals;
    for (ListNode* temp = head; temp; temp = temp->next) vals.push_back(temp->val);
    sort(vals.begin(), vals.end());
    ListNode* temp = head;
    for (int v : vals) { temp->val = v; temp = temp->next; }
    return head;
}
```

**Optimal:** (Merge sort using pointers)

```cpp
ListNode* merge(ListNode* l1, ListNode* l2) {
    ListNode dummy(0), *tail = &dummy;
    while (l1 && l2) {
        if (l1->val val) { tail->next = l1; l1 = l1->next; }
        else { tail->next = l2; l2 = l2->next; }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}
ListNode* sortList(ListNode* head) {
    if (!head || !head->next) return head;
    ListNode *slow = head, *fast = head->next;
    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
    ListNode* mid = slow->next; slow->next = nullptr;
    ListNode* left = sortList(head);
    ListNode* right = sortList(mid);
    return merge(left, right);
}
```

### 7. **Special Techniques**

#### a. Find Intersection Point of Y-Shaped Linked Lists

**Brute Force:** (Compare each A to all B)

```cpp
ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
    for (ListNode* a = headA; a; a = a->next)
        for (ListNode* b = headB; b; b = b->next)
            if (a == b) return a;
    return nullptr;
}
```

**Optimal:** (Length alignment, traverse together)

```cpp
int getLen(ListNode* head) {
    int len = 0; while (head) { ++len; head = head->next; } return len;
}
ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
    int lenA = getLen(headA), lenB = getLen(headB);
    while (lenA > lenB) { headA = headA->next; --lenA; }
    while (lenB > lenA) { headB = headB->next; --lenB; }
    while (headA && headB) {
        if (headA == headB) return headA;
        headA = headA->next; headB = headB->next;
    }
    return nullptr;
}
```

#### b. Add 1 to Number Represented by LL

**Brute Force:** (Convert to int, add, rebuild)

```cpp
ListNode* addOne(ListNode* head) {
    int num = 0;
    for (ListNode* temp = head; temp; temp = temp->next) num = num * 10 + temp->val;
    num += 1;
    vector digits;
    while (num) { digits.push_back(num % 10); num /= 10; }
    ListNode* newHead = new ListNode(0), *curr = newHead;
    for (int i = digits.size() - 1; i >= 0; --i) { curr->next = new ListNode(digits[i]); curr = curr->next; }
    return newHead->next;
}
```

**Optimal:** (Reverse, add, reverse back)

```cpp
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    while (head) {
        ListNode* next = head->next;
        head->next = prev;
        prev = head;
        head = next;
    }
    return prev;
}
ListNode* addOne(ListNode* head) {
    head = reverseList(head);
    ListNode* temp = head;
    int carry = 1;
    while (temp) {
        int sum = temp->val + carry;
        temp->val = sum % 10;
        carry = sum / 10;
        if (!temp->next && carry) {
            temp->next = new ListNode(carry);
            carry = 0;
        }
        temp = temp->next;
    }
    return reverseList(head);
}
```

#### c. Add Two Numbers Represented by LL

**Brute Force:** (Convert both lists to integers, add, rebuild)

```cpp
int getNum(ListNode* head) {
    int num = 0;
    while (head) num = num * 10 + head->val, head = head->next;
    return num;
}
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    int num1 = getNum(l1), num2 = getNum(l2), sum = num1 + num2;
    vector digits;
    while (sum) { digits.push_back(sum % 10); sum /= 10; }
    ListNode* dummy = new ListNode(0), *curr = dummy;
    for (int i = digits.size() - 1; i >= 0; --i) { curr->next = new ListNode(digits[i]); curr = curr->next; }
    return dummy->next;
}
```

**Optimal:** (Traverse parallel, sum digits, manage carry)

```cpp
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode dummy(0), *temp = &dummy;
    int carry = 0;
    while (l1 || l2 || carry) {
        int sum = carry;
        if (l1) sum += l1->val, l1 = l1->next;
        if (l2) sum += l2->val, l2 = l2->next;
        carry = sum / 10;
        temp->next = new ListNode(sum % 10);
        temp = temp->next;
    }
    return dummy.next;
}
```
## Common Problem Patterns in Linked List Operations

Linked list questions often follow recognizable patterns. Identifying these allows you to choose effective brute force and optimal solutions. Here is a structured guide to the most common patterns and their associated solutions:

### 1. Pointer Manipulation

**Applicable Problems:**  
- Reverse Linked List  
- Odd-Even Linked List  
- Merge Two Sorted Lists  
- Insert/Delete at Position

**Solution Pattern:**  
Directly manipulate the `next` pointers to change the structure of the list.  
- *Optimal Solution:* In-place updates, usually O(1) space.
- *Example*: Reverse pointers iteratively or recursively.

### 2. Two-Pointer Technique (Tortoise-Hare)

**Applicable Problems:**  
- Find Middle Node  
- Detect Cycle  
- Remove Nth Node from End  
- Delete Middle Node  
- Check for Palindrome

**Solution Pattern:**  
Use two pointers moving at different speeds.  
- *Optimal Solution:* Single traversal, O(1) extra space.
- *Example*: Move one pointer twice as fast as the other to detect cycles or find the list's middle.

### 3. Dummy Node Usage

**Applicable Problems:**  
- Merge Two Sorted Lists  
- Sort 0-1-2 Linked List  
- Remove Nth from End  
- Insertion/Deletion Near Head

**Solution Pattern:**  
Create a dummy node as a new head or helper to simplify code and avoid special cases at the head.

### 4. Hashing / Extra Space

**Applicable Problems:**  
- Detect Cycle (Brute Force)
- Copy List with Random Pointer

**Solution Pattern:**  
Utilize a hash map or set to keep track of visited nodes or node mappings.  
- *Brute Force Solution*: O(n) time and O(n) space; optimal alternatives often exist.

### 5. Counting / Array Storage

**Applicable Problems:**  
- Sort LL of 0s, 1s, 2s (Brute Force)
- Check for Palindrome (Brute Force)

**Solution Pattern:**  
Extract node values to an array or maintain counters, then process or rebuild the list from this intermediate storage.

### 6. Divide and Conquer (Recursive Splitting)

**Applicable Problems:**  
- Sort Linked List (Merge Sort)
- Find Intersection in Y-Shaped Lists

**Solution Pattern:**  
Split the list recursively, solve subproblems, and then merge.  
- *Optimal Solution:* Merge sort on links for O(n log n) time.

### 7. Reversal and Restoration

**Applicable Problems:**  
- Palindrome Check (Optimal)
- Add 1 to Number
- Add Two Numbers Represented by LL

**Solution Pattern:**  
Reverse the entire list or parts of it to simplify arithmetic or comparison. Restore the original order afterward if needed.

### 8. Interleaving Nodes

**Applicable Problems:**  
- Deep Copy with Random Pointer

**Solution Pattern:**  
Insert copied nodes in-place between original nodes, set correct pointers, then split into the final structure.

### Pattern-Problem Table

| Pattern                   | Example Problems                          | Typical Optimal Solution             |
|---------------------------|-------------------------------------------|--------------------------------------|
| Pointer Manipulation      | Reverse, Odd-Even, Merge Sorted           | In-place update of `.next`           |
| Two-Pointer Technique     | Find Middle, Cycle, Remove Nth, Palindrome| Slow & fast pointers                 |
| Dummy Node Usage          | Merge, Remove Nth, Sort 0-1-2             | Dummy node to simplify head logic    |
| Hashing / Extra Space     | Cycle detection, Copy with Random Pointer | Hash set or map for node addresses   |
| Counting / Array Storage  | Sort 0-1-2, Palindrome (Brute Force)      | Count/stack/array for values         |
| Divide and Conquer        | Sort Linked List, Intersection            | Recursive splitting & merging        |
| Reversal and Restoration  | Palindrome, Addition problems             | Reverse portion(s) of list           |
| Interleaving Nodes        | Copy with Random Pointer                  | Insert/adjust copy nodes in-place    |

## Summary Table: Common Patterns & Solutions

| Problem Type                           | Brute Force Approach                       | Optimal Solution Pattern                |
|-----------------------------------------|--------------------------------------------|-----------------------------------------|
| Reverse Linked List                     | Copy to array, reverse, overwrite          | Pointer manipulation (in-place)         |
| Find Middle Node                        | Count nodes, access by index               | Two-pointer (Tortoise-Hare)             |
| Detect Cycle                            | HashSet for visited nodes                  | Two-pointer (Floyd’s)                   |
| Length of Loop                          | Map for node positions                     | Cycle count after detection             |
| Odd-Even Linked List                    | Arrays for odd/even positions              | Rearrangement in-place by two pointers  |
| Sort 0s, 1s, 2s                         | Counting & overwrite                       | Dummy node partition and re-link        |
| Merge Two Sorted Lists                  | Array sort & rebuild                       | Dummy node iterative merge              |
| Copy List with Random Pointer           | HashMap mapping nodes                      | Interleaving, set random, split lists   |
| Check for Palindrome                    | Stack/array values, compare                | Reverse half, compare and restore       |
| Remove Nth Node from End                | Count, then delete                         | Two-pointer gap method                  |
| Delete Middle Node                      | Count and remove by index                  | Slow-fast, track previous, delete slow  |
| Sort Linked List                        | Array sort & assign                        | Merge sort (divide and conquer)         |
| Find Intersection in Y-shaped Lists     | Double traversal                           | Length align and simultaneous walk      |
| Add 1/Add Two Numbers Represented by LL | Convert to int, add, rebuild               | Reverse, add with carry, reverse back   |

By mastering these patterns, linked list problems become much more approachable, as most solutions fit into one of the above frameworks.

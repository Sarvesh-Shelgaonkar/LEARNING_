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


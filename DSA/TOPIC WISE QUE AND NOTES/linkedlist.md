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


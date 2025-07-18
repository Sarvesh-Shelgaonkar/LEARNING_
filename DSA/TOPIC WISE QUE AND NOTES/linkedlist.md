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

Here’s a **complete and clean implementation of a Doubly Linked List** in C++ (with full explanation), including:

* Node class
* Doubly Linked List class
* All major functions:

  * `pushFront`, `pushBack`
  * `popFront`, `popBack`
  * `insertAtPosition`, `deleteAtPosition`
  * `search`, `printForward`, `printReverse`
  * Edge case handling

---

### ✅ **1. Node Class**

```cpp
class Node {
public:
    int data;
    Node* prev;
    Node* next;

    Node(int val) {
        data = val;
        prev = nullptr;
        next = nullptr;
    }
};
```

---

### ✅ **2. Doubly Linked List Class**

```cpp
class DoublyLinkedList {
private:
    Node* head;
    Node* tail;

public:
    DoublyLinkedList() {
        head = nullptr;
        tail = nullptr;
    }
```

---

### ✅ **3. pushFront (Insert at beginning)**

```cpp
    void pushFront(int val) {
        Node* newNode = new Node(val);
        if (!head) {
            head = tail = newNode;
            return;
        }
        newNode->next = head;
        head->prev = newNode;
        head = newNode;
    }
```

---

### ✅ **4. pushBack (Insert at end)**

```cpp
    void pushBack(int val) {
        Node* newNode = new Node(val);
        if (!tail) {
            head = tail = newNode;
            return;
        }
        tail->next = newNode;
        newNode->prev = tail;
        tail = newNode;
    }
```

---

### ✅ **5. popFront (Delete from beginning)**

```cpp
    void popFront() {
        if (!head) return;
        Node* temp = head;
        if (head == tail) head = tail = nullptr;
        else {
            head = head->next;
            head->prev = nullptr;
        }
        delete temp;
    }
```

---

### ✅ **6. popBack (Delete from end)**

```cpp
    void popBack() {
        if (!tail) return;
        Node* temp = tail;
        if (head == tail) head = tail = nullptr;
        else {
            tail = tail->prev;
            tail->next = nullptr;
        }
        delete temp;
    }
```

---

### ✅ **7. insertAtPosition**

```cpp
    void insertAtPosition(int pos, int val) {
        if (pos == 0) {
            pushFront(val);
            return;
        }

        Node* curr = head;
        for (int i = 0; i < pos - 1 && curr; ++i)
            curr = curr->next;

        if (!curr) {
            pushBack(val);
            return;
        }

        Node* newNode = new Node(val);
        newNode->next = curr->next;
        newNode->prev = curr;

        if (curr->next)
            curr->next->prev = newNode;

        curr->next = newNode;

        if (curr == tail)
            tail = newNode;
    }
```

---

### ✅ **8. deleteAtPosition**

```cpp
    void deleteAtPosition(int pos) {
        if (!head) return;

        if (pos == 0) {
            popFront();
            return;
        }

        Node* curr = head;
        for (int i = 0; i < pos && curr; ++i)
            curr = curr->next;

        if (!curr) return;

        if (curr->prev)
            curr->prev->next = curr->next;
        if (curr->next)
            curr->next->prev = curr->prev;

        if (curr == tail)
            tail = curr->prev;

        delete curr;
    }
```

---

### ✅ **9. search**

```cpp
    bool search(int val) {
        Node* temp = head;
        while (temp) {
            if (temp->data == val)
                return true;
            temp = temp->next;
        }
        return false;
    }
```

---

### ✅ **10. printForward and printReverse**

```cpp
    void printForward() {
        Node* temp = head;
        while (temp) {
            std::cout << temp->data << " <-> ";
            temp = temp->next;
        }
        std::cout << "NULL\n";
    }

    void printReverse() {
        Node* temp = tail;
        while (temp) {
            std::cout << temp->data << " <-> ";
            temp = temp->prev;
        }
        std::cout << "NULL\n";
    }
};
```

---

### ✅ Example Main:

```cpp
int main() {
    DoublyLinkedList dll;

    dll.pushBack(10);
    dll.pushBack(20);
    dll.pushFront(5);
    dll.insertAtPosition(2, 15);

    dll.printForward();  // 5 <-> 10 <-> 15 <-> 20 <-> NULL
    dll.printReverse();  // 20 <-> 15 <-> 10 <-> 5 <-> NULL

    dll.deleteAtPosition(2);
    dll.popFront();
    dll.popBack();

    dll.printForward();  // 10 <-> NULL

    std::cout << "Search 10: " << dll.search(10) << "\n";
    std::cout << "Search 20: " << dll.search(20) << "\n";
}
```

---

### ✅ Time Complexity Summary:

| Operation            | Time |
| -------------------- | ---- |
| pushFront / pushBack | O(1) |
| popFront / popBack   | O(1) |
| insert/delete at pos | O(n) |
| search               | O(n) |
| print                | O(n) |

---

Here's the **full implementation of a Circular Singly Linked List (CSLL)** in C++ with the following essential operations:

* `insertFront(int val)`
* `insertBack(int val)`
* `popFront()`
* `popBack()`
* `display()`

---

### ✅ Full Code: Circular Singly Linked List with Insert & Delete at Both Ends

```cpp
#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;

    Node(int val) {
        data = val;
        next = nullptr;
    }
};

class CircularLinkedList {
private:
    Node* tail;

public:
    CircularLinkedList() {
        tail = nullptr;
    }

    // Insert at front
    void insertFront(int val) {
        Node* newNode = new Node(val);
        if (!tail) {
            tail = newNode;
            tail->next = tail;
        } else {
            newNode->next = tail->next;
            tail->next = newNode;
        }
    }

    // Insert at back
    void insertBack(int val) {
        Node* newNode = new Node(val);
        if (!tail) {
            tail = newNode;
            tail->next = tail;
        } else {
            newNode->next = tail->next;
            tail->next = newNode;
            tail = newNode;
        }
    }

    // Pop from front
    void popFront() {
        if (!tail) {
            cout << "List is empty.\n";
            return;
        }

        Node* head = tail->next;
        if (tail == head) {
            delete head;
            tail = nullptr;
        } else {
            tail->next = head->next;
            delete head;
        }
    }

    // Pop from back
    void popBack() {
        if (!tail) {
            cout << "List is empty.\n";
            return;
        }

        Node* head = tail->next;
        if (tail == head) {
            delete tail;
            tail = nullptr;
        } else {
            Node* temp = head;
            while (temp->next != tail)
                temp = temp->next;

            temp->next = tail->next; // Link back to head
            delete tail;
            tail = temp;
        }
    }

    // Display the list
    void display() {
        if (!tail) {
            cout << "List is empty.\n";
            return;
        }

        Node* temp = tail->next;
        do {
            cout << temp->data << " -> ";
            temp = temp->next;
        } while (temp != tail->next);
        cout << "(back to head)\n";
    }
};
```

---

### 🧪 Sample Usage:

```cpp
int main() {
    CircularLinkedList cll;
    cll.insertBack(10);
    cll.insertBack(20);
    cll.insertFront(5);
    cll.insertFront(1);
    cll.display(); // 1 -> 5 -> 10 -> 20 -> (back to head)

    cll.popFront();
    cll.display(); // 5 -> 10 -> 20 ->

    cll.popBack();
    cll.display(); // 5 -> 10 ->

    return 0;
}
```

---

### 🧠 Time Complexities

| Operation   | Time Complexity | Why?                       |
| ----------- | --------------- | -------------------------- |
| insertFront | O(1)            | Use of `tail->next`        |
| insertBack  | O(1)            | Use of `tail` pointer      |
| popFront    | O(1)            | Delete `tail->next`        |
| popBack     | O(n)            | Need to find previous node |
| display     | O(n)            | Traverse once              |


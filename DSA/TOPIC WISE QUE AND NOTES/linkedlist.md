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

class LinkedList {
private:
    Node* head;

public:
    LinkedList() {
        head = nullptr;
    }

    // Push at front
    void pushFront(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }

    // Push at back
    void pushBack(int val) {
        Node* newNode = new Node(val);
        if (!head) {
            head = newNode;
            return;
        }
        Node* temp = head;
        while (temp->next)
            temp = temp->next;
        temp->next = newNode;
    }

    // Pop front
    void popFront() {
        if (!head) {
            cout << "List is empty.\n";
            return;
        }
        Node* temp = head;
        head = head->next;
        delete temp;
    }

    // Pop back
    void popBack() {
        if (!head) {
            cout << "List is empty.\n";
            return;
        }
        if (!head->next) {
            delete head;
            head = nullptr;
            return;
        }
        Node* temp = head;
        while (temp->next->next)
            temp = temp->next;
        delete temp->next;
        temp->next = nullptr;
    }

    // Insert at position (0-based)
    void insertAt(int pos, int val) {
        if (pos < 0) {
            cout << "Invalid position.\n";
            return;
        }

        if (pos == 0) {
            pushFront(val);
            return;
        }

        Node* temp = head;
        for (int i = 0; temp && i < pos - 1; i++)
            temp = temp->next;

        if (!temp) {
            cout << "Position out of bounds.\n";
            return;
        }

        Node* newNode = new Node(val);
        newNode->next = temp->next;
        temp->next = newNode;
    }

    // Delete at position (0-based)
    void deleteAt(int pos) {
        if (!head || pos < 0) {
            cout << "Invalid position or empty list.\n";
            return;
        }

        if (pos == 0) {
            popFront();
            return;
        }

        Node* temp = head;
        for (int i = 0; temp->next && i < pos - 1; i++)
            temp = temp->next;

        if (!temp->next) {
            cout << "Position out of bounds.\n";
            return;
        }

        Node* delNode = temp->next;
        temp->next = delNode->next;
        delete delNode;
    }

    // Search value
    bool search(int key) {
        Node* temp = head;
        while (temp) {
            if (temp->data == key)
                return true;
            temp = temp->next;
        }
        return false;
    }

    // Display list
    void display() {
        if (!head) {
            cout << "List is empty.\n";
            return;
        }
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

    list.pushBack(10);
    list.pushBack(20);
    list.pushFront(5);
    list.display(); // 5 -> 10 -> 20 -> NULL

    list.insertAt(1, 7);
    list.display(); // 5 -> 7 -> 10 -> 20 -> NULL

    list.popFront();
    list.display(); // 7 -> 10 -> 20 -> NULL

    list.popBack();
    list.display(); // 7 -> 10 -> NULL

    list.deleteAt(1);
    list.display(); // 7 -> NULL

    cout << "Found 7? " << (list.search(7) ? "Yes" : "No") << endl;
    cout << "Found 10? " << (list.search(10) ? "Yes" : "No") << endl;

    return 0;
}

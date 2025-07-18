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

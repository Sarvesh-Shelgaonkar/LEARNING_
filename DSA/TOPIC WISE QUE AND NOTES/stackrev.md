Here’s a **complete guide** on **Stack Interview Questions and Answers** covering:

1. ✅ Basics
2. 🧠 Theoretical Questions
3. 🌍 Real-world Examples
4. 🏗️ System Design Context
5. 📌 When to Use Stack – with Scenarios & Examples

---

## ✅ 1. **Basics of Stack – Q\&A**

### Q1. What is a stack?

**Answer:**
A stack is a linear data structure that follows the **Last In, First Out (LIFO)** principle. The last element inserted is the first to be removed.

---

### Q2. What are the basic operations of a stack?

**Answer:**

* `Push(x)`: Add x to top of stack
* `Pop()`: Remove top element
* `Peek()/Top()`: View top element without removing
* `isEmpty()`: Check if stack is empty
* `isFull()`: (for array-based stack) Check if full

---

### Q3. What is the time complexity of stack operations?

**Answer:**

* Push, Pop, Peek → **O(1)**
* Traversing stack → O(n)

---

### Q4. How can you implement a stack?

**Answer:**

* **Using Array** – fixed size
* **Using Linked List** – dynamic size
* **Using Two Queues** – alternate structure
* **Using One Queue** (costlier operations)

---

## 🧠 2. **Theoretical Stack Questions – Q\&A**

### Q5. What is stack overflow and underflow?

**Answer:**

* **Stack Overflow**: When pushing into a full stack
* **Stack Underflow**: When popping from an empty stack

---

### Q6. What is the difference between Stack and Queue?

| Stack         | Queue                 |
| ------------- | --------------------- |
| LIFO          | FIFO                  |
| One end (top) | Two ends (front/rear) |
| Eg: Browser   | Eg: Print Queue       |

---

### Q7. How is stack used in recursion?

**Answer:**
Every recursive function call is pushed to the call stack. Once a function completes, it is popped off the stack, maintaining the return sequence.

---

### Q8. What are applications of stack in parsing?

**Answer:**

* Expression parsing (e.g., converting infix to postfix)
* Matching brackets (compiler syntax checks)
* Tag matching in HTML/XML

---

### Q9. How does stack help in memory management?

**Answer:**
Stack helps manage function calls and local variables. It automatically cleans up memory when a function returns (unlike heap).

---

## 🌍 3. **Real-world Examples of Stack – Q\&A**

### Q10. How is stack used in the browser?

**Answer:**

* When visiting pages:

  * Current page is pushed onto **back stack**
  * Pressing back pops from stack
  * Forward navigation uses another stack

---

### Q11. How does undo-redo work using stacks?

**Answer:**

* **Undo Stack**: Actions pushed here
* On undo: pop from Undo and push to **Redo Stack**
* On redo: pop from Redo and push back to Undo

---

### Q12. How is stack used in text editor?

**Answer:**
To store character insert/delete operations. Undo feature relies on stacks to reverse recent edits.

---

### Q13. Stack use in expression evaluation?

**Answer:**
Used to evaluate:

* Postfix expressions directly
* Infix → Postfix → Evaluate
  Keeps operators and operands in correct order.

---

## 🏗️ 4. **System Design Context – Stack Usage**

### Q14. How is stack used in function call tracking?

**Answer:**
Each function call stores:

* Return address
* Local variables
  When a function returns, the stack restores the caller’s context.

---

### Q15. Where do compilers or interpreters use stacks?

**Answer:**

* To evaluate expressions
* Track scopes (e.g., variables in nested functions)
* Managing recursive calls

---

### Q16. Stack in system architecture?

**Answer:**

* **Call Stack**: In CPU architecture
* **Interrupts**: When an interrupt occurs, current state is pushed to stack
* **Web Servers**: Middleware request stack

---

### Q17. Stack usage in VMs (e.g., Java VM)?

**Answer:**

* Java uses **stack-based architecture**
* Each thread has its own call stack
* Bytecode executes using operand stack

---

## 📌 5. **When to Use Stack – Common Scenarios & Examples**

| Scenario              | Why Use Stack                    | Example                       |
| --------------------- | -------------------------------- | ----------------------------- |
| Backtracking          | LIFO helps go back to last state | Maze solving, Sudoku          |
| Reversing             | Stack reverses order naturally   | Reverse string, linked list   |
| Function Calls        | Tracks nested calls              | Recursion                     |
| Expression Evaluation | Handles operator precedence      | Calculator, Parser            |
| Undo Feature          | Reverse actions step by step     | MS Word, Code Editor          |
| Syntax Parsing        | Balanced brackets, tags          | Compiler, HTML Parser         |
| Tree/Graph Traversal  | DFS uses stack                   | Inorder traversal (iterative) |

---

## ✅ Summary (Cheat Sheet)

| Category           | Example                            |
| ------------------ | ---------------------------------- |
| **Basic Use**      | Push, Pop, Peek                    |
| **Implementation** | Array, Linked List                 |
| **Concepts**       | LIFO, Call Stack                   |
| **Real World**     | Browser, Undo, Compilers           |
| **Advanced**       | Expression Parsing, DFS, Min Stack |

---





# implementation using vector
Imagine vector as a stack -


#include <iostream>
#include <vector>
using namespace std;

class Stack {
private:
    vector<int> v;

public:
    // Push element to top
    void push(int data) {
        v.push_back(data);
    }

    // Pop element from top
    void pop() {
        if (v.empty()) {
            cout << "Stack Underflow\n";
            return;
        }
        v.pop_back();
    }

    // Return top element
    int top() {
        if (v.empty()) {
            cout << "Stack is Empty\n";
            return -1;
        }
        return v.back();
    }

    // Check if stack is empty
    bool isEmpty() {
        return v.empty();
    }

    // Return current size
    int size() {
        return v.size();
    }
};

int main() {
    Stack s;
    s.push(10);
    s.push(20);
    s.push(30);
    cout << "Top: " << s.top() << endl;
    s.pop();
    cout << "Top after pop: " << s.top() << endl;
    cout << "Size: " << s.size() << endl;
    cout << (s.isEmpty() ? "Empty" : "Not Empty") << endl;
}




# implementation using array 

#include <iostream>
using namespace std;

class Stack {
private:
    int arr[100];       // static array of fixed size
    int topIndex;
    int capacity;

public:
    Stack(int cap = 100) {
        capacity = cap;
        topIndex = -1;
    }

    // Push element onto stack
    void push(int x) {
        if (topIndex >= capacity - 1) {
            cout << "Stack Overflow\n";
            return;
        }
        arr[++topIndex] = x;
    }

    // Pop element from stack
    void pop() {
        if (isEmpty()) {
            cout << "Stack Underflow\n";
            return;
        }
        topIndex--;
    }

    // Return top element
    int top() {
        if (isEmpty()) {
            cout << "Stack is Empty\n";
            return -1;
        }
        return arr[topIndex];
    }

    // Check if empty
    bool isEmpty() {
        return topIndex == -1;
    }

    // Check if full
    bool isFull() {
        return topIndex == capacity - 1;
    }

    // Current size
    int size() {
        return topIndex + 1;
    }
};

int main() {
    Stack s(5);
    s.push(10);
    s.push(20);
    s.push(30);
    cout << "Top: " << s.top() << endl;
    s.pop();
    cout << "Top after pop: " << s.top() << endl;
    cout << "Size: " << s.size() << endl;
    cout << (s.isEmpty() ? "Empty" : "Not Empty") << endl;
}


**In short:**

```cpp
arr[++topIndex] = x;
```

👉 **Increments `topIndex` first**, then stores `x` at that index in the array.
✅ Equivalent to:

```cpp
topIndex++;
arr[topIndex] = x;
```

Used to **push `x` onto the stack** at the new top position.



Great question!

In the `pop()` function of a stack using a **static array**, you’ll often see:

```cpp
--topIndex;   // or sometimes: topIndex--;
```

---

### ✅ Why `--topIndex` (or `topIndex--`)?

Because when you **pop an element**, you’re **removing the top item** from the stack.

So you:

1. **Don’t need to delete the actual value** — you just "ignore" it by **moving the top pointer down**.
2. **topIndex** should now point to the **previous** element.

---

### 🔍 Example:

```cpp
int arr[5];
int topIndex = 2;  // top = arr[2]
arr[0] = 10;
arr[1] = 20;
arr[2] = 30;

// Popping:
--topIndex;  // Now topIndex = 1
```

Now:

* `arr[2] = 30` still exists in memory.
* But `topIndex` is 1 → top is now 20.

✅ This is efficient: just update the index.

---

### 🔄 Difference Between `--topIndex` and `topIndex--`?

In **this context**, both work **the same**, because you are just reducing the value.

But:

* `--topIndex`: **Pre-decrement** → subtract 1 **before using**
* `topIndex--`: **Post-decrement** → subtract 1 **after using**

✅ If you're not using the value immediately, **both are equivalent** in `pop()`.

---

### 🧠 In short:

> **`--topIndex` is used to move the pointer down, marking the top element as removed.**
> The value remains in the array but is no longer considered part of the stack.



| Vector Stack                                   | Array Stack                                           |
| ---------------------------------------------- | ----------------------------------------------------- |
| **Dynamic size** – grows/shrinks automatically | **Fixed size** – declared once (e.g., `int arr[100]`) |
| No need to check capacity manually             | Must handle overflow manually                         |



| Vector Stack                          | Array Stack                                   |
| ------------------------------------- | --------------------------------------------- |
| Uses `v.push_back(x)`, `v.pop_back()` | Manually manage `topIndex++`, `topIndex--`    |
| Fewer bugs, built-in safety           | More control, but prone to overflow/underflow |



# implementation using ll

#include <iostream>
using namespace std;

// Node structure
class Node {
public:
    int data;
    Node* next;

    Node(int val) {
        data = val;
        next = nullptr;
    }
};

// Stack class
class Stack {
private:
    Node* topNode;

public:
    Stack() {
        topNode = nullptr;
    }

    // Push element on top
    void push(int val) {
        Node* newNode = new Node(val);
        newNode->next = topNode;
        topNode = newNode;
    }

    // Pop top element
    void pop() {
        if (isEmpty()) {
            cout << "Stack Underflow\n";
            return;
        }
        Node* temp = topNode;
        topNode = topNode->next;
        delete temp;
    }

    // Return top element
    int top() {
        if (isEmpty()) {
            cout << "Stack is Empty\n";
            return -1;
        }
        return topNode->data;
    }

    // Check if empty
    bool isEmpty() {
        return topNode == nullptr;
    }

    // Print stack (for debugging)
    void print() {
        Node* temp = topNode;
        while (temp) {
            cout << temp->data << " -> ";
            temp = temp->next;
        }
        cout << "NULL\n";
    }
};

int main() {
    Stack s;
    s.push(10);
    s.push(20);
    s.push(30);
    s.print(); // 30 -> 20 -> 10 -> NULL

    cout << "Top: " << s.top() << endl;

    s.pop();
    s.print(); // 20 -> 10 -> NULL

    cout << "Top after pop: " << s.top() << endl;
}



Great question!

---

## 🔄 Why `push_front()` is used in Stack (with `std::list`)?

In a **stack**, we always **insert (push)** and **remove (pop)** elements **from the top** — i.e., **LIFO (Last-In-First-Out)**.

When using `std::list` (which is a **doubly linked list**), we have **two options**:

* `push_front(x)` → insert at the beginning
* `push_back(x)` → insert at the end

---

### ✅ Stack Analogy with `push_front()`:

Suppose this is the stack:

```
Top → 30
       20
       10
```

If we use `push_front()`:

* `push_front(10)` → adds 10 to front
* `push_front(20)` → adds 20 **before** 10
* `push_front(30)` → adds 30 **before** 20

The list looks like:

```
30 → 20 → 10  (front of list = top of stack ✅)
```

So:

* `push_front()` = **push to top**
* `pop_front()` = **pop from top**
* `front()` = **view top**

---

### ❌ What if we used `push_back()` instead?

* It would insert at the **end** of the list.
* Then to remove from **top**, we would need to call `pop_back()` which is still fine.
* But **removing last node from list is O(n)** (unless you use `std::list::pop_back()` which is optimized internally).

So both can work, but:

* Using `push_front()` & `pop_front()` gives clean and **efficient O(1)** behavior like a real stack.
* And matches the LIFO principle exactly.

---

## ✅ Conclusion:

| Stack Operation | STL `list` Function |
| --------------- | ------------------- |
| `push(x)`       | `push_front(x)`     |
| `pop()`         | `pop_front()`       |
| `top()`         | `front()`           |





### ✅ **Reverse a Stack using `pushAtBottom` (Recursive Approach)**

---

### 🔁 **Code Explanation**

```cpp
class Solution {
public:
    void Reverse(stack<int> &St) {
        if (St.empty()) return;              // Base case: empty stack
        int temp = St.top();                 // Store top
        St.pop();                            // Remove top
        Reverse(St);                         // Reverse remaining stack
        pushatbottom(St, temp);              // Push the top at bottom
    }

    void pushatbottom(stack<int> &St, int temp) {
        if (St.empty()) {
            St.push(temp);                   // Base case: stack is empty
            return;
        }
        int top = St.top();
        St.pop();
        pushatbottom(St, temp);              // Go till stack becomes empty
        St.push(top);                        // Push back the elements
    }
};
```

---

### 🧠 **Key Idea:**

You recursively pop all elements of the stack and then insert each one **at the bottom** instead of top — this reverses the order.

---

### ⏱️ **Time Complexity Analysis**

Let **n** be the number of elements in the stack.

1. `Reverse()` is called **n** times → each time pops one element.
2. For each call, it calls `pushAtBottom()` which takes **O(n)** time in worst case to reach bottom.

🔁 So,

* `Reverse()` is called **n** times.
* Each `pushAtBottom()` does up to **O(n)** operations.

### ✅ **Total Time Complexity:**

$$
O(n^2)
$$

---

### 📘 **Quick Notes (for Revision):**

| 🔹 Point                         | 🔍 Description                                    |
| -------------------------------- | ------------------------------------------------- |
| **Goal**                         | Reverse a stack using recursion                   |
| **Approach**                     | Remove top → reverse remaining → insert at bottom |
| **Function Used**                | `pushAtBottom(stack, value)`                      |
| **Recursion Depth**              | `O(n)`                                            |
| **Time Complexity**              | `O(n^2)`                                          |
| **Space Complexity (Recursion)** | `O(n)` (stack frames)                             |
| **No Extra Stack Used**          | Uses only recursion stack                         |
| **Best Use Case**                | When stack reversal is needed recursively         |

---

### 📌 Diagram of Recursive Calls:

Let stack be: `5 4 3 2 1` (1 on top)

```
Reverse(5 4 3 2 1)
→ pop 1 → Reverse(5 4 3 2)
→ pop 2 → Reverse(5 4 3)
→ pop 3 → Reverse(5 4)
→ pop 4 → Reverse(5)
→ pop 5 → Reverse(empty)
→ start inserting back at bottom:
   → pushAtBottom(empty, 5) → [5]
   → pushAtBottom([5], 4)   → [4 5]
   → pushAtBottom([4 5], 3) → [3 4 5]
   ...
   Final: [1 2 3 4 5] ✅
```

Let me know if you want an **iterative version** or **graphical dry run**!




 **Next Greater Element I** 

 class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        vector<int>ans;
        for(int i=0;i<nums2.size();i++){
            //int target=0;
            if(i==nums2.size()-1){ans.push_back(-1); }
            
            for(int j=i+1;j<nums2.size();j++){
                if(nums2[j]>nums2[i]){
                   ans.push_back(nums2[j]);
                   break;
                }
                if(j==nums2.size()-1){ans.push_back(-1);}
            

            }
            
            
        }
        unordered_map<int,int>map;
        int i=0;
        for(auto it:nums2){
            map[it]=ans[i];
            i++;
        }
        vector<int>newans;
        for(int i=0;i<nums1.size();i++){
           newans.push_back(map[nums1[i]]);
        }
        return newans;
    }
};






class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        // vector<int>ans;
        // for(int i=0;i<nums2.size();i++){
        //     //int target=0;
        //     if(i==nums2.size()-1){ans.push_back(-1); }
            
        //     for(int j=i+1;j<nums2.size();j++){
        //         if(nums2[j]>nums2[i]){
        //            ans.push_back(nums2[j]);
        //            break;
        //         }
        //         if(j==nums2.size()-1){ans.push_back(-1);}
            

        //     }
            
            
        // }
        // unordered_map<int,int>map;
        // int i=0;
        // for(auto it:nums2){
        //     map[it]=ans[i];
        //     i++;
        // }
        // vector<int>newans;
        // for(int i=0;i<nums1.size();i++){
        //    newans.push_back(map[nums1[i]]);
        // }
        // return newans;

vector<int>newans;
       stack<int>st;
       unordered_map<int,int>map;
      
       for(int i=nums2.size()-1; i>=0;i--){
        while( !st.empty() && st.top()<nums2[i] ){
            st.pop();
           
        }
        if(st.empty()){
            map[nums2[i]]=-1;
        }
        else{
            map[nums2[i]]=st.top();
        }
        st.push(nums2[i]);
       
       }
        for(int i=0;i<nums1.size();i++){
            newans.push_back(map[nums1[i]]);
        }
        return newans;
    }
};




---

### ✅ Your Two Approaches:

#### 🔴 1. **Brute Force (Nested Loops)** — `O(N²)`

```cpp
for each element in nums2:
    check all elements to its right until a greater one is found
```

* **Time Complexity**: `O(N²)`
* **Issues**:

  * Repeated comparisons
  * Some cases may push extra `-1`s (double push in the loop)

#### ✅ 2. **Monotonic Stack + Hash Map** — `O(N)`

```cpp
Use a decreasing stack while scanning nums2 from right to left.
Map each element to its next greater.
Finally, lookup map for each element in nums1.
```

**Your code:**

```cpp
vector<int>newans;
stack<int>st;
unordered_map<int,int>map;

for(int i=nums2.size()-1; i>=0; i--){
    while(!st.empty() && st.top() < nums2[i]){
        st.pop();
    }

    map[nums2[i]] = st.empty() ? -1 : st.top();
    st.push(nums2[i]);
}

for(int i=0; i<nums1.size(); i++){
    newans.push_back(map[nums1[i]]);
}
return newans;
```

✅ **Time Complexity**:

* Stack + map creation: `O(N)`
* Answer lookup: `O(M)`

> Overall: `O(N + M)` where N = nums2 size, M = nums1 size

✅ **Space Complexity**:

* Stack + map: `O(N)`

---

### 🧠 Why Stack Works Better?

This method avoids redundant comparisons. For each number in `nums2`, you:

* Keep only useful greater elements in the stack
* Discard smaller elements that can’t ever be "next greater" for future numbers

---

### 🔁 Summary:

| Approach              | Time     | Space | Efficiency |
| --------------------- | -------- | ----- | ---------- |
| Brute Force           | O(N²)    | O(M)  | ❌ Slow     |
| Monotonic Stack + Map | O(N + M) | O(N)  | ✅ Optimal  |

Let me know if you want a dry run or visual of how the stack behaves step by step!



Your code is **almost perfect** and implements the **Next Greater Element II** (circular version) correctly. ✅
But let me walk you through a clean-up, clarify it, and explain **why and how it works**, step by step.

---

### ✅ **Cleaned-up and Commented Version of Your Code**

```cpp
class Solution {
public:
    vector<int> nextGreaterElements(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(n, -1);     // Initialize all answers as -1
        stack<int> st;              // Stack stores indices

        // Loop from 2n-1 to 0 to simulate circular array
        for (int i = 2 * n - 1; i >= 0; i--) {
            int idx = i % n;        // Wrap around using modulo

            // Pop all smaller or equal elements from stack
            while (!st.empty() && nums[st.top()] <= nums[idx]) {
                st.pop();
            }

            // Only assign during first pass (i < n is optional, here always assigning)
            if (!st.empty()) {
                ans[idx] = nums[st.top()];
            } // else: already initialized to -1

            // Push current index to stack
            st.push(idx);
        }

        return ans;
    }
};
```

---

### 🧠 **Explanation**

* You are using a **stack of indices**, not values. So you use `nums[st.top()]` to access the value.
* You simulate a **circular array** by iterating from `2n-1` to `0` and accessing `nums[i % n]`.
* At each step:

  * Pop smaller or equal values since they **can’t be the next greater** for the current element.
  * If the stack has something after popping, it’s the **next greater** for `nums[idx]`.
  * Push current index for future comparisons.

---

### ✅ **Why It Works Without Extra Count Check**

You don't need an external counter to track rounds because:

* The loop runs `2n` times.
* You access all values in a **circular manner**.
* First pass fills stack for circular behavior.
* Second pass (first `n` iterations of the loop) assigns results.

---

### 🧪 Example Dry Run

Input: `nums = [1, 2, 1]`

Stack during 2n pass:

```
i = 5 (idx = 2): stack empty → push 2
i = 4 (idx = 1): stack has 2 (nums[2] = 1) < nums[1]=2 → pop → stack empty → push 1
i = 3 (idx = 0): stack has 1 (nums[1]=2) > nums[0]=1 → ans[0]=2 → push 0
...
```

Final Answer: `[2, -1, 2]`

---

Let me know if you want:

* 🔄 Reverse approach (from left to right)
* 🧾 Python/Java version
* 📊 Visual dry run or stack trace diagram

Happy to explain further!

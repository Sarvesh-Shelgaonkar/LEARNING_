

## 🔍 **Problem Statement**

Find the **majority element** in an integer array `nums`, where the majority element is **an element that appears more than ⌊n / 2⌋ times**.
It is guaranteed that a majority element **always exists**.

---

## ✅ **Approach 1: Brute Force (O(n²))**

### ✅ Code:

```cpp
int majorityElement(vector<int>& nums) {
    int ans;
    int n = nums.size();
    
    for (int i = 0; i < n; i++) {
        int freq = 0;
        
        for (int j = 0; j < n; j++) {
            if (nums[j] == nums[i]) {
                freq++;
            }
        }
        
        if (freq > n / 2) {
            ans = nums[i];
        }
    }
    return ans;
}
```

### ⚠️ Issues:

* **Inefficient**: O(n²) time complexity due to nested loops.
* **Not scalable** for large input sizes.

---

## ⚡ **Approach 2: Sorting (O(n log n))**

### ❌ Incorrect Version (causes undefined behavior)

```cpp
sort(nums.begin(), nums.end());
int n = nums.size();
int freq = 0;
int ans;
for (int i = 1; i < n; i++) {
    if (nums[i] == nums[i - 1]) {
        freq++;
    } else {
        freq = 0;
    }
    if (freq > n / 2) {
        ans = nums[i];
    }
}
return ans;
```

### ❌ Problems:

* **Uninitialized Variable `ans`**: Might return a garbage value if no update happens.
* **Incorrect `freq` Counting**: Doesn't count the first occurrence (`freq` should start from 1).
* **Potential Heap-Buffer-Overflow**: If the garbage value in `ans` is used in an array or pointer, it may cause invalid memory access.

---

### ✅ Corrected Version

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        int freq = 1;
        int ans = nums[0];  // Valid initialization

        for (int i = 1; i < n; i++) {
            if (nums[i] == nums[i - 1]) {
                freq++;
            } else {
                freq = 1;
            }

            if (freq > n / 2) {
                ans = nums[i];
                break;
            }
        }
        return ans;
    }
};
```

### ✅ Fixes:

* `ans` initialized to `nums[0]`
* `freq` starts at 1
* Loop breaks early when majority is found

---

### 🧪 Dry Run (nums = \[2, 3, 3]):

* Sorted: \[2, 3, 3]
* freq = 1, ans = 2
* i = 1: 3 ≠ 2 → freq = 1
* i = 2: 3 == 3 → freq = 2 → 2 > 3/2 → ans = 3 → return

---

## 💥 Heap Buffer Overflow: Root Cause & Fix

### ❌ Problem:

```cpp
int ans; // uninitialized
```

May hold garbage like `-32654`, leading to:

* Invalid index access
* Heap-buffer-overflow

### ✅ Fix:

```cpp
int ans = nums[0];
```

Ensures `ans` holds a valid value always.

---

## 🧰 **Approach 3: Extra Array (Fixed-size Frequency Array)**

### ❌ Code with Fixed Size (Fails for nums outside 0–8)

```cpp
int arr[9] = {0};
for (int i = 0; i < nums.size(); i++) {
    arr[nums[i]]++;
}
```

### ❌ Problem:

* Only works for values in \[0, 8]
* ❗ Crashes on `nums[i] > 8` or `nums[i] < 0` → **stack buffer overflow**

---

### ✅ Safer (but Limited) Version:

```cpp
int arr[10000] = {0};
for (int i = 0; i < nums.size(); i++) {
    arr[nums[i]]++;
}
```

### ⚠️ Still Problematic:

* Cannot handle negative values.
* Still wasteful for sparse data or large value ranges.

---

## ✅ **Best Practice: Use `unordered_map` (Handles All Integers)**

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        unordered_map<int, int> countMap;
        int n = nums.size();
        
        for (int num : nums) {
            countMap[num]++;
        }
        
        for (auto& pair : countMap) {
            if (pair.second > n / 2) {
                return pair.first;
            }
        }
        
        return -1; // Optional: problem guarantees a majority element
    }
};
```

### ✅ Advantages:

* Handles **any range** (positive or negative integers).
* Efficient: O(n) time, O(n) space.
* Avoids array size limitations.

---

## 🆚 `auto& pair` vs `auto pair`:

| Syntax       | Description                        | Efficiency |
| ------------ | ---------------------------------- | ---------- |
| `auto& pair` | Accesses map elements by reference | ✅ Faster   |
| `auto pair`  | Creates a copy of each map element | ❌ Slower   |

---

## 📚 **Quick Guide: `unordered_map` in DSA**

### ✅ When to Use:

* **Fast key-based lookup**
* **Frequency counting**
* **No need for order**

### ✅ Core Operations:

```cpp
unordered_map<int, string> map;
map[1] = "apple";       // insert
cout << map[1];         // access
map.erase(1);           // delete

if (map.find(2) != map.end()) {
    // key exists
}
```

### ✅ Iteration:

```cpp
for (auto& pair : map) {
    cout << pair.first << " -> " << pair.second << endl;
}
```

---

## 🧠 **DSA Examples Using `unordered_map`**

### 1. **Count Frequency of Characters**

```cpp
unordered_map<char, int> freq;
for (char c : str) {
    freq[c]++;
}
```

### 2. **Find Most Frequent Element**

```cpp
unordered_map<int, int> freq;
for (int num : nums) {
    freq[num]++;
}
int max_freq = 0, most_frequent = -1;
for (auto& p : freq) {
    if (p.second > max_freq) {
        max_freq = p.second;
        most_frequent = p.first;
    }
}
```

---

## 📌 **Key Takeaways**

| Problem Area             | Solution/Fix                                    |
| ------------------------ | ----------------------------------------------- |
| ❌ Uninitialized Variable | ✅ Initialize `ans = nums[0]`                    |
| ❌ Wrong Frequency Logic  | ✅ Start `freq = 1`                              |
| ❌ Heap-buffer-overflow   | ✅ Avoid out-of-bounds access                    |
| ❌ Limited array indexing | ✅ Use `unordered_map` for flexible key access   |
| ✅ Use by-reference loop  | `auto& pair` is more efficient than `auto pair` |

---

## 🏁 Summary of Approaches

| Approach # | Method          | Time       | Space | Handles Negatives? | Safe?         |
| ---------- | --------------- | ---------- | ----- | ------------------ | ------------- |
| 1          | Brute Force     | O(n²)      | O(1)  | ✅                  | ✅ (but slow)  |
| 2          | Sorting         | O(n log n) | O(1)  | ✅                  | ✅ (after fix) |
| 3          | Frequency Array | O(n)       | O(k)  | ❌ unless offset    | ❌ Risky       |
| 4 ✅        | `unordered_map` | O(n)       | O(n)  | ✅                  | ✅ Best choice |

---
You're referring to **Approach 3**, which is **Moore’s Voting Algorithm** implemented in a concise C++ form. Let me analyze and present your code properly — with **comments**, **fixes if needed**, and **structured explanation**:

---


### ✅ **Moore’s Voting Algorithm (Approach 3) – Final Code**

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int freq = 0;         // Tracks balance of votes
        int ans = 0;          // Stores current candidate
        int n = nums.size();

        for (int i = 0; i < n; i++) {
            if (freq == 0) {
                ans = nums[i];   // Set new candidate
            }

            if (nums[i] == ans) {
                freq++;          // Support from same number
            } else {
                freq--;          // Opposition → cancel out
            }
        }

        return ans;
    }
};
```

---

### ✅ Explanation of Each Part

| Line                  | Purpose                                          |
| --------------------- | ------------------------------------------------ |
| `int freq = 0;`       | Frequency counter (votes left for candidate)     |
| `int ans = 0;`        | Stores the majority candidate                    |
| `if (freq == 0)`      | If no current candidate, pick the current number |
| `if (nums[i] == ans)` | If it matches the candidate, increase vote       |
| `else freq--`         | If not matching, cancel vote                     |
| `return ans;`         | Return the final majority candidate              |

---

### 🧪 Dry Run: `nums = [3, 3, 4, 2, 4, 4, 2, 4, 4]`

| i | nums\[i] | ans | freq | Explanation                  |
| - | -------- | --- | ---- | ---------------------------- |
| 0 | 3        | 3   | 1    | freq = 0 → candidate = 3     |
| 1 | 3        | 3   | 2    | same as ans → freq++         |
| 2 | 4        | 3   | 1    | different → freq--           |
| 3 | 2        | 3   | 0    | different → freq-- (reset)   |
| 4 | 4        | 4   | 1    | freq = 0 → new candidate = 4 |
| 5 | 4        | 4   | 2    | same → freq++                |
| 6 | 2        | 4   | 1    | different → freq--           |
| 7 | 4        | 4   | 2    | same → freq++                |
| 8 | 4        | 4   | 3    | same → freq++                |

✅ Majority: **4**

---

### 🧠 Why This Works

* Every non-majority element cancels out a majority vote.
* Since majority appears more than n/2 times, it **cannot be fully cancelled**.
* Final remaining `ans` is guaranteed to be the majority.

---

### 📌 Best Practices (for interviews)

**Optional Step: Second Pass Verification**
Only needed **if majority is not guaranteed**:

```cpp
int count = 0;
for (int num : nums) {
    if (num == ans) count++;
}
if (count > nums.size() / 2) return ans;
else return -1; // no majority element exists
```

---




Absolutely! Here's a **complete, structured set of notes** for your `findDuplicate` problem, covering all three approaches in detail with explanations, time/space complexities, and the **Floyd’s Cycle Detection** method (slow-fast pointer) as the final optimized solution.

---

## 🔍 **Problem: Find the Duplicate Number**

### **Given:**

An array `nums` containing `n + 1` integers where each integer is between `1` and `n` (inclusive), with exactly **one duplicate** number.

### **Objective:**

Find the duplicate number.
🛑 You **must not modify** the array.
🧠 You **must use only constant O(1) space** (in the optimal approach).

---

## 📌 **Approach 1: Brute Force (O(n²))**

### ✅ Idea:

Compare each element with all other elements to count its frequency.

### 📄 Code:

```cpp
int ans;
for (int i = 0; i < nums.size(); i++) {
    int freq = 1;
    for (int j = 0; j < nums.size(); j++) {
        if (nums[j] == nums[i]) {
            freq--;
        }
        if (freq == -1) {
            ans = nums[j];
            break;
        }
    }
}
return ans;
```

### 🧠 Explanation:

* Subtract 1 from `freq` when a match is found.
* When `freq == -1`, it means we’ve found the duplicate.

### ⏱ Time: O(n²)

### 🧠 Space: O(1)

### ❌ Not efficient for large inputs.

---

## 📌 **Approach 2: Using `unordered_set` (Hashing)**

### ✅ Idea:

Track seen elements in a hash set.
If you see the same element again → duplicate.

### 📄 Code:

```cpp
unordered_set<int> s;
int ans;
for (auto val : nums) {
    if (s.find(val) != s.end()) {
        ans = val;
        break;
    }
    s.insert(val);
}
return ans;
```

### ⏱ Time: O(n)

### 🧠 Space: O(n)

### ✅ Much faster than brute-force.

### ❌ Fails **space constraint** (O(1) not satisfied).

---

## 📌 **Approach 3: Floyd's Cycle Detection Algorithm (Optimal)**

> Also called: **Tortoise and Hare Algorithm**

### ✅ Idea:

Treat the array like a **linked list** where `nums[i]` is the next pointer.
Since there's a duplicate, a **cycle** is guaranteed.

---

### 🔁 **Step-by-step Algorithm:**

#### **Phase 1: Detect Cycle**

* Start `slow = nums[0]`, `fast = nums[0]`
* Move `slow = nums[slow]` (1 step)
* Move `fast = nums[nums[fast]]` (2 steps)
* Stop when `slow == fast`

#### **Phase 2: Find Entry Point of Cycle**

* Set `slow = nums[0]` again
* Move both `slow` and `fast` by 1 step
* First meeting point is the duplicate

---

### 📄 Code:

```cpp
int slow = nums[0];
int fast = nums[0];

// Phase 1: Find intersection point
do {
    slow = nums[slow];
    fast = nums[nums[fast]];
} while (slow != fast);

// Phase 2: Find cycle entry (duplicate)
slow = nums[0];
while (slow != fast) {
    slow = nums[slow];
    fast = nums[fast];
}
return slow;
```

---

### 🔍 Why This Works:

* The **cycle** comes from the **duplicate number pointing to the same index** as another number.
* This mimics the **Cycle Detection in Linked List** — so the intersection point is reached, and then by resetting one pointer to start, we meet at the duplicate.

---

### ⏱ Time: O(n)

### 🧠 Space: O(1) ✅

### ✅ Most efficient, no array modification, constant space, fast.

---

## 🔁 Dry Run Example

**Input:** `nums = [1, 3, 4, 2, 2]`

1. Linked list representation:

   ```
   Index → Value → Next
   0     → 1     → 3
   1     → 3     → 2
   2     → 4     → 2  ← cycle here!
   3     → 2     → 4
   4     → 2     → 4
   ```

2. Cycle starts at 2 (duplicate)

---

## ✅ Final Summary Table

| Approach         | Time     | Space    | Modifies Array | Handles Large Input | Notes                 |
| ---------------- | -------- | -------- | -------------- | ------------------- | --------------------- |
| Brute Force      | O(n²)    | O(1)     | No             | ❌                   | Simple, slow          |
| Hash Set         | O(n)     | O(n)     | No             | ✅                   | Fast, but extra space |
| Floyd's Cycle 🔥 | **O(n)** | **O(1)** | **No**         | ✅                   | Best approach         |

---

## 🧠 Key Takeaways

* Think of `nums[i]` as a **pointer** in a linked list.
* **Cycle detection** solves duplicate detection **efficiently**.
* Never forget: **O(1) space + no modification = use Floyd's algorithm**.

Here’s how to **confidently explain the solution in an interview** — especially if asked:
**"How would you find the duplicate number in an array of size n+1 where all numbers are between 1 and n and only one duplicate exists?"**

---

## ✅ **Ideal Interview Answer (Using Floyd’s Cycle Detection)**

> *You can say this out loud or write it as an explanation during a technical interview.*

---

### 🧠 "I would use Floyd’s Tortoise and Hare Cycle Detection Algorithm."

> Let me explain why this works and how I’d implement it:

### **Problem Understanding:**

We are given an array of `n + 1` integers where each number is between `1` and `n`, so **at least one number must repeat**.
We are **not allowed to modify the array**, and we need to use **O(1) extra space**.

---

### ✅ **Intuition:**

I treat the array like a **linked list** where the value at each index points to the next index — like `i → nums[i]`.

Since there’s a duplicate, this setup will form a **cycle** — because two indices will point to the same number (node), just like a cycle in a linked list.

---

### 🔁 **Approach – Two Phases**

#### **1. Detect Cycle**

* I initialize two pointers:
  `slow = nums[0]`
  `fast = nums[0]`
* Then I move them:

  * `slow = nums[slow]`  (1 step)
  * `fast = nums[nums[fast]]`  (2 steps)
* I keep moving them until they meet — that confirms a cycle.

#### **2. Find the Entry Point (duplicate)**

* After the first meeting, I reset `slow = nums[0]`
* Then move both `slow` and `fast` one step at a time.
* The point where they meet is the **start of the cycle**, which is the **duplicate number**.

---

### 📄 **Code:**

```cpp
int findDuplicate(vector<int>& nums) {
    int slow = nums[0];
    int fast = nums[0];

    // Phase 1: Detect cycle
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);

    // Phase 2: Find entry to the cycle (duplicate)
    slow = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }

    return slow;
}
```

---

### 🧠 Why This is the Best Choice:

| Constraint                   | Satisfied? |
| ---------------------------- | ---------- |
| Time complexity O(n)         | ✅          |
| Space complexity O(1)        | ✅          |
| No array modification        | ✅          |
| Works even if input is large | ✅          |

---

### 📌 Summary Line for Interview:

> “I used Floyd’s cycle detection algorithm because it solves the problem in **O(n) time**, **O(1) space**, and **doesn’t require modifying the array**, which fits all constraints perfectly.”




Absolutely! Here’s a **complete, structured explanation** of the **Two Sum Problem**, with **three solutions**:

1. Brute-force (nested loops)
2. Sorting + Binary Search
3. Hashing with `unordered_map` (optimal)

---

## 🧠 **Problem: Two Sum**

### ❓**Given:**

An array `nums` and an integer `target`.

### 🎯**Task:**

Find two indices `i` and `j` such that:

```cpp
nums[i] + nums[j] == target
```

Return the **indices** `i` and `j` (i ≠ j).

---

## 📌 **Approach 1: Brute Force (Two Loops)**

### ✅ Idea:

Try every pair using 2 nested loops.

### 📄 Code:

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }
        return {}; // No solution found
    }
};
```

### ⏱ Time: **O(n²)**

### 🧠 Space: **O(1)**

### ✅ Simple but inefficient for large arrays.

---

## 📌 **Approach 2: Sorting + Binary Search**

### ✅ Idea:

1. Sort a **copy** of the array (to preserve original indices).
2. For each element, search `target - nums[i]` using binary search.
3. Map found values back to original indices.

---

### ⚠️ Warning:

* Sorting destroys original indices.
* So we need to **store original indices** as part of pairs.

---

### 📄 Code:

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        int n = nums.size();
        
        vector<pair<int, int>> v; // {value, original_index}
        for (int i = 0; i < n; i++) {
            v.push_back({nums[i], i});
        }

        sort(v.begin(), v.end());

        for (int i = 0; i < n; i++) {
            int complement = target - v[i].first;
            int low = i + 1, high = n - 1;

            while (low <= high) {
                int mid = low + (high - low) / 2;

                if (v[mid].first == complement) {
                    return {v[i].second, v[mid].second};
                } else if (v[mid].first < complement) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return {};
    }
};
```

### ⏱ Time: **O(n log n)** (due to sorting and binary search)

### 🧠 Space: **O(n)** (due to the pair vector)

---

## 📌 **Approach 3: Using `unordered_map` (Optimal)**

### ✅ Idea:

* Store each number and its index in a hash map.
* For every `nums[i]`, check if `target - nums[i]` exists in the map.

---

### 📄 Code:

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp; // {value, index}

        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];

            if (mp.find(complement) != mp.end()) {
                return {mp[complement], i};
            }

            mp[nums[i]] = i;
        }
        return {};
    }
};
```

### ⏱ Time: **O(n)**

### 🧠 Space: **O(n)**

### ✅ Best performance for large inputs

---

## 🔁 Dry Run Example

**Input:** `nums = [2, 7, 11, 15], target = 9`

### Brute Force:

* (2 + 7) = 9 → ✅ return {0, 1}

### Hash Map:

* map = {}, i = 0 → complement = 7 → not found → add 2:0
* i = 1 → complement = 2 → found! → return {0, 1}

---

## 🏁 **Comparison Table**

| Approach             | Time       | Space | Preserves Indices        | Notes                          |
| -------------------- | ---------- | ----- | ------------------------ | ------------------------------ |
| Brute Force          | O(n²)      | O(1)  | ✅                        | Simple but slow                |
| Sort + Binary Search | O(n log n) | O(n)  | ⚠️ Extra handling needed | Sorting loses original indices |
| `unordered_map`      | O(n)       | O(n)  | ✅                        | Fastest & cleanest             |



Here's a **short and structured summary** of your Bubble Sort & Selection Sort errors, fixes, and optimal solution for **Sort Colors**:

---

### 🧨 **Bubble Sort Issue**

**Problem in Code:**

```cpp
for (int j = 0; j < nums.size(); j++) {
    if (nums[j+1] < nums[j]) swap(nums[j], nums[j+1]);
}
```

✅ **Bug:**
Accesses `nums[j + 1]` even when `j == nums.size() - 1` → **out-of-bounds** → undefined behavior (`-1094795586` output)

✅ **Fix:**
Loop till `j < nums.size() - i - 1`

```cpp
for (int j = 0; j < n - i - 1; j++)
```

---

### 💥 **Selection Sort Mistake**

**Your code:**

```cpp
for (int i = 0; i < nums.size(); i++) {
    for (int j = i + 1; j < nums.size(); j++) {
        if (nums[j] < nums[i]) {
            swap(nums[i], nums[j]);
            break;
        }
    }
}
```

✅ **Bug:**
Swaps at **first smaller element**, not the **smallest one**
→ Leads to incorrect or partially sorted output

✅ **Fix:**
Find the **minIndex**, then swap once:

```cpp
int minIndex = i;
for (int j = i + 1; j < nums.size(); j++) {
    if (nums[j] < nums[minIndex]) minIndex = j;
}
swap(nums[i], nums[minIndex]);
```

---

### 🚀 **Optimal One-Pass Solution (Dutch National Flag Algorithm)**

```cpp
int low = 0, mid = 0, high = nums.size() - 1;
while (mid <= high) {
    if (nums[mid] == 0) swap(nums[low++], nums[mid++]);
    else if (nums[mid] == 1) mid++;
    else swap(nums[mid], nums[high--]);
}
```

✅ Time: `O(n)`
✅ Space: `O(1)`
✅ Best for LeetCode’s [Sort Colors](https://leetcode.com/problems/sort-colors)

---

### 📌 Summary Table

| ❌ Error Type                | ✅ Fix                                 |
| --------------------------- | ------------------------------------- |
| Bubble sort `j+1` access    | Loop till `j < n - i - 1`             |
| Selection sort breaks early | Use `minIndex` to find true minimum   |
| Inefficient sorting         | Use **Dutch National Flag** for 0,1,2 |

Let me know if you want this in **PDF format**, a **step-by-step diagram**, or **code comparisons**.



Yes! There are **many methods to sort an array**, each suited for different use cases based on **time complexity**, **space complexity**, and **data constraints**.

Below is a **summary of the most commonly used sorting algorithms**, including:

* 🧠 **Concept**
* ⏱️ **Time Complexity**
* 💾 **Space Complexity**
* 🔁 **Stable/Not**
* ✅ **When to Use**

---

### 🔟 Popular Sorting Algorithms

|  # | Algorithm          | Time Complexity             | Space    | Stable | Notes                                                        |
| -: | ------------------ | --------------------------- | -------- | ------ | ------------------------------------------------------------ |
|  1 | **Bubble Sort**    | O(n²)                       | O(1)     | ✅ Yes  | Educational only; not practical                              |
|  2 | **Selection Sort** | O(n²)                       | O(1)     | ❌ No   | Always swaps with smallest                                   |
|  3 | **Insertion Sort** | O(n²), O(n) best            | O(1)     | ✅ Yes  | Good for small or nearly sorted arrays                       |
|  4 | **Merge Sort**     | O(n log n)                  | O(n)     | ✅ Yes  | Divide & Conquer; stable & consistent                        |
|  5 | **Quick Sort**     | O(n log n) avg, O(n²) worst | O(log n) | ❌ No   | Fastest in practice; uses partitioning                       |
|  6 | **Heap Sort**      | O(n log n)                  | O(1)     | ❌ No   | Great for in-place sorting                                   |
|  7 | **Counting Sort**  | O(n + k)                    | O(k)     | ✅ Yes  | For small integer ranges (non-negative)                      |
|  8 | **Radix Sort**     | O(nk)                       | O(n + k) | ✅ Yes  | Works for integers/strings; uses counting sort as subroutine |
|  9 | **Bucket Sort**    | O(n + k)                    | O(n)     | ✅ Yes  | Best for uniformly distributed floats                        |
| 10 | **STL sort (C++)** | O(n log n)                  | O(log n) | ❌ No   | Hybrid of quick/heap/insertion (IntroSort)                   |

---

### ✅ Best Algorithms by Use Case

| Use Case                               | Recommended Sort          | Why?                             |
| -------------------------------------- | ------------------------- | -------------------------------- |
| Small or nearly sorted array           | Insertion Sort            | Very efficient on small inputs   |
| General-purpose array                  | Merge Sort / STL `sort()` | Stable & guaranteed performance  |
| Memory-constrained environment         | Heap Sort / Quick Sort    | In-place, fast                   |
| Sorting 0s, 1s, and 2s only            | Dutch National Flag       | O(n) single pass                 |
| Integers in a small range (e.g. 0–100) | Counting Sort             | Fast and memory-efficient        |
| Very large integers or strings         | Radix Sort                | Linear time for digit-based sort |
| Float values in \[0, 1)                | Bucket Sort               | Excellent distribution sort      |

---

### ⚡ Dutch National Flag – for 0s, 1s, 2s only (LeetCode: Sort Colors)

```cpp
void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    while (mid <= high) {
        if (nums[mid] == 0)
            swap(nums[low++], nums[mid++]);
        else if (nums[mid] == 1)
            mid++;
        else
            swap(nums[mid], nums[high--]);
    }
}
```

---

### 🧠 STL `sort()` and `stable_sort()` (C++)

```cpp
sort(nums.begin(), nums.end());            // Uses IntroSort (Quick + Heap + Insertion)
stable_sort(nums.begin(), nums.end());     // Maintains relative order of equal elements
```

---

### ✅ Final Recommendations:

* For **competitive programming**: use `sort()` or custom `QuickSort/MergeSort`.
* For **interviews**: know how to write **QuickSort**, **MergeSort**, **Counting Sort**, and **Dutch National Flag**.
* For **real-time systems**: prefer **HeapSort** or **Counting Sort** (if range is known).




---

## ✅ **Problem**: Sort array containing only 0s, 1s, and 2s.

---

## 🟢 **Approach 1: STL Sort**

```cpp
sort(nums.begin(), nums.end());
```

* ✅ Simple, 1-line
* ⏱ Time: O(n log n)
* 💾 Space: O(1)
* ❌ Overkill – we only need O(n)

---

## 🟡 **Approach 2: Bubble Sort**

```cpp
for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
        if (nums[j] > nums[j + 1])
            swap(nums[j], nums[j + 1]);
    }
}
```

* ⏱ Time: O(n²)
* 💾 Space: O(1)
* ❌ Slow – not suitable for large inputs
* ✅ Easy to understand

---

## 🟠 **Approach 3: Selection Sort**

```cpp
for (int i = 0; i < n; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
        if (nums[j] < nums[minIdx])
            minIdx = j;
    }
    swap(nums[i], nums[minIdx]);
}
```

* ⏱ Time: O(n²)
* 💾 Space: O(1)
* ❌ Inefficient
* ✅ Deterministic behavior (always finds min)

---

## 🔵 **Approach 4: Counting Sort (2-pass)**

```cpp
int cnt0 = 0, cnt1 = 0, cnt2 = 0;
for (int num : nums) {
    if (num == 0) cnt0++;
    else if (num == 1) cnt1++;
    else cnt2++;
}

int idx = 0;
for (int i = 0; i < cnt0; i++) nums[idx++] = 0;
for (int i = 0; i < cnt1; i++) nums[idx++] = 1;
for (int i = 0; i < cnt2; i++) nums[idx++] = 2;
```

* ⏱ Time: O(n)
* 💾 Space: O(1)
* ✅ Simple, readable
* ❌ 2 passes required

---

## 🔴 **Approach 5: Dutch National Flag (1-pass Optimal)**

```cpp
  int mid=0; int high=nums.size()-1;   //mid to high undorted part;
        int low=0;
        
        while(mid<=high){
            if(nums[mid]==0){
                swap(nums[low],nums[mid]);
                low++;
                mid++;
            }
            else if(nums[mid]==1){
                mid++;
            }
            else{
                swap(nums[mid],nums[high]);
                high--;
                
            }
        }


* ⏱ Time: O(n)
* 💾 Space: O(1)
* ✅ 1 pass, optimal
* ✅ In-place
* ❌ Not stable (relative order not preserved)

---

## 📌 Summary Table

| Approach        | Time       | Space | Passes | Notes                       |
| --------------- | ---------- | ----- | ------ | --------------------------- |
| STL `sort()`    | O(n log n) | O(1)  | 1      | Easy, but unnecessary       |
| Bubble Sort     | O(n²)      | O(1)  | n      | Simple, slow                |
| Selection Sort  | O(n²)      | O(1)  | n      | Always selects min          |
| Counting Sort   | O(n)       | O(1)  | 2      | Fast, extra counters needed |
| Dutch Flag Algo | O(n)       | O(1)  | 1      | Best & most optimal         |

---

## 🔑 Best Practice

Use **Dutch National Flag Algorithm** for `0, 1, 2` problems.
It's **O(n)**, **in-place**, and works in a **single scan**.



Here’s a **complete, structured, and concise note** covering **all the methods you've implemented** for the `merge()` function in LeetCode’s **"Merge Sorted Array"** problem.

---

# ✅ Merge Sorted Array – Notes for All Approaches

**Problem Statement:**
You are given two sorted integer arrays `nums1` and `nums2`. Merge `nums2` into `nums1` as one sorted array **in-place**.

* `nums1` has a size of `m + n`, with the last `n` elements set to 0, which should be ignored initially.
* `m` is the number of valid elements in `nums1`, and `n` is the size of `nums2`.

---

## ✅ Approach 1: Brute Force Insert + Sort

### 💡 Idea:

Insert elements of `nums2` into the zero positions of `nums1`, then sort `nums1`.

```cpp
for (int i = 0; i < nums2.size(); i++) {
    for (int j = 0; j < nums1.size(); j++) {
        if (nums1[j] == 0) {
            nums1[j] = nums2[i];
            break;
        }
    }
}
sort(nums1.begin(), nums1.end());
```

### ✅ Time & Space:

* **Time:** O(n × (m + n) + (m + n) log(m + n))
* **Space:** O(1)
* **Drawbacks:** Repeated linear search for insertion, then sort – inefficient.

---

## ✅ Approach 2: Append + Sort

### 💡 Idea:

Directly place `nums2` at the end of `nums1` and sort the full array.

```cpp
for (int i = 0; i < nums2.size(); i++) {
    nums1[m + i] = nums2[i];
}
sort(nums1.begin(), nums1.end());
```

### ✅ Time & Space:

* **Time:** O(n + (m + n) log(m + n))
* **Space:** O(1)
* **Better than Approach 1**, but still involves sorting.

---

## ✅ Approach 3: Merge Using Extra Space

### 💡 Idea:

Use two pointers and a temporary array to merge `nums1[0..m-1]` and `nums2[0..n-1]`.

```cpp
int nums3[m + n];
int ptr1 = 0, ptr2 = 0, idx = 0;

while (ptr1 < m && ptr2 < n) {
    if (nums1[ptr1] < nums2[ptr2]) nums3[idx++] = nums1[ptr1++];
    else nums3[idx++] = nums2[ptr2++];
}

while (ptr1 < m) nums3[idx++] = nums1[ptr1++];
while (ptr2 < n) nums3[idx++] = nums2[ptr2++];

for (int i = 0; i < m + n; i++) nums1[i] = nums3[i];
```

### ✅ Time & Space:

* **Time:** O(m + n)
* **Space:** O(m + n)
* **Clean and easy**, but not in-place.

---

## ✅ Approach 4: Optimal In-Place Merge from Back

### 💡 Idea:

Start merging from the end to avoid overwriting `nums1`. Use three pointers:

* `i = m - 1` (last valid element in `nums1`)
* `j = n - 1` (last element in `nums2`)
* `idx = m + n - 1` (write position from end)

```cpp
int i = m - 1, j = n - 1, idx = m + n - 1;

while (i >= 0 && j >= 0) {
    if (nums1[i] >= nums2[j]) nums1[idx--] = nums1[i--];
    else nums1[idx--] = nums2[j--];
}

while (j >= 0) nums1[idx--] = nums2[j--];
```

### ✅ Time & Space:

* **Time:** O(m + n)
* **Space:** O(1)
* **Best solution** – truly in-place, fast, and clean.

---

## 📊 Comparison Table

| Approach          | Time Complexity            | Space Complexity | In-place? | Notes                          |
| ----------------- | -------------------------- | ---------------- | --------- | ------------------------------ |
| Brute Insert+Sort | O(n×(m+n) + (m+n)log(m+n)) | O(1)             | ✅         | Inefficient, two nested loops  |
| Append + Sort     | O(n + (m+n)log(m+n))       | O(1)             | ✅         | Simpler than Brute             |
| Extra Array       | O(m + n)                   | O(m + n)         | ❌         | Clean logic, not space optimal |
| Two-pointer Back  | O(m + n)                   | O(1)             | ✅ ✅       | Best approach                  |

---

## 🚫 Common Mistake:

### ❗ Incorrect initialization:

```cpp
int i = m; // ❌ INVALID: out of bounds
```

* Should be: `int i = m - 1;`

### ❗ Forgetting to copy remaining elements from `nums2`:

* Always run `while (j >= 0)` loop at end to copy leftover `nums2` values.

---

## ✅ Best Practice:

* Always prefer **Approach 4** unless explicitly allowed extra space.
* For interviews, discuss both extra space and optimal in-place solution.





# ✅ **Next Permutation** – Notes

## 💡 Problem Statement:

Given an array of integers representing a **permutation**, rearrange it to the **next lexicographically greater permutation**. If such an arrangement is not possible, rearrange it to the **lowest possible order** (i.e., sorted in ascending order).

---

## 🔹 **Approach 1: Brute Force**

### 🔍 Idea:

1. Generate **all permutations**.
2. Sort them.
3. Find the current permutation using **linear search**, and return the **next one**.

### ⚠️ Drawbacks:

* Very **inefficient** (Time complexity: O(n!) due to permutations).
* Not feasible for large arrays.

---

## 🔹 **Approach 2: Optimal – Next Lexicographical Permutation (O(n))**

### ✅ Steps:

### 🔸 **Step 1: Find the Pivot**

* Traverse from the end and find the **first index `i` such that `nums[i] < nums[i + 1]`**.
* This means the sequence after `i` is **non-increasing**, and `nums[i]` is the **pivot**.

### 🔸 **Step 2: Find Just Larger Element**

* Traverse from the end and find the **smallest number greater than `nums[i]`**, say `nums[j]`.

### 🔸 **Step 3: Swap**

* Swap `nums[i]` and `nums[j]`.

### 🔸 **Step 4: Reverse the Suffix**

* Reverse the subarray from `i + 1` to the end to get the next permutation.

---

### ✅ Example:

**Input:** `nums = [1, 2, 3]`
**Output:** `nums = [1, 3, 2]`

**Steps:**

* Pivot: `2` at index 1 (since 2 < 3)
* Just larger: `3` at index 2
* Swap → `[1, 3, 2]`
* Reverse suffix → no change (already smallest)

---

### ✅ C++ Code:

```cpp
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size();
        int i = n - 2;

        // Step 1: Find the pivot
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }

        if (i >= 0) {
            // Step 2: Find just larger element
            int j = n - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            // Step 3: Swap
            swap(nums[i], nums[j]);
        }

        // Step 4: Reverse the suffix
        reverse(nums.begin() + i + 1, nums.end());
    }
};
```

---

## 🧠 Intuition:

* To move to the **next greater permutation**, we need to **increase** the number minimally.
* Swapping the pivot with the **next larger element** achieves this.
* Reversing the suffix ensures we get the **smallest** number larger than the current one.

---

## 📊 Time & Space Complexity:

| Approach         | Time     | Space |
| ---------------- | -------- | ----- |
| Brute Force      | O(n!)    | O(n!) |
| Optimal (2-pass) | **O(n)** | O(1)  |

---

## ✅ Summary Table:

| Step             | Purpose                                  |
| ---------------- | ---------------------------------------- |
| Find pivot       | Locate the first dip from end            |
| Find just larger | Swap with element just bigger than pivot |
| Swap             | Create a greater number                  |
| Reverse suffix   | Make it the smallest possible            |




Sure! Here's the **complete detailed notes with code** for **all 4 approaches** to solve the **"Search in Rotated Sorted Array"** problem, including **step-by-step explanation, time & space complexity**, and **commented code**.

---

### ✅ Problem:

```cpp
You are given an integer array `nums` which is sorted in ascending order and then rotated. Find the index of the `target` element in `nums`. Return -1 if not found.
```

Example:

```cpp
Input:  nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

---

## ✅ Approach 1: Brute Force – Linear Search

### 🔹 Code:

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
};
```

### 🔹 Time Complexity: `O(n)`

### 🔹 Space Complexity: `O(1)`

> ✔️ Works always, but very slow for large arrays.

---

## ✅ Approach 2: Restore to Sorted → Binary Search (Inefficient)

### 🔹 Logic:

1. Find pivot (`minidx`) → index of minimum element
2. Rotate the array `minidx` times
3. Do binary search on sorted array
4. Return `(mid + minidx) % size` to get original index

### 🔹 Code:

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int minidx = 0;
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] < nums[minidx]) minidx = i;
        }

        // Rotate array minidx times (inefficient)
        for (int k = 0; k < minidx; k++) {
            int temp = nums[0];
            for (int i = 1; i < nums.size(); i++) {
                nums[i - 1] = nums[i];
            }
            nums[nums.size() - 1] = temp;
        }

        // Binary Search
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (nums[mid] == target) return (mid + minidx) % nums.size();
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
};
```

### 🔹 Time Complexity:

* Find min: `O(n)`
* Rotate array: `O(n²)` ❌
* Binary search: `O(log n)`
* ✅ **Overall: O(n²)** (worst case)

---

## ✅ Approach 3: Sort → Binary Search → Adjust Index

### 🔹 Logic:

* Find `minidx` (index of smallest element)
* Sort the array
* Do binary search
* Adjust final answer as: `(mid + minidx) % size`

### 🔹 Code:

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int minidx = 0;
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] < nums[minidx]) minidx = i;
        }

        sort(nums.begin(), nums.end());

        // Binary Search
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (nums[mid] == target) return (mid + minidx) % nums.size();
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }

        return -1;
    }
};
```

### 🔹 Time Complexity:

* Find minidx: `O(n)`
* Sort: `O(n log n)`
* Binary search: `O(log n)`
* ✅ **Overall: O(n log n)**

---

## ✅ Approach 4: Optimized Modified Binary Search (Best 💯)

### 🔹 Logic:

* One half of array is always sorted
* Determine which half is sorted
* Use binary search rules accordingly

### 🔹 Code:

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) return mid;

            // Left half is sorted
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }
            // Right half is sorted
            else {
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }

        return -1;
    }
};
```

### 🔹 Time Complexity: `O(log n)`

### 🔹 Space Complexity: `O(1)`

> ✅ Works for all cases including rotated arrays, duplicates (if handled), and negative values.

---

## 🔚 Summary Table

| Approach # | Name                          | Time Complexity | Space | Notes                   |
| ---------- | ----------------------------- | --------------- | ----- | ----------------------- |
| 1          | Linear Search                 | O(n)            | O(1)  | Brute-force             |
| 2          | Rotate + Binary Search        | O(n²)           | O(1)  | Slow rotation           |
| 3          | Sort → Binary Search          | O(n log n)      | O(1)  | Sort destroys structure |
| **4**      | **Modified Binary Search** 💯 | **O(log n)**    | O(1)  | ✅ Best approach         |

---


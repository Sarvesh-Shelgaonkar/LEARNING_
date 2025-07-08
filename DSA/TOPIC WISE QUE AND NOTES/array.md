

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



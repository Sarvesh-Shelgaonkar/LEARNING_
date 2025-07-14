class Solution {
public:
    int search(vector<int>& nums, int target) {
        int st=0;
        int end=nums.size()-1;
        return ans(nums,target,st,end);
    }
     int ans(vector<int> &arr, int k,int st,int end){
        if(st<=end){
           int mid=st+(end-st)/2;
        if(arr[mid]==k){return mid;}
        else if(arr[mid]>k){
            return ans(arr,k,st,mid-1);
        }
        else{
            return ans(arr,k,mid+1,end);
        } 
        }
        
        return -1;
    }
};

### ✅ **Working Version (Correct)**:

```cpp
if (arr[mid] > k) {
    return ans(arr, k, st, mid - 1);
}
```

### ❌ **Non-working Version (Wrong)**:

```cpp
if (arr[mid] > k) {
    ans(arr, k, st, mid - 1);  // missing return!
}
```

---

### 🔍 Difference Explained:

#### ❗ In the non-working version:

You're making the recursive call, but **not returning its result**.

So, even if `ans(...)` returns a correct index deeper in recursion, that value is **ignored**, and control continues to the next line — which eventually leads to:

```cpp
return -1;
```

#### ✅ In the working version:

You use `return` with each recursive call, so if the value is found deeper in recursion, that index is properly **propagated back up** the recursive call stack.

---

### 💡 Fix for Non-working Version:

Just add `return` before each recursive call:

```cpp
if (arr[mid] > k) {
    return ans(arr, k, st, mid - 1);
} else {
    return ans(arr, k, mid + 1, end);
}
```

---

### TL;DR:

Without `return`, recursive results are lost — you must `return` the recursive call if you expect its result to be used.

Let me know if you want an example step-by-step trace to visualize this.

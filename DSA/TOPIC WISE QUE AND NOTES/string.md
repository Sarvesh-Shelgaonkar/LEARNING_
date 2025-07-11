class Solution {
public:
    string capitalizeTitle(string title) {
       int i=0;
       while(i<title.length()){
        
        while(i<title.length() && title[i]==' '){i++;}
        int st=i;
        while(i<title.length() && title[i]!=' '){i++;}
        int end=i;
        int len=end-st;
        if(len>=3){
            if(title[st]>='a' && title[st]<='z'){title[st]=title[st]-'a'+'A';}
           
            for(int i=st+1;i<end;i++){
                if(title[i]>='A'&& title[i]<='Z'){title[i]=title[i]-'A'+'a';}
                else{continue;}
            }
        }
        else{
           for(int i=st;i<end;i++){
                if(title[i]>='A'&& title[i]<='Z'){title[i]=title[i]-'A'+'a';}
                else{continue;}
            }  
        }
        i++;
      }
    return title;
    }
    
};
### 🔍 In C++, the `continue` statement is used **inside loops** like `for`, `while`, or `do-while`.

It **skips the rest of the current iteration** and **jumps to the next iteration** of the loop.

---

### 📌 Meaning of `continue` in your code:

Let's look at this part:

```cpp
for(int i = st+1; i < end; i++) {
    if(title[i] >= 'A' && title[i] <= 'Z') {
        title[i] = title[i] - 'A' + 'a'; // convert to lowercase
    } else {
        continue;
    }
}
```

### 🔹 Explanation:

* If the current character is **uppercase**, you convert it to **lowercase**.
* If it's **already lowercase**, the `else` block says: `continue;`
* That means: "**Skip remaining code in the loop and go to the next character**".

---

### ✅ But here’s the thing:

> The `continue;` is **not needed** in your case — it’s **redundant**.

Why?

Because there is **no code** after the `else` block inside the loop.
So it would automatically go to the next iteration anyway.

---

### ✂️ Simplified version (without `continue`):

```cpp
for(int i = st+1; i < end; i++) {
    if(title[i] >= 'A' && title[i] <= 'Z') {
        title[i] = title[i] - 'A' + 'a';
    }
    // No need for 'else' or 'continue'
}
```

---

### ✅ Summary:

| Keyword      | Meaning                                         |
| ------------ | ----------------------------------------------- |
| `continue;`  | Skip rest of loop body & jump to next iteration |
| In your code | It does nothing extra; can be safely removed    |

---

Let me know if you'd like:

* ✍️ Handwritten-style diagram showing loop flow with `continue`
* 🧪 Dry run of this loop on a sample word like `"cAPs"`



#include <iostream>
#include <string>
using namespace std;

void printNthWord(string title, int n) {
    int i = 0;
    int wordCount = 0;

    while (i < title.length()) {
        // Skip spaces
        while (i < title.length() && title[i] == ' ') i++;

        int st = i;

        // Go to end of the word
        while (i < title.length() && title[i] != ' ') i++;

        int end = i;

        wordCount++;

        if (wordCount == n) {
            cout << "Word " << n << ": " << title.substr(st, end - st) << endl;
            return;
        }

        i++; // Move to next character
    }

    cout << "Word " << n << " not found!" << endl;
}

int main() {
    string title = "cAPiTal tHE TitLE";
    int n = 3;

    printNthWord(title, n);
    return 0;
}
string getNthWord(string title, int n) {
    int i = 0, wordCount = 0;

    while (i < title.length()) {
        // Skip spaces
        while (i < title.length() && title[i] == ' ') i++;

        int st = i;

        // Move to end of word
        while (i < title.length() && title[i] != ' ') i++;

        int end = i;
        wordCount++;

        if (wordCount == n) {
            string result = "";
            for (int j = st; j < end; j++) {
                result += title[j];  // Append each character
            }
            return result;
        }

        i++;  // Move to next word
    }

    return ""; // Not found
}


#include <iostream>
#include <string>
using namespace std;

string getSecondLastWord(string title) {
    int i = 0;
    string prev = "", curr = "";

    while (i < title.length()) {
        // Skip spaces
        while (i < title.length() && title[i] == ' ') i++;

        int st = i;

        // Move to end of the word
        while (i < title.length() && title[i] != ' ') i++;
        int end = i;

        if (st < end) {
            // Build current word manually
            prev = curr; // update second last
            curr = "";
            for (int j = st; j < end; j++) {
                curr += title[j];
            }
        }

        i++;
    }

    return prev;
}

int main() {
    string title = "  hello  world example ";
    cout << "Second last word: " << getSecondLastWord(title) << endl;
    return 0;
}



Absolutely! Here's a curated list of **string problems** that are **frequently asked in coding interviews** at top tech companies (Amazon, Google, Microsoft, etc.) — especially useful for practicing edge cases, logic building, and pointer manipulation.

---

## ✅ **Most Common String Problems for Interviews**

### 1. 🔁 **Reverse Words in a String**

**Leetcode #151**
Given a string, reverse the words (not characters) and clean up spaces.
👉 Practice: Handling spaces, word boundaries.

---

### 2. 🔄 **Valid Palindrome**

**Leetcode #125 / #680 (Valid Palindrome II)**
Check if a string is a palindrome (ignore spaces, punctuation, case).
👉 Practice: Two pointers, string clean-up.

---

### 3. 🔁 **Longest Palindromic Substring**

**Leetcode #5**
Find the longest substring which is a palindrome.
👉 Practice: Expand-around-center, DP.

---

### 4. 🧵 **String Compression**

**Leetcode #443**
Compress characters: `["a","a","b","b","c","c","c"]` → `"a2b2c3"`
👉 Practice: In-place modification.

---

### 5. 🔤 **Group Anagrams**

**Leetcode #49**
Group strings that are anagrams of each other.
👉 Practice: Hashing, sorting strings.

---

### 6. 🎲 **Valid Anagram**

**Leetcode #242**
Check if two strings are anagrams.
👉 Practice: Frequency count using arrays/maps.

---

### 7. 🔗 **Longest Common Prefix**

**Leetcode #14**
Find the longest common prefix among a list of strings.
👉 Practice: Vertical scan, binary search.

---

### 8. 🔀 **Check if Rotations**

E.g., `s1 = "abcde"`, `s2 = "cdeab"` → true
👉 Practice: Concatenation + `find()`.

---

### 9. 🔤 **ZigZag Conversion**

**Leetcode #6**
Write string in zigzag pattern and read row-wise.
👉 Practice: Index mapping.

---

### 10. 🔢 **Integer to Roman / Roman to Integer**

**Leetcode #12 / #13**
Convert between integer and Roman numerals.
👉 Practice: Mapping + subtraction logic.

---

### 11. 🧠 **First Unique Character**

**Leetcode #387**
Return index of first non-repeating char.
👉 Practice: Frequency + index tracking.

---

### 12. 🧠 **Implement `strStr()` / Substring Search**

**Leetcode #28**
Find the index of the first occurrence of needle in haystack.
👉 Practice: Brute force, KMP.

---

### 13. 🚫 **Remove All Occurrences of a Substring**

**Leetcode #1910**
E.g., remove `"ab"` from `"daabcbaabcbc"` → `"dabcbc"`
👉 Practice: Sliding window / stack.

---

### 14. 🧱 **Minimum Add to Make Parentheses Valid**

**Leetcode #921**
E.g., `"(()"` → 1, `")("` → 2
👉 Practice: Stack + count open/close balance.

---

### 15. 🔢 **Count and Say**

**Leetcode #38**
E.g., `1 → 11 → 21 → 1211`
👉 Practice: Frequency grouping, pattern building.

---

## 🔥 Bonus String Problems for Extra Practice

| Problem                              | Key Concept               |
| ------------------------------------ | ------------------------- |
| **Remove Duplicates**                | In-place, set, pointers   |
| **Check Isomorphic Strings**         | Map char → char           |
| **License Key Formatting**           | Clean string + regrouping |
| **Excel Column Title Conversion**    | Base-26 logic             |
| **Basic Calculator (I, II)**         | Stack + parsing           |
| **Decode String ("3\[a2\[c]]")**     | Recursion, stack          |
| **Longest Substring Without Repeat** | Sliding Window, HashMap   |
| **Find All Anagrams in a String**    | Sliding Window, frequency |
| **Replace Spaces with `%20`**        | Manual space handling     |

---

## 🧠 Want Structured Practice?

* 🔹 Easy: `Valid Palindrome`, `Valid Anagram`, `Reverse Words`
* 🔹 Medium: `Group Anagrams`, `Longest Prefix`, `Zigzag`, `Count and Say`
* 🔹 Hard: `Longest Palindromic Substring`, `Decode String`, `Calculator`

---

Great! You're now working with a **correct version** of the `reverseWords()` function. Here's a full breakdown of the **corrections** and **notes** made step-by-step from the **initial code to the final working version**:

---

### ✅ 🔁 Initial Code (Buggy Version)

```cpp
while (i > 0) {
    while (i > 0 && s[i] == ' ') i--;
    end = i;
    while (i > 0 && s[i] != ' ') i--;
    st = i;
    for (int i = st; i <= end; i++) {
        str += s[i];
    }
    i--;
}
```

### ❌ Problems in Initial Code:

| 🔴 Issue                     | 🔍 Explanation                                                                          |
| ---------------------------- | --------------------------------------------------------------------------------------- |
| `while(i > 0)`               | Skips `s[0]` (first character), missing the first word. Should be `i >= 0`.             |
| `st = i;`                    | This includes a space before the word. Correct is `st = i + 1`.                         |
| `for(int i = st...)`         | Reuses loop variable `i` (outer loop's `i` gets overwritten). Leads to **logic error**. |
| No space between words       | All words are concatenated with **no space**.                                           |
| No check for multiple spaces | Doesn't handle leading/trailing/multiple spaces properly.                               |

---

### ✅ Changes We Made — Step-by-Step:

#### 1. **Fix Loop Condition:**

```diff
- while(i > 0)
+ while(i >= 0)
```

**Why:** We must also process the character at index `0`.

---

#### 2. **Correct Start Index (`st`) of Word:**

```diff
- st = i;
+ st = i + 1;
```

**Why:** After inner loop ends, `i` points to the space before the word. We need to start **1 step ahead**.

---

#### 3. **Avoid Variable Shadowing:**

```diff
- for(int i = st; i <= end; i++)
+ for(int j = st; j <= end; j++)
```

**Why:** Using `int i` again overwrites the main loop’s `i`. That causes wrong navigation in the outer loop.

---

#### 4. **Add Space Between Words (Using Flag):**

```cpp
bool firstWord = true;
...
if (!firstWord) {
    str += ' ';
}
...
firstWord = false;
```

**Why:** So we don’t add a space before the first word, but do for the rest.

---

#### 5. **Optional Cleanup (Not Always Needed):**

```cpp
if (!str.empty() && str.back() == ' ') {
    str.pop_back();
}
```

**Why:** Just in case a trailing space sneaks in. But not needed if space logic is handled perfectly.

---

### ✅ Final Working Code:

```cpp
class Solution {
public:
    string reverseWords(string s) {
        string str = "";
        int st, end;
        int i = s.length() - 1;
        bool firstWord = true;

        while (i >= 0) {
            while (i >= 0 && s[i] == ' ') i--;
            end = i;
            if (i < 0) break;
            while (i >= 0 && s[i] != ' ') i--;
            st = i + 1;

            if (!firstWord) str += ' ';
            for (int j = st; j <= end; j++) {
                str += s[j];
            }
            firstWord = false;
            i--;
        }
        if (!str.empty() && str.back() == ' ') {
            str.pop_back();
        }

        return str;
    }
};
```

---

### ✅ Example Input & Output:

#### Input:

```cpp
"  hello   world  "
```

#### Output:

```cpp
"world hello"
```

---

### 🧠 Summary of All Key Fixes:

| Fix                       | Description                                    |
| ------------------------- | ---------------------------------------------- |
| ✅ Loop condition `i >= 0` | To include all characters                      |
| ✅ Correct `st = i + 1`    | To start exactly at word                       |
| ✅ Avoid shadowing `i`     | Use `j` in inner loop                          |
| ✅ Add space between words | Use `firstWord` flag                           |
| ✅ Clean, reliable logic   | Handles multiple, trailing, and leading spaces |

---
